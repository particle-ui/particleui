export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { auth, currentUser } from "@clerk/nextjs/server"
import { db } from "@/db"
import { teamInvites, teamMembers, users } from "@/db/schema"
import { eq, and, isNull } from "drizzle-orm"
import { createToken } from "@/lib/auth/token"
import {
  acceptTeamInvite,
  getVerifiedEmailAddresses,
  TeamInviteAcceptanceError,
  type TeamInviteAcceptanceStore,
} from "@/lib/team/invite-acceptance"
import {
  consumeRateLimit,
  getClientIpFromHeaders,
  rateLimitPolicies,
  rateLimitResponse,
} from "@/lib/rate-limit/rate-limit"

function inviteErrorResponse(error: TeamInviteAcceptanceError): NextResponse {
  if (error.code === "unauthenticated") {
    return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })
  }

  if (error.code === "invalid_invite") {
    return NextResponse.json({ error: "Invite not found or already used" }, { status: 404 })
  }

  if (error.code === "expired_invite") {
    return NextResponse.json({ error: "Invite has expired" }, { status: 410 })
  }

  if (error.code === "email_mismatch") {
    return NextResponse.json(
      { error: "This invite is for a different email address" },
      { status: 403 }
    )
  }

  if (error.code === "already_member") {
    return NextResponse.json({ error: "Already a member of this team" }, { status: 400 })
  }

  return NextResponse.json({ error: "This invite has already been accepted" }, { status: 409 })
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })

  const { token } = await params
  const ipLimit = await consumeRateLimit({
    policy: rateLimitPolicies.inviteAcceptIp,
    identity: { type: "ip", id: getClientIpFromHeaders(_req.headers) },
  })
  if (!ipLimit.allowed) return rateLimitResponse(ipLimit)

  const userLimit = await consumeRateLimit({
    policy: rateLimitPolicies.inviteAcceptUser,
    identity: { type: "user", id: userId },
  })
  if (!userLimit.allowed) return rateLimitResponse(userLimit)

  const clerkUser = await currentUser()
  if (!clerkUser) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })

  const store: TeamInviteAcceptanceStore = {
    async getInviteByToken(inviteToken) {
      const [invite] = await db
        .select()
        .from(teamInvites)
        .where(eq(teamInvites.token, inviteToken))
        .limit(1)

      return invite ?? null
    },
    async acceptInvite({ inviteId, teamId, userId: memberUserId, acceptedAt }) {
      return db.transaction(async (tx) => {
        const [claimedInvite] = await tx
          .update(teamInvites)
          .set({ acceptedAt })
          .where(and(eq(teamInvites.id, inviteId), isNull(teamInvites.acceptedAt)))
          .returning({ id: teamInvites.id })

        if (!claimedInvite) {
          throw new TeamInviteAcceptanceError(
            "already_accepted",
            "This invite has already been accepted"
          )
        }

        const [membership] = await tx
          .insert(teamMembers)
          .values({
            teamId,
            userId: memberUserId,
            role: "member",
          })
          .onConflictDoNothing({ target: [teamMembers.teamId, teamMembers.userId] })
          .returning({ id: teamMembers.id })

        if (!membership) {
          throw new TeamInviteAcceptanceError("already_member", "Already a member of this team")
        }

        await tx.update(users).set({ plan: "team" }).where(eq(users.id, memberUserId))

        return { ok: true }
      })
    },
  }

  try {
    await acceptTeamInvite({
      store,
      token,
      userId,
      verifiedEmails: getVerifiedEmailAddresses(clerkUser.emailAddresses),
    })
  } catch (error) {
    if (error instanceof TeamInviteAcceptanceError) {
      return inviteErrorResponse(error)
    }

    throw error
  }

  // Issue a Pro token for the new member
  await createToken(userId, "Team auto-issued token").catch(() => {})

  return NextResponse.json({ ok: true })
}
