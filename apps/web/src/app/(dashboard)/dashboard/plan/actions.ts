"use server"

import { auth } from "@clerk/nextjs/server"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

/** Dev-only: instantly flip plan to pro without going through Stripe. */
export async function devUpgradeToPro() {
  if (process.env.NODE_ENV !== "development") throw new Error("Dev only")
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthenticated")

  await db
    .update(users)
    .set({ plan: "pro", stripeCustomerId: `dev_${userId}`, stripeSessionId: `dev_session_${Date.now()}` })
    .where(eq(users.id, userId))

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/plan")
}

/** Dev-only: reset plan back to free. */
export async function devDowngradeToFree() {
  if (process.env.NODE_ENV !== "development") throw new Error("Dev only")
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthenticated")

  await db
    .update(users)
    .set({ plan: "free", stripeCustomerId: null, stripeSessionId: null })
    .where(eq(users.id, userId))

  revalidatePath("/dashboard")
  revalidatePath("/dashboard/plan")
}

// Keep old names as aliases so any existing callers don't break during transition
export const upgradeToPro = devUpgradeToPro
export const downgradeToFree = devDowngradeToFree
