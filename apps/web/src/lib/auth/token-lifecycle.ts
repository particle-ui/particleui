import { createHash, randomUUID } from "crypto"
import { and, eq, isNull, or } from "drizzle-orm"
import { db } from "@/db"
import { apiTokens, users } from "@/db/schema"
import {
  getUserEntitlement,
  planHasProAccess,
  type EntitlementReader,
  type UserPlan,
} from "@/lib/auth/entitlement"

export class TokenLifecycleError extends Error {
  constructor(
    readonly code: "unauthenticated" | "not_entitled" | "not_found",
    message: string
  ) {
    super(message)
    this.name = "TokenLifecycleError"
  }
}

export function requireAuthenticatedUserId(userId: string | null | undefined): string {
  if (!userId) {
    throw new TokenLifecycleError("unauthenticated", "Unauthenticated")
  }

  return userId
}

export interface TokenRevocationStore {
  revokeTokenForOwner(tokenId: string, userId: string): Promise<boolean>
}

function hashToken(plaintext: string) {
  return createHash("sha256").update(plaintext).digest("hex")
}

function generateTokenPlaintext() {
  return `pui_${randomUUID().replace(/-/g, "")}`
}

export async function assertCanCreateToken(
  userId: string,
  reader?: EntitlementReader
): Promise<"pro" | "team"> {
  const entitlement = await getUserEntitlement(userId, reader)
  if (!entitlement.active) {
    throw new TokenLifecycleError(
      "not_entitled",
      "An active Pro or Team license is required to create API tokens."
    )
  }

  return entitlement.plan
}

export async function validateToken(
  token: string
): Promise<{ valid: boolean; userId?: string; tokenId?: string; plan?: UserPlan }> {
  const devToken = process.env.PARTICLEUI_DEV_TOKEN
  if (process.env.NODE_ENV !== "production" && devToken && token === devToken) {
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
  if (row.revokedAt !== null || !planHasProAccess(row.plan)) return { valid: false }

  db.update(apiTokens)
    .set({ lastUsedAt: new Date() })
    .where(eq(apiTokens.id, row.id))
    .execute()
    .catch(() => {})

  return { valid: true, userId: row.userId, tokenId: row.id, plan: row.plan }
}

export async function createToken(userId: string, label = "Default"): Promise<string> {
  await assertCanCreateToken(userId)

  const plaintext = generateTokenPlaintext()
  const hash = hashToken(plaintext)
  const prefix = plaintext.slice(0, 12)
  await db.insert(apiTokens).values({
    userId,
    token: plaintext, // kept for legacy backcompat; PR 2 will remove plaintext storage
    tokenHash: hash,
    tokenPrefix: prefix,
    label,
  })
  return plaintext
}

export async function revokeTokenForUser(tokenId: string, userId: string): Promise<void> {
  await revokeOwnedToken({ revokeTokenForOwner: revokeTokenForOwnerInDb }, tokenId, userId)
}

export async function revokeOwnedToken(
  store: TokenRevocationStore,
  tokenId: string,
  userId: string
): Promise<void> {
  const revoked = await store.revokeTokenForOwner(tokenId, userId)
  if (!revoked) {
    throw new TokenLifecycleError("not_found", "Token not found.")
  }
}

async function revokeTokenForOwnerInDb(tokenId: string, userId: string): Promise<boolean> {
  const revoked = await db
    .update(apiTokens)
    .set({ revokedAt: new Date() })
    .where(and(eq(apiTokens.id, tokenId), eq(apiTokens.userId, userId), isNull(apiTokens.revokedAt)))
    .returning({ id: apiTokens.id })

  return revoked.length > 0
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
