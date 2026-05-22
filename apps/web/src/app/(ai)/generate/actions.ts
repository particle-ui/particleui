"use server"

import { auth } from "@clerk/nextjs/server"
import { generateLayout } from "@/lib/ai/gateway"
import { db } from "@/db"
import { aiGenerations } from "@/db/schema"
import type { GeneratedLayout } from "@/lib/ai/gateway"
import {
  aiPolicyForUser,
  consumeRateLimit,
  getServerActionClientIp,
  identityForUserOrIp,
} from "@/lib/rate-limit/rate-limit"

type GenerateResult =
  | { layout: GeneratedLayout; error?: never; used?: never; limit?: never }
  | { error: string; used: number; limit: number; layout?: never }

export async function generateLayoutAction(prompt: string): Promise<GenerateResult> {
  const { userId } = await auth()
  const policy = await aiPolicyForUser(userId)
  const decision = await consumeRateLimit({
    policy,
    identity: identityForUserOrIp(userId, await getServerActionClientIp()),
  })

  if (!decision.allowed) {
    return {
      error: "rate_limited",
      used: decision.limit,
      limit: decision.limit,
    }
  }

  const layout = await generateLayout(prompt)

  // Persist signed-in generations for product analytics and future abuse review.
  if (userId) {
    await db.insert(aiGenerations).values({
      userId,
      prompt,
      outputJson: JSON.stringify(layout),
    })
  }

  return { layout }
}
