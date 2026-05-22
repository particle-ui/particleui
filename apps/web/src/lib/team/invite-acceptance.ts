export type TeamInviteAcceptanceErrorCode =
  | "unauthenticated"
  | "invalid_invite"
  | "expired_invite"
  | "already_accepted"
  | "email_mismatch"
  | "already_member"

export class TeamInviteAcceptanceError extends Error {
  constructor(
    readonly code: TeamInviteAcceptanceErrorCode,
    message: string
  ) {
    super(message)
    this.name = "TeamInviteAcceptanceError"
  }
}

export type TeamInviteAcceptanceResult = {
  ok: true
}

export type TeamInviteRecord = {
  id: string
  teamId: string
  email: string
  acceptedAt: Date | null
  expiresAt: Date
}

export interface TeamInviteAcceptanceStore {
  getInviteByToken(token: string): Promise<TeamInviteRecord | null>
  acceptInvite(input: {
    inviteId: string
    teamId: string
    userId: string
    acceptedAt: Date
  }): Promise<TeamInviteAcceptanceResult>
}

export type VerifiedEmailAddressLike = {
  emailAddress: string
  verification?: {
    status?: string | null
  } | null
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export function getVerifiedEmailAddresses(
  emailAddresses: readonly VerifiedEmailAddressLike[]
): string[] {
  return emailAddresses
    .filter((email) => email.verification?.status === "verified")
    .map((email) => normalizeEmail(email.emailAddress))
}

export function requireAuthenticatedInviteUserId(userId: string | null | undefined): string {
  if (!userId) {
    throw new TeamInviteAcceptanceError("unauthenticated", "Unauthenticated")
  }

  return userId
}

export function getMatchingVerifiedEmail(
  invitedEmail: string,
  verifiedEmails: readonly string[]
): string | null {
  const normalizedInviteEmail = normalizeEmail(invitedEmail)
  return verifiedEmails.map(normalizeEmail).find((email) => email === normalizedInviteEmail) ?? null
}

export function requireInviteEmailMatch(
  invitedEmail: string,
  verifiedEmails: readonly string[]
): string {
  const matchedEmail = getMatchingVerifiedEmail(invitedEmail, verifiedEmails)
  if (!matchedEmail) {
    throw new TeamInviteAcceptanceError(
      "email_mismatch",
      "This invite is for a different email address"
    )
  }

  return matchedEmail
}

export function assertInviteCanBeAccepted(invite: TeamInviteRecord, now: Date): void {
  if (invite.acceptedAt) {
    throw new TeamInviteAcceptanceError("already_accepted", "This invite has already been accepted")
  }

  if (invite.expiresAt < now) {
    throw new TeamInviteAcceptanceError("expired_invite", "Invite has expired")
  }
}

export async function acceptTeamInvite(input: {
  store: TeamInviteAcceptanceStore
  token: string
  userId: string | null | undefined
  verifiedEmails: readonly string[]
  now?: Date
}): Promise<TeamInviteAcceptanceResult> {
  const userId = requireAuthenticatedInviteUserId(input.userId)
  const invite = await input.store.getInviteByToken(input.token)

  if (!invite) {
    throw new TeamInviteAcceptanceError("invalid_invite", "Invite not found or already used")
  }

  const acceptedAt = input.now ?? new Date()
  assertInviteCanBeAccepted(invite, acceptedAt)
  requireInviteEmailMatch(invite.email, input.verifiedEmails)

  return input.store.acceptInvite({
    inviteId: invite.id,
    teamId: invite.teamId,
    userId,
    acceptedAt,
  })
}
