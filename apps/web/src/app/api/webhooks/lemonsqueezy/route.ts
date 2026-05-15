export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { db } from "@/db"
import { users, webhookEvents } from "@/db/schema"
import { eq } from "drizzle-orm"
import { createToken } from "@/lib/auth/token"

const WEBHOOK_SECRET = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!

async function verifySignature(req: NextRequest, body: string): Promise<boolean> {
  const signature = req.headers.get("x-signature")
  if (!signature) return false

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(WEBHOOK_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  )

  const sigBytes = Uint8Array.from(signature.match(/.{2}/g)!.map((b) => parseInt(b, 16)))
  return crypto.subtle.verify("HMAC", key, sigBytes, new TextEncoder().encode(body))
}

export async function POST(req: NextRequest) {
  const body = await req.text()

  if (WEBHOOK_SECRET && !(await verifySignature(req, body))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
  }

  const payload = JSON.parse(body)
  const eventName: string = payload.meta?.event_name
  const eventId: string = payload.meta?.event_id ?? crypto.randomUUID()

  // Idempotency
  const existing = await db
    .select({ id: webhookEvents.id })
    .from(webhookEvents)
    .where(eq(webhookEvents.eventId, eventId))
    .limit(1)

  if (existing.length > 0) {
    return NextResponse.json({ ok: true, skipped: true })
  }

  await db.insert(webhookEvents).values({
    eventId,
    eventName,
    payload: body,
  })

  const userId: string | undefined = payload.meta?.custom_data?.user_id

  if (
    (eventName === "order_created" || eventName === "subscription_created") &&
    userId
  ) {
    await db
      .update(users)
      .set({
        plan: "pro",
        lsCustomerId: String(payload.data?.attributes?.customer_id ?? ""),
        lsSubscriptionId: String(payload.data?.id ?? ""),
      })
      .where(eq(users.id, userId))

    // Issue an API token automatically on purchase
    await createToken(userId, "Auto-issued on purchase")

    await db
      .update(webhookEvents)
      .set({ processed: true })
      .where(eq(webhookEvents.eventId, eventId))
  }

  if (
    (eventName === "subscription_expired" || eventName === "subscription_cancelled") &&
    userId
  ) {
    // Lifetime purchase: never downgrade. Subscription model: downgrade here.
    // await db.update(users).set({ plan: "free" }).where(eq(users.id, userId))
    await db
      .update(webhookEvents)
      .set({ processed: true })
      .where(eq(webhookEvents.eventId, eventId))
  }

  return NextResponse.json({ ok: true })
}
