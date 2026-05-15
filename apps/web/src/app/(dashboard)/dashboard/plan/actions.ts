"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/db"
import { users, webhookEvents } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function upgradeToPro() {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthenticated")

  await db.update(users).set({ plan: "pro", lsCustomerId: `dummy_${userId}` }).where(eq(users.id, userId))

  await db.insert(webhookEvents).values({
    eventId: `dummy_upgrade_${userId}_${Date.now()}`,
    eventName: "order_created",
    processed: true,
    payload: JSON.stringify({ meta: { custom_data: { user_id: userId } }, data: { attributes: { status: "paid", total: 14900 } } }),
  }).onConflictDoNothing()

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/plan")
}

export async function downgradeToFree() {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthenticated")

  await db.update(users).set({ plan: "free", lsCustomerId: null, lsSubscriptionId: null }).where(eq(users.id, userId))
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/plan")
}
