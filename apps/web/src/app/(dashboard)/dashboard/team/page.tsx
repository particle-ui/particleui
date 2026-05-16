export const dynamic = "force-dynamic"

import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { users, teams, teamMembers, teamInvites } from "@/db/schema"
import { eq, and, isNull, count } from "drizzle-orm"
import type { Metadata } from "next"
import { Users, Sparkle, EnvelopeSimple, Crown } from "@phosphor-icons/react/dist/ssr"
import { InviteForm } from "./_components/invite-form"

export const metadata: Metadata = { title: "Team — ParticleUI" }

export default async function TeamPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const clerkUser = await currentUser()
  const dbReady = !!process.env.DATABASE_URL

  if (!dbReady) {
    return (
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-1)] mb-1">Team</h1>
        <p className="text-sm text-[var(--color-text-3)] mb-6">Manage your team members and invites.</p>
        <div className="rounded-xl border border-[var(--color-warning-border)] bg-[var(--color-warning-dim)] px-4 py-3">
          <p className="text-sm font-medium text-[var(--color-warning-text)]">Database not connected</p>
          <p className="text-xs text-[var(--color-text-3)] mt-0.5">Add <code>DATABASE_URL</code> to <code>.env.local</code>.</p>
        </div>
      </div>
    )
  }

  // Check user plan
  const [userRow] = await db.select({ plan: users.plan }).from(users).where(eq(users.id, userId)).limit(1)
  const plan = userRow?.plan ?? "free"

  if (plan !== "team") {
    return (
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-1)] mb-1">Team</h1>
        <p className="text-sm text-[var(--color-text-3)] mb-6">Collaborate with your team on ParticleUI.</p>
        <div className="rounded-xl border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)] p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent-border)] mb-4">
            <Users size={22} className="text-[var(--color-accent)]" />
          </div>
          <h2 className="text-lg font-semibold text-[var(--color-text-1)] mb-2">Team plan required</h2>
          <p className="text-sm text-[var(--color-text-3)] mb-5 max-w-sm mx-auto leading-relaxed">
            The Team plan gives you 5 shared seats, one invoice, and team-level analytics. One purchase, shared forever.
          </p>
          <a
            href="/dashboard/plan"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] px-6 py-2.5 text-sm font-semibold hover:brightness-90 transition-all"
          >
            <Sparkle size={13} weight="fill" />
            Upgrade to Team — $299
          </a>
        </div>
      </div>
    )
  }

  // Load team
  const team = await db
    .select()
    .from(teams)
    .where(eq(teams.ownerId, userId))
    .limit(1)
    .then(r => r[0] ?? null)

  // Also check if user is a member of another team
  const memberOf = !team
    ? await db
        .select({ teamId: teamMembers.teamId })
        .from(teamMembers)
        .where(eq(teamMembers.userId, userId))
        .limit(1)
        .then(r => r[0] ?? null)
    : null

  const teamId = team?.id ?? memberOf?.teamId ?? null

  let members: { userId: string; role: string; email: string; joinedAt: Date }[] = []
  let pendingInvites: { id: string; email: string; expiresAt: Date; createdAt: Date }[] = []
  let memberCount = 0
  const isOwner = !!team

  if (teamId) {
    const memberRows = await db
      .select({
        userId: teamMembers.userId,
        role: teamMembers.role,
        email: users.email,
        joinedAt: teamMembers.joinedAt,
      })
      .from(teamMembers)
      .innerJoin(users, eq(teamMembers.userId, users.id))
      .where(eq(teamMembers.teamId, teamId))
      .orderBy(teamMembers.joinedAt)

    members = memberRows
    memberCount = memberRows.length

    if (isOwner) {
      pendingInvites = await db
        .select({
          id: teamInvites.id,
          email: teamInvites.email,
          expiresAt: teamInvites.expiresAt,
          createdAt: teamInvites.createdAt,
        })
        .from(teamInvites)
        .where(and(eq(teamInvites.teamId, teamId), isNull(teamInvites.acceptedAt)))
        .orderBy(teamInvites.createdAt)
    }
  }

  const maxSeats = team?.maxSeats ?? 5
  const seatsFree = Math.max(maxSeats - memberCount - pendingInvites.length, 0)
  const ownerEmail = clerkUser?.emailAddresses[0]?.emailAddress ?? ""

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-1)] mb-1">Team</h1>
        <p className="text-sm text-[var(--color-text-3)]">
          Manage members and invites for your shared team license.
        </p>
      </div>

      {/* Seat usage */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Active members", value: memberCount },
          { label: "Pending invites", value: pendingInvites.length },
          { label: "Seats available", value: seatsFree },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-4)] mb-2">{label}</p>
            <p className="text-3xl font-bold tracking-tight text-[var(--color-text-1)]">{value}</p>
          </div>
        ))}
      </div>

      {/* Members */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] mb-4">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
          <h2 className="text-sm font-semibold text-[var(--color-text-1)] flex items-center gap-2">
            <Users size={15} className="text-[var(--color-text-4)]" />
            Members
          </h2>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-4)]">
            {memberCount} / {maxSeats} seats
          </span>
        </div>

        {members.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Users size={24} className="text-[var(--color-text-4)] mb-2" />
            <p className="text-xs text-[var(--color-text-4)]">No members yet. Invite your team below.</p>
          </div>
        ) : (
          <ul className="divide-y divide-[var(--color-border)]">
            {members.map((m) => (
              <li key={m.userId} className="flex items-center gap-4 px-5 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--color-text-1)] truncate">{m.email}</p>
                  <p className="text-[11px] text-[var(--color-text-4)] mt-0.5">
                    Joined {new Date(m.joinedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded border ${
                  m.role === "owner"
                    ? "bg-[var(--color-accent-dim)] text-[var(--color-accent-text)] border-[var(--color-accent-border)]"
                    : "bg-[var(--color-surface-2)] text-[var(--color-text-3)] border-[var(--color-border)]"
                }`}>
                  {m.role === "owner" && <Crown size={9} weight="fill" />}
                  {m.role}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pending invites */}
      {isOwner && pendingInvites.length > 0 && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] mb-4">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[var(--color-border)]">
            <EnvelopeSimple size={15} className="text-[var(--color-text-4)]" />
            <h2 className="text-sm font-semibold text-[var(--color-text-1)]">Pending invites</h2>
          </div>
          <ul className="divide-y divide-[var(--color-border)]">
            {pendingInvites.map((inv) => (
              <li key={inv.id} className="flex items-center justify-between gap-4 px-5 py-3">
                <div>
                  <p className="text-sm text-[var(--color-text-2)]">{inv.email}</p>
                  <p className="text-[11px] text-[var(--color-text-4)] mt-0.5">
                    Expires {new Date(inv.expiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded border bg-[var(--color-warning-dim)] text-[var(--color-warning-text)] border-[var(--color-warning-border)]">
                  pending
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Invite form — owners only, only if seats available */}
      {isOwner && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-5">
          <h2 className="text-sm font-semibold text-[var(--color-text-1)] mb-1">Invite a team member</h2>
          <p className="text-xs text-[var(--color-text-4)] mb-4">
            They'll get an email with a link to join your team. {seatsFree} seat{seatsFree !== 1 ? "s" : ""} remaining.
          </p>
          {seatsFree > 0 ? (
            <InviteForm teamId={teamId!} ownerEmail={ownerEmail} />
          ) : (
            <p className="text-xs text-[var(--color-text-4)] italic">All seats are filled.</p>
          )}
        </div>
      )}
    </div>
  )
}
