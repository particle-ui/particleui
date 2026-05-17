import { createHash, randomUUID } from "crypto"
import { and, eq, isNull } from "drizzle-orm"
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

export interface TokenCreationStore {
  createTokenRecord(record: {
    userId: string
    tokenHash: string
    tokenPrefix: string
    label: string
  }): Promise<void>
}

export interface TokenValidationRecord {
  id: string
  userId: string
  revokedAt: Date | null
  plan: UserPlan
}

export interface TokenValidationStore {
  findByHash(tokenHash: string): Promise<TokenValidationRecord | null>
  findLegacyByPlaintext(token: string): Promise<TokenValidationRecord | null>
  recordLastUsed(tokenId: string, usedAt: Date): Promise<void>
}

export interface TokenDevBypassEnv {
  NODE_ENV?: string
  PARTICLEUI_DEV_TOKEN?: string
}

export function hashToken(plaintext: string) {
  return createHash("sha256").update(plaintext).digest("hex")
}

export function isDevelopmentTokenBypass(token: string, env: TokenDevBypassEnv): boolean {
  return env.NODE_ENV !== "production" && !!env.PARTICLEUI_DEV_TOKEN && token === env.PARTICLEUI_DEV_TOKEN
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
  if (isDevelopmentTokenBypass(token, process.env)) {
    return { valid: true, userId: "dev", plan: "pro" }
  }

  return validateStoredToken(dbTokenValidationStore, token)
}

export async function validateStoredToken(
  store: TokenValidationStore,
  token: string
): Promise<{ valid: boolean; userId?: string; tokenId?: string; plan?: UserPlan }> {
  const row =
    (await store.findByHash(hashToken(token))) ??
    // Legacy fallback for pre-PR-2 rows. Remove after old plaintext tokens are migrated/rotated.
    (await store.findLegacyByPlaintext(token))

  if (!row) return { valid: false }
  if (row.revokedAt !== null || !planHasProAccess(row.plan)) return { valid: false }

  store.recordLastUsed(row.id, new Date()).catch(() => {})

  return { valid: true, userId: row.userId, tokenId: row.id, plan: row.plan }
}

const tokenValidationSelect = {
  id: apiTokens.id,
  userId: apiTokens.userId,
  revokedAt: apiTokens.revokedAt,
  plan: users.plan,
}

const dbTokenValidationStore: TokenValidationStore = {
  async findByHash(tokenHash) {
    const [row] = await db
      .select(tokenValidationSelect)
      .from(apiTokens)
      .innerJoin(users, eq(apiTokens.userId, users.id))
      .where(eq(apiTokens.tokenHash, tokenHash))
      .limit(1)

    return row ?? null
  },
  async findLegacyByPlaintext(token) {
    const [row] = await db
      .select(tokenValidationSelect)
      .from(apiTokens)
      .innerJoin(users, eq(apiTokens.userId, users.id))
      .where(eq(apiTokens.token, token))
      .limit(1)

    return row ?? null
  },
  async recordLastUsed(tokenId, usedAt) {
    await db.update(apiTokens).set({ lastUsedAt: usedAt }).where(eq(apiTokens.id, tokenId)).execute()
  },
}

export async function createToken(userId: string, label = "Default"): Promise<string> {
  return createTokenWithStore({ createTokenRecord: createTokenRecordInDb }, userId, label)
}

export async function createTokenWithStore(
  store: TokenCreationStore,
  userId: string,
  label = "Default",
  reader?: EntitlementReader
): Promise<string> {
  await assertCanCreateToken(userId, reader)

  const plaintext = generateTokenPlaintext()
  await store.createTokenRecord({
    userId,
    tokenHash: hashToken(plaintext),
    tokenPrefix: plaintext.slice(0, 12),
    label,
  })
  return plaintext
}

async function createTokenRecordInDb(record: {
  userId: string
  tokenHash: string
  tokenPrefix: string
  label: string
}) {
  await db.insert(apiTokens).values(record)
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
