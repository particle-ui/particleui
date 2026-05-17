import { describe, expect, it, vi } from "vitest"
import {
  assertCanCreateToken,
  createTokenWithStore,
  hashToken,
  isDevelopmentTokenBypass,
  requireAuthenticatedUserId,
  revokeOwnedToken,
  TokenLifecycleError,
  validateStoredToken,
  type TokenCreationStore,
  type TokenRevocationStore,
  type TokenValidationRecord,
  type TokenValidationStore,
} from "./token-lifecycle"
import type { EntitlementReader, UserPlan } from "./entitlement"

function readerFor(plan: UserPlan | null): EntitlementReader {
  return {
    async getUserPlan() {
      return plan
    },
  }
}

function revocationStore(ownedTokenIds: Set<string>): TokenRevocationStore {
  return {
    async revokeTokenForOwner(tokenId) {
      return ownedTokenIds.has(tokenId)
    },
  }
}

function validationRecord(overrides: Partial<TokenValidationRecord> = {}): TokenValidationRecord {
  return {
    id: "token_id",
    userId: "user_pro",
    revokedAt: null,
    plan: "pro",
    ...overrides,
  }
}

function validationStore({
  hashRecord,
  legacyRecord,
}: {
  hashRecord?: TokenValidationRecord | null
  legacyRecord?: TokenValidationRecord | null
}): TokenValidationStore & {
  findByHash: ReturnType<typeof vi.fn<TokenValidationStore["findByHash"]>>
  findLegacyByPlaintext: ReturnType<typeof vi.fn<TokenValidationStore["findLegacyByPlaintext"]>>
  recordLastUsed: ReturnType<typeof vi.fn<TokenValidationStore["recordLastUsed"]>>
} {
  return {
    findByHash: vi.fn(async () => hashRecord ?? null),
    findLegacyByPlaintext: vi.fn(async () => legacyRecord ?? null),
    recordLastUsed: vi.fn(async () => {}),
  }
}

describe("token lifecycle authorization", () => {
  it("rejects unauthenticated users", () => {
    expect(() => requireAuthenticatedUserId(null)).toThrow(TokenLifecycleError)
    expect(() => requireAuthenticatedUserId(undefined)).toThrow("Unauthenticated")
  })

  it("rejects free users when creating a token", async () => {
    await expect(assertCanCreateToken("user_free", readerFor("free"))).rejects.toMatchObject({
      code: "not_entitled",
    })
  })

  it("allows Pro users to create a token", async () => {
    await expect(assertCanCreateToken("user_pro", readerFor("pro"))).resolves.toBe("pro")
  })

  it("allows Team users to create a token", async () => {
    await expect(assertCanCreateToken("user_team", readerFor("team"))).resolves.toBe("team")
  })

  it("rejects inactive or missing users when creating a token", async () => {
    await expect(assertCanCreateToken("missing_user", readerFor(null))).rejects.toMatchObject({
      code: "not_entitled",
    })
  })

  it("prevents revoking another user's token", async () => {
    const store = revocationStore(new Set(["own_token"]))

    await expect(revokeOwnedToken(store, "other_token", "user_owner")).rejects.toMatchObject({
      code: "not_found",
    })
  })

  it("allows a token owner to revoke their own token", async () => {
    const revokeTokenForOwner = vi.fn(async () => true)

    await expect(
      revokeOwnedToken({ revokeTokenForOwner }, "own_token", "user_owner")
    ).resolves.toBeUndefined()
    expect(revokeTokenForOwner).toHaveBeenCalledWith("own_token", "user_owner")
  })
})

describe("hash-only token storage", () => {
  it("created token stores hash and prefix but not raw token", async () => {
    const storedRecords: Parameters<TokenCreationStore["createTokenRecord"]>[0][] = []
    const store: TokenCreationStore = {
      async createTokenRecord(record) {
        storedRecords.push(record)
      },
    }

    const rawToken = await createTokenWithStore(store, "user_pro", "Default", readerFor("pro"))
    const [stored] = storedRecords

    expect(rawToken).toMatch(/^pui_[a-f0-9]+$/)
    expect(stored.tokenHash).toBe(hashToken(rawToken))
    expect(stored.tokenPrefix).toBe(rawToken.slice(0, 12))
    expect("token" in stored).toBe(false)
    expect(Object.values(stored)).not.toContain(rawToken)
  })

  it("raw token validates through hash lookup", async () => {
    const rawToken = "pui_hash_lookup_token"
    const store = validationStore({ hashRecord: validationRecord() })

    await expect(validateStoredToken(store, rawToken)).resolves.toMatchObject({
      valid: true,
      userId: "user_pro",
      tokenId: "token_id",
      plan: "pro",
    })
    expect(store.findByHash).toHaveBeenCalledWith(hashToken(rawToken))
    expect(store.findLegacyByPlaintext).not.toHaveBeenCalled()
    expect(store.recordLastUsed).toHaveBeenCalledOnce()
  })

  it("revoked token does not validate", async () => {
    const store = validationStore({
      hashRecord: validationRecord({ revokedAt: new Date("2026-05-17T00:00:00Z") }),
    })

    await expect(validateStoredToken(store, "pui_revoked")).resolves.toEqual({ valid: false })
    expect(store.recordLastUsed).not.toHaveBeenCalled()
  })

  it("downgraded user token is rejected", async () => {
    const store = validationStore({ hashRecord: validationRecord({ plan: "free" }) })

    await expect(validateStoredToken(store, "pui_downgraded")).resolves.toEqual({ valid: false })
    expect(store.recordLastUsed).not.toHaveBeenCalled()
  })

  it("legacy plaintext token fallback is intentionally preserved", async () => {
    const rawToken = "pui_legacy_plaintext_token"
    const store = validationStore({ hashRecord: null, legacyRecord: validationRecord() })

    await expect(validateStoredToken(store, rawToken)).resolves.toMatchObject({
      valid: true,
      tokenId: "token_id",
    })
    expect(store.findByHash).toHaveBeenCalledWith(hashToken(rawToken))
    expect(store.findLegacyByPlaintext).toHaveBeenCalledWith(rawToken)
  })

  it("raw token is returned only to the creator during creation", async () => {
    const createTokenRecord = vi.fn<TokenCreationStore["createTokenRecord"]>(async () => {})
    const store: TokenCreationStore = { createTokenRecord }

    const rawToken = await createTokenWithStore(store, "user_team", "Team", readerFor("team"))

    expect(typeof rawToken).toBe("string")
    expect(createTokenRecord).toHaveBeenCalledOnce()
    expect(createTokenRecord.mock.calls[0][0]).not.toHaveProperty("token")
  })

  it("production never accepts the development token bypass", () => {
    expect(
      isDevelopmentTokenBypass("pui_dev_secret", {
        NODE_ENV: "production",
        PARTICLEUI_DEV_TOKEN: "pui_dev_secret",
      })
    ).toBe(false)
  })
})
