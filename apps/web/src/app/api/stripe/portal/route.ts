export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { stripe } from "@/lib/stripe"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"

export async function POST() {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })
  }

  const [row] = await db
    .select({ stripeCustomerId: users.stripeCustomerId })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1)

  const customerId = row?.stripeCustomerId
  if (!customerId) {
    return NextResponse.json({ error: "No Stripe customer found. Contact support." }, { status: 404 })
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/plan`,
  })

  return NextResponse.json({ url: session.url })
}
