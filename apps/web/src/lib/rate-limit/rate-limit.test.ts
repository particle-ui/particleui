import { describe, expect, it } from "vitest"
import { MemoryRateLimitStore } from "./memory-store"
import {
  buildRateLimitKey,
  consumeRateLimit,
  getClientIpFromHeaders,
  getRateLimitRuntimeMode,
  identityForUserOrIp,
  rateLimitPolicies,
  rateLimitResponse,
} from "./rate-limit"

const now = new Date("2026-05-17T00:00:00Z")

describe("rate limiting", () => {
  it("rate-limits anonymous AI generation", async () => {
    const store = new MemoryRateLimitStore()

    for (let i = 0; i < rateLimitPolicies.aiAnonymous.limit; i++) {
      await expect(
        consumeRateLimit({
          policy: rateLimitPolicies.aiAnonymous,
          identity: { type: "ip", id: "203.0.113.10" },
          store,
          now,
        })
      ).resolves.toMatchObject({ allowed: true })
    }

    await expect(
      consumeRateLimit({
        policy: rateLimitPolicies.aiAnonymous,
        identity: { type: "ip", id: "203.0.113.10" },
        store,
        now,
      })
    ).resolves.toMatchObject({ allowed: false, limit: 3 })
  })

  it("rate-limits signed-in free AI generation", async () => {
    const store = new MemoryRateLimitStore()

    for (let i = 0; i < rateLimitPolicies.aiFree.limit; i++) {
      await consumeRateLimit({
        policy: rateLimitPolicies.aiFree,
        identity: { type: "user", id: "user_free" },
        store,
        now,
      })
    }

    await expect(
      consumeRateLimit({
        policy: rateLimitPolicies.aiFree,
        identity: { type: "user", id: "user_free" },
        store,
        now,
      })
    ).resolves.toMatchObject({ allowed: false, limit: 5 })
  })

  it("gives Pro AI generation a higher limit than free", () => {
    expect(rateLimitPolicies.aiPro.limit).toBeGreaterThan(rateLimitPolicies.aiFree.limit)
  })

  it("token creation rate limit works", async () => {
    const store = new MemoryRateLimitStore()

    for (let i = 0; i < rateLimitPolicies.tokenCreate.limit; i++) {
      await consumeRateLimit({
        policy: rateLimitPolicies.tokenCreate,
        identity: { type: "user", id: "user_pro" },
        store,
        now,
      })
    }

    await expect(
      consumeRateLimit({
        policy: rateLimitPolicies.tokenCreate,
        identity: { type: "user", id: "user_pro" },
        store,
        now,
      })
    ).resolves.toMatchObject({ allowed: false })
  })

  it("token revocation rate limit works", async () => {
    const store = new MemoryRateLimitStore()

    for (let i = 0; i < rateLimitPolicies.tokenRevoke.limit; i++) {
      await consumeRateLimit({
        policy: rateLimitPolicies.tokenRevoke,
        identity: { type: "user", id: "user_pro" },
        store,
        now,
      })
    }

    await expect(
      consumeRateLimit({
        policy: rateLimitPolicies.tokenRevoke,
        identity: { type: "user", id: "user_pro" },
        store,
        now,
      })
    ).resolves.toMatchObject({ allowed: false })
  })

  it("invite creation rate limit works", async () => {
    const store = new MemoryRateLimitStore()

    for (let i = 0; i < rateLimitPolicies.teamInviteCreate.limit; i++) {
      await consumeRateLimit({
        policy: rateLimitPolicies.teamInviteCreate,
        identity: { type: "team", id: "team_1" },
        store,
        now,
      })
    }

    await expect(
      consumeRateLimit({
        policy: rateLimitPolicies.teamInviteCreate,
        identity: { type: "team", id: "team_1" },
        store,
        now,
      })
    ).resolves.toMatchObject({ allowed: false })
  })

  it("invite acceptance attempts are rate-limited", async () => {
    const store = new MemoryRateLimitStore()

    for (let i = 0; i < rateLimitPolicies.inviteAcceptIp.limit; i++) {
      await consumeRateLimit({
        policy: rateLimitPolicies.inviteAcceptIp,
        identity: { type: "ip", id: "203.0.113.20" },
        store,
        now,
      })
    }

    await expect(
      consumeRateLimit({
        policy: rateLimitPolicies.inviteAcceptIp,
        identity: { type: "ip", id: "203.0.113.20" },
        store,
        now,
      })
    ).resolves.toMatchObject({ allowed: false })
  })

  it("uses user ID when authenticated", () => {
    expect(identityForUserOrIp("user_1", "203.0.113.10")).toEqual({ type: "user", id: "user_1" })
    expect(buildRateLimitKey("ai:free", { type: "user", id: "user_1" })).toBe("ai:free:user:user_1")
  })

  it("uses IP when unauthenticated", () => {
    expect(identityForUserOrIp(null, "203.0.113.10")).toEqual({ type: "ip", id: "203.0.113.10" })
  })

  it("extracts client IP from trusted proxy headers", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.10, 198.51.100.1" })
    expect(getClientIpFromHeaders(headers)).toBe("203.0.113.10")
  })

  it("429 response shape is safe", async () => {
    const response = rateLimitResponse({
      allowed: false,
      key: "hidden:key",
      limit: 3,
      remaining: 0,
      resetAt: new Date("2026-05-17T01:00:00Z"),
      retryAfterSeconds: 3600,
    })

    expect(response.status).toBe(429)
    expect(response.headers.get("Retry-After")).toBe("3600")
    await expect(response.json()).resolves.toEqual({
      error: "rate_limited",
      limit: 3,
      retryAfterSeconds: 3600,
    })
  })

  it("production behavior is explicit when durable storage is unavailable", () => {
    expect(getRateLimitRuntimeMode({ NODE_ENV: "production" })).toBe("unavailable")
    expect(getRateLimitRuntimeMode({ NODE_ENV: "production", DATABASE_URL: "postgres://example" })).toBe("db")
    expect(getRateLimitRuntimeMode({ NODE_ENV: "test" })).toBe("memory")
  })
})
