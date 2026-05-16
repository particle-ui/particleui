import { createHash } from "crypto"
import { db } from "@/db"
import { apiTokens, users } from "@/db/schema"
import { and, eq, isNull, or } from "drizzle-orm"

function hashToken(plaintext: string) {
  return createHash("sha256").update(plaintext).digest("hex")
}

export async function validateToken(
  token: string
): Promise<{ valid: boolean; userId?: string; tokenId?: string; plan?: string }> {
  // Dev shortcut
  const devToken = process.env.PARTICLEUI_DEV_TOKEN
  if (devToken && token === devToken) {
    return { valid: true, userId: "dev", plan: "pro" }
  }

  const hash = hashToken(token)

  const rows = await db
    .select({
      id: apiTokens.id,
      userId: apiTokens.userId,
      revokedAt: apiTokens.revokedAt,
      plan: users.plan,
    })
    .from(apiTokens)
    .innerJoin(users, eq(apiTokens.userId, users.id))
    .where(or(eq(apiTokens.tokenHash, hash), eq(apiTokens.token, token)))
    .limit(1)

  if (rows.length === 0) return { valid: false }

  const row = rows[0]
  if (row.revokedAt !== null) return { valid: false }

  db.update(apiTokens)
    .set({ lastUsedAt: new Date() })
    .where(eq(apiTokens.id, row.id))
    .execute()
    .catch(() => {})

  return { valid: true, userId: row.userId, tokenId: row.id, plan: row.plan }
}

export async function createToken(userId: string, label = "Default"): Promise<string> {
  const plaintext = `pui_${crypto.randomUUID().replace(/-/g, "")}`
  const hash = hashToken(plaintext)
  const prefix = plaintext.slice(0, 12)
  await db.insert(apiTokens).values({
    userId,
    token: plaintext,   // kept for legacy backcompat; new code uses tokenHash
    tokenHash: hash,
    tokenPrefix: prefix,
    label,
  })
  return plaintext
}

export async function revokeToken(tokenId: string): Promise<void> {
  await db
    .update(apiTokens)
    .set({ revokedAt: new Date() })
    .where(eq(apiTokens.id, tokenId))
}

export async function listTokens(userId: string) {
  return db
    .select({
      id: apiTokens.id,
      tokenPrefix: apiTokens.tokenPrefix,
      label: apiTokens.label,
      lastUsedAt: apiTokens.lastUsedAt,
      createdAt: apiTokens.createdAt,
    })
    .from(apiTokens)
    .where(and(eq(apiTokens.userId, userId), isNull(apiTokens.revokedAt)))
    .orderBy(apiTokens.createdAt)
}
