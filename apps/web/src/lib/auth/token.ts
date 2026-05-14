import { db } from "@/db"
import { apiTokens, users } from "@/db/schema"
import { eq, isNull } from "drizzle-orm"

export async function validateToken(
  token: string
): Promise<{ valid: boolean; userId?: string; plan?: string }> {
  // Dev shortcut
  const devToken = process.env.PARTICLEUI_DEV_TOKEN
  if (devToken && token === devToken) {
    return { valid: true, userId: "dev", plan: "pro" }
  }

  const rows = await db
    .select({
      userId: apiTokens.userId,
      revokedAt: apiTokens.revokedAt,
      plan: users.plan,
    })
    .from(apiTokens)
    .innerJoin(users, eq(apiTokens.userId, users.id))
    .where(eq(apiTokens.token, token))
    .limit(1)

  if (rows.length === 0) return { valid: false }

  const row = rows[0]
  if (row.revokedAt !== null) return { valid: false }

  // Fire-and-forget last used update
  db.update(apiTokens)
    .set({ lastUsedAt: new Date() })
    .where(eq(apiTokens.token, token))
    .execute()
    .catch(() => {})

  return { valid: true, userId: row.userId, plan: row.plan }
}

export async function createToken(userId: string, label = "Default"): Promise<string> {
  const token = `pui_${crypto.randomUUID().replace(/-/g, "")}`
  await db.insert(apiTokens).values({ userId, token, label })
  return token
}

export async function revokeToken(tokenId: string, userId: string): Promise<void> {
  await db
    .update(apiTokens)
    .set({ revokedAt: new Date() })
    .where(eq(apiTokens.id, tokenId))
}

export async function listTokens(userId: string) {
  return db
    .select()
    .from(apiTokens)
    .where(eq(apiTokens.userId, userId) && isNull(apiTokens.revokedAt))
    .orderBy(apiTokens.createdAt)
}
