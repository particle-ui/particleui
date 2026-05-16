export const dynamic = "force-dynamic"

import { db } from "@/db"
import { teamInvites, teams, users, teamMembers } from "@/db/schema"
import { eq, and, isNull, gt } from "drizzle-orm"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Users, Check, X } from "@phosphor-icons/react/dist/ssr"
import { AcceptButton } from "./_components/accept-button"

export default async function InviteAcceptPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const { userId } = await auth()

  if (!process.env.DATABASE_URL) {
    return <ErrorCard message="Database not configured." />
  }

  // Look up the invite
  const [invite] = await db
    .select({
      id: teamInvites.id,
      email: teamInvites.email,
      acceptedAt: teamInvites.acceptedAt,
      expiresAt: teamInvites.expiresAt,
      teamId: teamInvites.teamId,
      teamName: teams.name,
    })
    .from(teamInvites)
    .innerJoin(teams, eq(teamInvites.teamId, teams.id))
    .where(eq(teamInvites.token, token))
    .limit(1)

  if (!invite) return <ErrorCard message="Invite not found or already used." />
  if (invite.acceptedAt) return <ErrorCard message="This invite has already been accepted." />
  if (new Date(invite.expiresAt) < new Date()) return <ErrorCard message="This invite has expired. Ask your team owner to send a new one." />

  // If not signed in, redirect to sign-up with return URL
  if (!userId) {
    redirect(`/sign-up?redirect_url=/dashboard/team/invite/${token}`)
  }

  // Check if user is already a member
  const [alreadyMember] = await db
    .select({ id: teamMembers.id })
    .from(teamMembers)
    .where(and(eq(teamMembers.teamId, invite.teamId), eq(teamMembers.userId, userId)))
    .limit(1)

  if (alreadyMember) {
    return (
      <PageShell>
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-success-dim)] border border-[var(--color-success-border)] mb-5">
          <Check size={22} className="text-[var(--color-success-text)]" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-[var(--color-text-1)] mb-2">Already a member</h1>
        <p className="text-sm text-[var(--color-text-3)] mb-6">You're already on the <strong className="text-[var(--color-text-2)]">{invite.teamName}</strong> team.</p>
        <Link href="/dashboard/team" className="text-sm text-[var(--color-accent)] hover:underline">Go to team dashboard →</Link>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent-border)] mb-5">
        <Users size={22} className="text-[var(--color-accent)]" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-3">Team invite</p>
      <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-1)] mb-2">
        Join {invite.teamName}
      </h1>
      <p className="text-sm text-[var(--color-text-3)] mb-8 leading-relaxed">
        You've been invited to join the <strong className="text-[var(--color-text-2)]">{invite.teamName}</strong> team on ParticleUI.
        Accepting gives you Pro access to all components.
      </p>
      <AcceptButton inviteToken={token} />
      <p className="mt-4 text-[11px] text-[var(--color-text-4)]">
        Invite sent to {invite.email} · expires {new Date(invite.expiresAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      </p>
    </PageShell>
  )
}

function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-[var(--color-bg)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-10 text-center">
        {children}
      </div>
    </div>
  )
}

function ErrorCard({ message }: { message: string }) {
  return (
    <PageShell>
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-error-dim)] border border-[var(--color-error-border)] mb-5">
        <X size={22} className="text-[var(--color-error-text)]" />
      </div>
      <h1 className="text-lg font-bold tracking-tight text-[var(--color-text-1)] mb-2">Invalid invite</h1>
      <p className="text-sm text-[var(--color-text-3)] mb-6">{message}</p>
      <Link href="/" className="text-sm text-[var(--color-accent)] hover:underline">Go to ParticleUI →</Link>
    </PageShell>
  )
}
