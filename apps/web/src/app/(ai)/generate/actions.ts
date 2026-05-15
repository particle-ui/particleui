"use server"

import { auth } from "@clerk/nextjs/server"
import { generateLayout } from "@/lib/ai/gateway"
import { db } from "@/db"
import { aiGenerations, users } from "@/db/schema"
import { eq, count } from "drizzle-orm"
import type { GeneratedLayout } from "@/lib/ai/gateway"

const FREE_LIMIT = 5

type GenerateResult =
  | { layout: GeneratedLayout; error?: never; used?: never; limit?: never }
  | { error: string; used: number; limit: number; layout?: never }

export async function generateLayoutAction(prompt: string): Promise<GenerateResult> {
  const { userId } = await auth()

  // Rate limiting for signed-in users
  if (userId) {
    // Check plan
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
    if (user?.plan !== "pro") {
      const [result] = await db
        .select({ cnt: count() })
        .from(aiGenerations)
        .where(eq(aiGenerations.userId, userId))
      const usedToday = Number(result?.cnt ?? 0)
      if (usedToday >= FREE_LIMIT) {
        return { error: "rate_limited", used: usedToday, limit: FREE_LIMIT }
      }
    }
  }

  const layout = await generateLayout(prompt)

  // Persist
  if (userId) {
    await db.insert(aiGenerations).values({
      userId,
      prompt,
      outputJson: JSON.stringify(layout),
    })
  }

  return { layout }
}
