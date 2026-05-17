"use server"

import { auth } from "@clerk/nextjs/server"
import { createToken, revokeTokenForUser, requireAuthenticatedUserId } from "@/lib/auth/token-lifecycle"
import { revalidatePath } from "next/cache"

export async function createDashboardToken(): Promise<string> {
  const { userId } = await auth()
  const authenticatedUserId = requireAuthenticatedUserId(userId)

  const plaintext = await createToken(authenticatedUserId, "Default")
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/tokens")
  return plaintext
}

export async function revokeToken(tokenId: string): Promise<void> {
  const { userId } = await auth()
  const authenticatedUserId = requireAuthenticatedUserId(userId)

  await revokeTokenForUser(tokenId, authenticatedUserId)
  revalidatePath("/dashboard")
  revalidatePath("/dashboard/tokens")
}
