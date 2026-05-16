export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs/server"
import { stripe, PLANS, type PlanKey } from "@/lib/stripe"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const plan = (body.plan ?? "pro") as PlanKey

  if (!PLANS[plan]) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
  }

  const priceId = PLANS[plan].priceId
  if (!priceId) {
    return NextResponse.json({ error: `STRIPE_${plan.toUpperCase()}_PRICE_ID is not set` }, { status: 500 })
  }

  // Fetch user email for Stripe pre-fill
  const clerkUser = await currentUser()
  const email = clerkUser?.emailAddresses[0]?.emailAddress

  // Re-use existing Stripe customer if already purchased before
  const [row] = await db.select({ stripeCustomerId: users.stripeCustomerId }).from(users).where(eq(users.id, userId)).limit(1)
  const existingCustomerId = row?.stripeCustomerId ?? undefined

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    customer: existingCustomerId,
    customer_email: existingCustomerId ? undefined : email,
    allow_promotion_codes: true,
    metadata: {
      userId,
      plan,
      email: email ?? "",
    },
    success_url: plan === "team"
      ? `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/team/setup?upgraded=1`
      : `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?upgraded=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    payment_intent_data: {
      metadata: { userId, plan },
    },
  })

  return NextResponse.json({ url: session.url })
}
