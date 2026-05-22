"use server"

import { auth } from "@clerk/nextjs/server"
import { createToken, revokeTokenForUser, requireAuthenticatedUserId } from "@/lib/auth/token-lifecycle"
import { consumeRateLimit, rateLimitPolicies } from "@/lib/rate-limit/rate-limit"
import { revalidatePath } from "next/cache"

export async function createDashboardToken(): Promise<string> {
  const { userId } = await auth()
  const authenticatedUserId = requireAuthenticatedUserId(userId)
  const decision = await consumeRateLimit({
    policy: rateLimitPolicies.tokenCreate,
    identity: { type: "user", id: authenticatedUserId },
  })

  if (!decision.allowed) {
    throw new Error("rate_limited")
  }

  const plaintext = await createToken(authenticatedUserId, "Default")
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/tokens")
  return plaintext
}

export async function revokeToken(tokenId: string): Promise<void> {
  const { userId } = await auth()
  const authenticatedUserId = requireAuthenticatedUserId(userId)
  const decision = await consumeRateLimit({
    policy: rateLimitPolicies.tokenRevoke,
    identity: { type: "user", id: authenticatedUserId },
  })

  if (!decision.allowed) {
    throw new Error("rate_limited")
  }

  await revokeTokenForUser(tokenId, authenticatedUserId)
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/tokens")
}
