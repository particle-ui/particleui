export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import type Stripe from "stripe"
import { stripe } from "@/lib/stripe"
import { db } from "@/db"
import { users, webhookEvents, teams, teamMembers } from "@/db/schema"
import { eq } from "drizzle-orm"
import { createToken } from "@/lib/auth/token"
import { sendProWelcomeEmail } from "@/lib/email"
import {
  processStripeWebhookEvent,
  type StripeWebhookStore,
} from "@/lib/stripe/webhook"

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
  } catch {
    return NextResponse.json({ error: `Webhook signature verification failed` }, { status: 400 })
  }

  const result = await processStripeWebhookEvent(dbStripeWebhookStore, event)

  return NextResponse.json({ ok: true, skipped: result.skipped })
}

const dbStripeWebhookStore: StripeWebhookStore = {
  async findWebhookEvent(eventId) {
    const [existing] = await db
      .select({ eventId: webhookEvents.eventId })
      .from(webhookEvents)
      .where(eq(webhookEvents.eventId, eventId))
      .limit(1)

    return existing ?? null
  },
  async createWebhookEvent(record) {
    await db.insert(webhookEvents).values(record)
  },
  async markWebhookEventProcessed(eventId) {
    await db
      .update(webhookEvents)
      .set({ processed: true })
      .where(eq(webhookEvents.eventId, eventId))
  },
  async markWebhookEventFailed(eventId, payload) {
    await db
      .update(webhookEvents)
      .set({ processed: false, payload })
      .where(eq(webhookEvents.eventId, eventId))
  },
  async provisionUserPurchase(record) {
    await db
      .update(users)
      .set({
        plan: record.plan,
        stripeCustomerId: record.stripeCustomerId,
        stripeSessionId: record.stripeSessionId,
      })
      .where(eq(users.id, record.userId))
  },
  async findTeamByStripeSessionId(stripeSessionId) {
    const [existingTeam] = await db
      .select({ id: teams.id })
      .from(teams)
      .where(eq(teams.stripeSessionId, stripeSessionId))
      .limit(1)

    return existingTeam ?? null
  },
  async createTeamForOwner(record) {
    const [newTeam] = await db
      .insert(teams)
      .values({ name: "My Team", ownerId: record.ownerId, stripeSessionId: record.stripeSessionId })
      .returning({ id: teams.id })

    return newTeam ?? null
  },
  async addTeamOwner(record) {
    await db
      .insert(teamMembers)
      .values({ teamId: record.teamId, userId: record.userId, role: "owner" })
      .onConflictDoNothing()
  },
  async createToken(userId, label) {
    return createToken(userId, label)
  },
  async sendWelcomeEmail(record) {
    await sendProWelcomeEmail(record).catch((error: unknown) => {
      console.error("[stripe/webhook] Failed to send welcome email:", error)
    })
  },
  async downgradeCustomer(customerId) {
    await db
      .update(users)
      .set({ plan: "free" })
      .where(eq(users.stripeCustomerId, customerId))
  },
  async setCustomerPlan(customerId, plan) {
    await db.update(users).set({ plan }).where(eq(users.stripeCustomerId, customerId))
  },
  async setUserPlan(record) {
    await db
      .update(users)
      .set({
        plan: record.plan,
        stripeCustomerId: record.stripeCustomerId,
      })
      .where(eq(users.id, record.userId))
  },
}
