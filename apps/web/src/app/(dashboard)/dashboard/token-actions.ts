"use server"

import { db } from "@/db"
import { apiTokens } from "@/db/schema"
import { eq } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function revokeToken(tokenId: string) {
  await db
    .update(apiTokens)
    .set({ revokedAt: new Date() })
    .where(eq(apiTokens.id, tokenId))
  revalidatePath("/dashboard")
}
