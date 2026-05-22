export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/db"
import { teams, teamMembers, teamInvites, users } from "@/db/schema"
import { eq, and, isNull, count, sql } from "drizzle-orm"
import { randomBytes } from "crypto"
import { sendTeamInviteEmail } from "@/lib/email"
import { normalizeEmail } from "@/lib/team/invite-acceptance"
import { consumeRateLimit, rateLimitPolicies, rateLimitResponse } from "@/lib/rate-limit/rate-limit"

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const { teamId, email } = body as { teamId?: string; email?: string }

  if (!teamId || !email) {
    return NextResponse.json({ error: "teamId and email are required" }, { status: 400 })
  }
  const inviteEmail = normalizeEmail(email)

  // Verify caller is the team owner
  const [team] = await db
    .select({ id: teams.id, name: teams.name, maxSeats: teams.maxSeats, ownerId: teams.ownerId })
    .from(teams)
    .where(and(eq(teams.id, teamId), eq(teams.ownerId, userId)))
    .limit(1)

  if (!team) {
    return NextResponse.json({ error: "Team not found or you are not the owner" }, { status: 403 })
  }

  const inviteLimit = await consumeRateLimit({
    policy: rateLimitPolicies.teamInviteCreate,
    identity: { type: "team", id: team.id },
  })
  if (!inviteLimit.allowed) return rateLimitResponse(inviteLimit)

  // Count current members + pending invites
  const [{ memberCount }] = await db
    .select({ memberCount: count() })
    .from(teamMembers)
    .where(eq(teamMembers.teamId, teamId))

  const [{ pendingCount }] = await db
    .select({ pendingCount: count() })
    .from(teamInvites)
    .where(and(eq(teamInvites.teamId, teamId), isNull(teamInvites.acceptedAt)))

  if (memberCount + pendingCount >= team.maxSeats) {
    return NextResponse.json({ error: "All seats are filled" }, { status: 400 })
  }

  // Don't re-invite someone already a member
  const [existingMember] = await db
    .select({ id: users.id })
    .from(users)
    .innerJoin(teamMembers, eq(teamMembers.userId, users.id))
    .where(and(eq(teamMembers.teamId, teamId), eq(sql`lower(trim(${users.email}))`, inviteEmail)))
    .limit(1)

  if (existingMember) {
    return NextResponse.json({ error: "This person is already a team member" }, { status: 400 })
  }

  // Create the invite token (expires in 7 days)
  const token = randomBytes(32).toString("hex")
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  await db.insert(teamInvites).values({
    teamId,
    email: inviteEmail,
    token,
    invitedBy: userId,
    expiresAt,
  })

  // Send invite email
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://particleui.dev"
  const inviteUrl = `${appUrl}/dashboard/team/invite/${token}`

  try {
    await sendTeamInviteEmail({ to: inviteEmail, teamName: team.name, inviteUrl })
  } catch (err) {
    console.error("[team/invite] Failed to send email:", err)
    // Don't fail the request — invite is created, email is best-effort
  }

  return NextResponse.json({ ok: true })
}
