import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { and, eq, lte, sql } from "drizzle-orm"
import { db } from "@/db"
import { rateLimitBuckets } from "@/db/schema"
import { getUserEntitlement, type UserPlan } from "@/lib/auth/entitlement"
import { MemoryRateLimitStore } from "./memory-store"
import type { RateLimitDecision, RateLimitIdentity, RateLimitPolicy, RateLimitStore } from "./types"

const DAY_MS = 24 * 60 * 60 * 1000
const HOUR_MS = 60 * 60 * 1000

export const rateLimitPolicies = {
  aiAnonymous: { name: "ai:anonymous", limit: envLimit("RATE_LIMIT_AI_ANON_DAILY", 3), windowMs: DAY_MS },
  aiFree: { name: "ai:free", limit: envLimit("RATE_LIMIT_AI_FREE_DAILY", 5), windowMs: DAY_MS },
  aiPro: { name: "ai:pro", limit: envLimit("RATE_LIMIT_AI_PRO_DAILY", 50), windowMs: DAY_MS },
  mcpGenerate: { name: "mcp:generate", limit: envLimit("RATE_LIMIT_MCP_GENERATE_DAILY", 50), windowMs: DAY_MS },
  tokenCreate: { name: "token:create", limit: envLimit("RATE_LIMIT_TOKEN_CREATE_HOURLY", 5), windowMs: HOUR_MS },
  tokenRevoke: { name: "token:revoke", limit: envLimit("RATE_LIMIT_TOKEN_REVOKE_HOURLY", 20), windowMs: HOUR_MS },
  teamInviteCreate: { name: "team:invite:create", limit: envLimit("RATE_LIMIT_TEAM_INVITE_DAILY", 20), windowMs: DAY_MS },
  inviteAcceptUser: { name: "team:invite:accept:user", limit: envLimit("RATE_LIMIT_INVITE_ACCEPT_USER_HOURLY", 10), windowMs: HOUR_MS },
  inviteAcceptIp: { name: "team:invite:accept:ip", limit: envLimit("RATE_LIMIT_INVITE_ACCEPT_IP_HOURLY", 10), windowMs: HOUR_MS },
  registryAuthFailure: { name: "registry:auth-failure", limit: envLimit("RATE_LIMIT_REGISTRY_AUTH_FAILURE_HOURLY", 30), windowMs: HOUR_MS },
} satisfies Record<string, RateLimitPolicy>

const fallbackMemoryStore = new MemoryRateLimitStore()
let warnedAboutMemoryStore = false

export class RateLimitUnavailableError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "RateLimitUnavailableError"
  }
}

class DbRateLimitStore implements RateLimitStore {
  async consume(input: {
    key: string
    limit: number
    windowMs: number
    now: Date
  }): Promise<RateLimitDecision> {
    const resetAt = new Date(input.now.getTime() + input.windowMs)

    const [existing] = await db
      .select({ count: rateLimitBuckets.count, resetAt: rateLimitBuckets.resetAt })
      .from(rateLimitBuckets)
      .where(eq(rateLimitBuckets.key, input.key))
      .limit(1)

    if (!existing) {
      const [inserted] = await db
        .insert(rateLimitBuckets)
        .values({
          key: input.key,
          count: 1,
          resetAt,
          updatedAt: input.now,
        })
        .onConflictDoNothing({ target: rateLimitBuckets.key })
        .returning({ count: rateLimitBuckets.count, resetAt: rateLimitBuckets.resetAt })

      if (inserted) {
        return decision(input.key, input.limit, inserted.count, inserted.resetAt, input.now)
      }

      return this.consume(input)
    }

    if (existing.resetAt <= input.now) {
      await db
        .update(rateLimitBuckets)
        .set({ count: 1, resetAt, updatedAt: input.now })
        .where(eq(rateLimitBuckets.key, input.key))

      return decision(input.key, input.limit, 1, resetAt, input.now)
    }

    if (existing.count >= input.limit) {
      return decision(input.key, input.limit, existing.count, existing.resetAt, input.now)
    }

    const [updated] = await db
      .update(rateLimitBuckets)
      .set({ count: sql`${rateLimitBuckets.count} + 1`, updatedAt: input.now })
      .where(
        and(
          eq(rateLimitBuckets.key, input.key),
          lte(rateLimitBuckets.resetAt, existing.resetAt)
        )
      )
      .returning({ count: rateLimitBuckets.count, resetAt: rateLimitBuckets.resetAt })

    return decision(input.key, input.limit, updated?.count ?? existing.count + 1, updated?.resetAt ?? existing.resetAt, input.now)
  }
}

