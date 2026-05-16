export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/db"
import { teamInvites, teamMembers, users } from "@/db/schema"
import { eq, and, isNull } from "drizzle-orm"
import { createToken } from "@/lib/auth/token"

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })

  const { token } = await params

  const [invite] = await db
    .select()
    .from(teamInvites)
    .where(and(eq(teamInvites.token, token), isNull(teamInvites.acceptedAt)))
    .limit(1)

  if (!invite) {
    return NextResponse.json({ error: "Invite not found or already used" }, { status: 404 })
  }

  if (new Date(invite.expiresAt) < new Date()) {
    return NextResponse.json({ error: "Invite has expired" }, { status: 410 })
  }

  // Check already a member
  const [existing] = await db
    .select({ id: teamMembers.id })
    .from(teamMembers)
    .where(and(eq(teamMembers.teamId, invite.teamId), eq(teamMembers.userId, userId)))
    .limit(1)

  if (existing) {
    return NextResponse.json({ error: "Already a member of this team" }, { status: 400 })
  }

  // Add to team + upgrade user plan + auto-issue a Pro token
  await db.insert(teamMembers).values({
    teamId: invite.teamId,
    userId,
    role: "member",
  })

  await db
    .update(users)
    .set({ plan: "team" })
    .where(eq(users.id, userId))

  await db
    .update(teamInvites)
    .set({ acceptedAt: new Date() })
    .where(eq(teamInvites.id, invite.id))

  // Issue a Pro token for the new member
  await createToken(userId, "Team auto-issued token").catch(() => {})

  return NextResponse.json({ ok: true })
}
