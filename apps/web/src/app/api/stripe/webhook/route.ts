export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import type Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import { db } from "@/db"
import { users, webhookEvents, teams, teamMembers } from "@/db/schema"
import { eq, isNotNull } from "drizzle-orm"
import { createToken } from "@/lib/auth/token"
import { sendProWelcomeEmail } from "@/lib/email"

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get("stripe-signature")

  if (!sig || !WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET)
  } catch (err) {
    return NextResponse.json({ error: `Webhook signature verification failed` }, { status: 400 })
  }

  // Idempotency — skip if already processed
  const existing = await db
    .select({ id: webhookEvents.id })
    .from(webhookEvents)
    .where(eq(webhookEvents.eventId, event.id))
    .limit(1)

  if (existing.length > 0) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  // Record the event immediately
  await db.insert(webhookEvents).values({
    eventId: event.id,
    eventName: event.type,
    payload: body,
  })

  try {
    if (event.type === "checkout.session.completed") {
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
    } else if (event.type === "charge.refunded") {
      await handleRefund(event.data.object as Stripe.Charge)
    }

    await db.update(webhookEvents).set({ processed: true }).where(eq(webhookEvents.eventId, event.id))
  } catch (err) {
    console.error(`[stripe/webhook] Error processing ${event.type}:`, err)
    // Don't return 500 — Stripe would retry. Event is recorded; fix in replay.
  }

  return NextResponse.json({ ok: true })
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.metadata?.userId
  const plan = (session.metadata?.plan ?? "pro") as "pro" | "team"
  const email = session.metadata?.email ?? session.customer_details?.email ?? ""
  const stripeCustomerId = typeof session.customer === "string" ? session.customer : session.customer?.id ?? ""

  if (!userId) {
    console.error("[stripe/webhook] checkout.session.completed missing userId in metadata", session.id)
    return
  }

  // Provision the user
  await db
    .update(users)
    .set({
      plan,
      stripeCustomerId: stripeCustomerId || null,
      stripeSessionId: session.id,
    })
    .where(eq(users.id, userId))

  // For team plan: create a team and add the buyer as owner (idempotent — guard on stripeSessionId)
  if (plan === "team") {
    const [existingTeam] = await db
      .select({ id: teams.id })
      .from(teams)
      .where(eq(teams.stripeSessionId, session.id))
      .limit(1)

    if (!existingTeam) {
      const [newTeam] = await db
        .insert(teams)
        .values({ name: "My Team", ownerId: userId, stripeSessionId: session.id })
        .returning({ id: teams.id })

      if (newTeam) {
        await db
          .insert(teamMembers)
          .values({ teamId: newTeam.id, userId, role: "owner" })
          .onConflictDoNothing()
      }
    }
  }

  // Auto-issue an API token
  const label = plan === "team" ? "Team auto-issued token" : "Auto-issued on purchase"
  const token = await createToken(userId, label)

  // Send welcome email with the token
  if (email) {
    await sendProWelcomeEmail({ to: email, plan, token }).catch((err) => {
      console.error("[stripe/webhook] Failed to send welcome email:", err)
    })
  }
}

async function handleRefund(charge: Stripe.Charge) {
  const customerId = typeof charge.customer === "string" ? charge.customer : charge.customer?.id
  if (!customerId) return

  // Revert user plan to free on full refund
  if (charge.refunded) {
    await db
      .update(users)
      .set({ plan: "free" })
      .where(eq(users.stripeCustomerId, customerId))
  }
}
