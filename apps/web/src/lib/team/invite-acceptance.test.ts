import { describe, expect, it, vi } from "vitest"
import { getUserEntitlement, type EntitlementReader } from "@/lib/auth/entitlement"
import {
  acceptTeamInvite,
  getVerifiedEmailAddresses,
  normalizeEmail,
  requireAuthenticatedInviteUserId,
  TeamInviteAcceptanceError,
  type TeamInviteAcceptanceStore,
  type TeamInviteRecord,
} from "./invite-acceptance"

function invite(overrides: Partial<TeamInviteRecord> = {}): TeamInviteRecord {
  return {
    id: "invite_1",
    teamId: "team_1",
    email: "founder@example.com",
    acceptedAt: null,
    expiresAt: new Date("2026-05-24T00:00:00Z"),
    ...overrides,
  }
}

function storeFor(inviteRecord: TeamInviteRecord | null): TeamInviteAcceptanceStore & {
  acceptedMemberships: Set<string>
  acceptedInviteIds: Set<string>
  acceptInvite: ReturnType<typeof vi.fn<TeamInviteAcceptanceStore["acceptInvite"]>>
} {
  const acceptedMemberships = new Set<string>()
  const acceptedInviteIds = new Set<string>()

  return {
    acceptedMemberships,
    acceptedInviteIds,
    async getInviteByToken() {
      return inviteRecord
    },
    acceptInvite: vi.fn(async ({ inviteId, teamId, userId }) => {
      const membershipKey = `${teamId}:${userId}`
      if (acceptedMemberships.has(membershipKey)) {
        throw new TeamInviteAcceptanceError("already_member", "Already a member of this team")
      }

      acceptedMemberships.add(membershipKey)
      acceptedInviteIds.add(inviteId)
      return { ok: true }
    }),
  }
}

describe("secure team invite acceptance", () => {
  const now = new Date("2026-05-17T00:00:00Z")

  it("normalizes email by trimming whitespace and lowercasing", () => {
    expect(normalizeEmail("  Founder@Example.COM  ")).toBe("founder@example.com")
  })

  it("uses only verified Clerk email addresses for matching", () => {
    expect(
      getVerifiedEmailAddresses([
        { emailAddress: "attacker@example.com", verification: { status: "unverified" } },
        { emailAddress: " Founder@Example.COM ", verification: { status: "verified" } },
      ])
    ).toEqual(["founder@example.com"])
  })

  it("rejects unauthenticated users", () => {
    expect(() => requireAuthenticatedInviteUserId(null)).toThrow(TeamInviteAcceptanceError)
  })

  it("allows a signed-in user with the matching invited email to accept", async () => {
    const store = storeFor(invite())

    await expect(
      acceptTeamInvite({
        store,
        token: "invite_token",
        userId: "user_1",
        verifiedEmails: ["founder@example.com"],
        now,
      })
    ).resolves.toEqual({ ok: true })

    expect(store.acceptedMemberships.has("team_1:user_1")).toBe(true)
    expect(store.acceptedInviteIds.has("invite_1")).toBe(true)
  })

  it("rejects a signed-in user with a different verified email", async () => {
    const store = storeFor(invite())

    await expect(
      acceptTeamInvite({
        store,
        token: "invite_token",
        userId: "user_1",
        verifiedEmails: ["attacker@example.com"],
        now,
      })
    ).rejects.toMatchObject({ code: "email_mismatch" })

    expect(store.acceptInvite).not.toHaveBeenCalled()
  })

  it("matches email case-insensitively and trims whitespace", async () => {
    const store = storeFor(invite({ email: "  Founder@Example.COM  " }))

    await expect(
      acceptTeamInvite({
        store,
        token: "invite_token",
        userId: "user_1",
        verifiedEmails: [" founder@example.com "],
        now,
      })
    ).resolves.toEqual({ ok: true })
  })

  it("rejects expired invites", async () => {
    const store = storeFor(invite({ expiresAt: new Date("2026-05-16T23:59:59Z") }))

    await expect(
      acceptTeamInvite({
        store,
        token: "invite_token",
        userId: "user_1",
        verifiedEmails: ["founder@example.com"],
        now,
      })
    ).rejects.toMatchObject({ code: "expired_invite" })

    expect(store.acceptInvite).not.toHaveBeenCalled()
  })

  it("rejects already accepted invites", async () => {
    const store = storeFor(invite({ acceptedAt: new Date("2026-05-16T00:00:00Z") }))

    await expect(
      acceptTeamInvite({
        store,
        token: "invite_token",
        userId: "user_1",
        verifiedEmails: ["founder@example.com"],
        now,
      })
    ).rejects.toMatchObject({ code: "already_accepted" })

    expect(store.acceptInvite).not.toHaveBeenCalled()
  })

  it("does not create duplicate team membership on duplicate accept", async () => {
    const store = storeFor(invite())
    store.acceptedMemberships.add("team_1:user_1")

    await expect(
      acceptTeamInvite({
        store,
        token: "invite_token",
        userId: "user_1",
        verifiedEmails: ["founder@example.com"],
        now,
      })
    ).rejects.toMatchObject({ code: "already_member" })

    expect(store.acceptedMemberships.size).toBe(1)
  })

  it("team plan entitlement is active after valid acceptance updates the user plan", async () => {
    const reader: EntitlementReader = {
      async getUserPlan() {
        return "team"
      },
    }

    await expect(getUserEntitlement("user_1", reader)).resolves.toEqual({
      active: true,
      plan: "team",
    })
  })
})
