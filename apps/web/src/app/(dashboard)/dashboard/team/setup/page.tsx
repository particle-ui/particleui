export const dynamic = "force-dynamic"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { teams, teamMembers } from "@/db/schema"
import { eq } from "drizzle-orm"
import type { Metadata } from "next"
import { Sparkle } from "@phosphor-icons/react/dist/ssr"
import { TeamSetupForm } from "./_components/team-setup-form"

export const metadata: Metadata = { title: "Set up your team — ParticleUI" }

export default async function TeamSetupPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  // Find the team this user owns
  const team = await db
    .select({ id: teams.id, name: teams.name })
    .from(teams)
    .where(eq(teams.ownerId, userId))
    .limit(1)
    .then(r => r[0] ?? null)

  if (!team) redirect("/dashboard")

  return (
    <div className="min-h-svh bg-[var(--color-bg)] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)] px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)] mb-5">
            <Sparkle size={10} weight="fill" />
            Team plan active
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-1)] mb-2">
            Name your team
          </h1>
          <p className="text-sm text-[var(--color-text-3)] leading-relaxed">
            This is what your teammates will see when they accept their invite.
            You can change it anytime from the team settings.
          </p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-8">
          <TeamSetupForm teamId={team.id} currentName={team.name} />
        </div>

        <p className="text-center text-xs text-[var(--color-text-4)] mt-5">
          You can always change this later in{" "}
          <a href="/dashboard/team" className="text-[var(--color-accent)] hover:underline">
            Team settings
          </a>
        </p>
      </div>
    </div>
  )
}
