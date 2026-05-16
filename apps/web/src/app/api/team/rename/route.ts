export const dynamic = "force-dynamic"

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/db"
import { teams } from "@/db/schema"
import { eq, and } from "drizzle-orm"

export async function POST(req: NextRequest) {
  const { userId } = await auth()
  if (!userId) return NextResponse.json({ error: "Unauthenticated" }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const { teamId, name } = body as { teamId?: string; name?: string }

  if (!teamId || !name?.trim()) {
    return NextResponse.json({ error: "teamId and name are required" }, { status: 400 })
  }

  if (name.trim().length > 60) {
    return NextResponse.json({ error: "Team name must be 60 characters or fewer" }, { status: 400 })
  }

  const result = await db
    .update(teams)
    .set({ name: name.trim() })
    .where(and(eq(teams.id, teamId), eq(teams.ownerId, userId)))
    .returning({ id: teams.id })

  if (result.length === 0) {
    return NextResponse.json({ error: "Team not found or you are not the owner" }, { status: 403 })
  }

  return NextResponse.json({ ok: true })
}
