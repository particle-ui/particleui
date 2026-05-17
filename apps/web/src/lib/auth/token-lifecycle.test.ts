import { describe, expect, it, vi } from "vitest"
import {
  assertCanCreateToken,
  requireAuthenticatedUserId,
  revokeOwnedToken,
  TokenLifecycleError,
  type TokenRevocationStore,
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