const dbRateLimitStore = new DbRateLimitStore()

export function buildRateLimitKey(policyName: string, identity: RateLimitIdentity): string {
  return `${policyName}:${identity.type}:${identity.id}`
}

export async function consumeRateLimit(input: {
  policy: RateLimitPolicy
  identity: RateLimitIdentity
  store?: RateLimitStore
  now?: Date
}): Promise<RateLimitDecision> {
  const now = input.now ?? new Date()
  const key = buildRateLimitKey(input.policy.name, input.identity)
  const store = input.store ?? getDefaultRateLimitStore()

  return store.consume({
    key,
    limit: input.policy.limit,
    windowMs: input.policy.windowMs,
    now,
  })
}

export function rateLimitResponse(decision: RateLimitDecision): NextResponse {
  return NextResponse.json(
    { error: "rate_limited", limit: decision.limit, retryAfterSeconds: decision.retryAfterSeconds },
    {
      status: 429,
      headers: {
        "Retry-After": String(decision.retryAfterSeconds),
        "X-RateLimit-Limit": String(decision.limit),
        "X-RateLimit-Remaining": String(decision.remaining),
        "X-RateLimit-Reset": String(Math.ceil(decision.resetAt.getTime() / 1000)),
      },
    }
  )
}

export function getClientIpFromHeaders(headerList: Headers): string {
  const forwardedFor = headerList.get("x-forwarded-for")?.split(",")[0]?.trim()
  const realIp = headerList.get("x-real-ip")?.trim()
  const cloudflareIp = headerList.get("cf-connecting-ip")?.trim()

  return cloudflareIp || forwardedFor || realIp || "unknown"
}

export async function getServerActionClientIp(): Promise<string> {
  return getClientIpFromHeaders(await headers())
}

export function identityForUserOrIp(userId: string | null | undefined, ip: string): RateLimitIdentity {
  if (userId) return { type: "user", id: userId }
  return { type: "ip", id: ip }
}

export async function aiPolicyForUser(userId: string | null | undefined): Promise<RateLimitPolicy> {
  if (!userId) return rateLimitPolicies.aiAnonymous

  const entitlement = await getUserEntitlement(userId)
  return entitlement.active ? rateLimitPolicies.aiPro : rateLimitPolicies.aiFree
}

export function planForRateLimitDisplay(userId: string | null | undefined, policy: RateLimitPolicy): UserPlan | "anonymous" {
  if (!userId) return "anonymous"
  return policy.name === rateLimitPolicies.aiPro.name ? "pro" : "free"
}

export function assertRateLimitAllowed(decision: RateLimitDecision): void {
  if (!decision.allowed) {
    throw new Error("rate_limited")
  }
}

export function getRateLimitRuntimeMode(env: NodeJS.ProcessEnv = process.env): "db" | "memory" | "unavailable" {
  if (env.DATABASE_URL) return "db"
  return env.NODE_ENV === "production" ? "unavailable" : "memory"
}

function getDefaultRateLimitStore(): RateLimitStore {
  const mode = getRateLimitRuntimeMode()
  if (mode === "db") return dbRateLimitStore

  if (mode === "unavailable") {
    throw new RateLimitUnavailableError("Rate limiter storage is not configured for production.")
  }

  if (!warnedAboutMemoryStore) {
    warnedAboutMemoryStore = true
    console.warn("[rate-limit] DATABASE_URL is not configured; using in-memory development limiter.")
  }

  return fallbackMemoryStore
}

function envLimit(name: string, fallback: number): number {
  const raw = process.env[name]
  if (!raw) return fallback

  const parsed = Number.parseInt(raw, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function decision(key: string, limit: number, count: number, resetAt: Date, now: Date): RateLimitDecision {
  return {
    allowed: count <= limit,
    key,
    limit,
    remaining: Math.max(limit - count, 0),
    resetAt,
    retryAfterSeconds: Math.max(Math.ceil((resetAt.getTime() - now.getTime()) / 1000), 1),
  }
}
