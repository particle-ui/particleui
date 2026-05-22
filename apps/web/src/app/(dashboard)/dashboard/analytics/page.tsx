export const dynamic = "force-dynamic"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { componentInstalls, teams, teamMembers } from "@/db/schema"
import { eq, and, gte, inArray, desc, sql, count } from "drizzle-orm"
import type { Metadata } from "next"
import { ChartBar, Download, Globe, Sparkle, Users } from "@phosphor-icons/react/dist/ssr"

export const metadata: Metadata = { title: "Analytics — ParticleUI" }

function daysAgo(n: number) {
  return new Date(Date.now() - n * 24 * 60 * 60 * 1000)
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

const FW_COLOR: Record<string, { bar: string; badge: string }> = {
  react:  { bar: "bg-[var(--color-info-text)]",    badge: "bg-[var(--color-info-dim)] text-[var(--color-info-text)] border-[var(--color-info-border)]" },
  vue:    { bar: "bg-[var(--color-success-text)]",  badge: "bg-[var(--color-success-dim)] text-[var(--color-success-text)] border-[var(--color-success-border)]" },
  svelte: { bar: "bg-[var(--color-error-text)]",    badge: "bg-[var(--color-error-dim)] text-[var(--color-error-text)] border-[var(--color-error-border)]" },
}

export default async function AnalyticsPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const dbReady = !!process.env.DATABASE_URL

  let totalAllTime = 0
  let total30d = 0
  let total7d = 0
  let uniqueComponents = 0
  let dailyCounts: { day: string; count: number }[] = []
  let topComponents: { name: string; count: number }[] = []
  let fwBreakdown: { framework: string; count: number }[] = []
  let tierBreakdown: { tier: string; count: number }[] = []

  // Team context
  let isTeamOwner = false
  let teamName: string | null = null
  let teamMemberIds: string[] = [userId]

  if (dbReady) {
    try {
      // Check if user owns a team
      const ownedTeam = await db
        .select({ id: teams.id, name: teams.name })
        .from(teams)
        .where(eq(teams.ownerId, userId))
        .limit(1)
        .then(r => r[0] ?? null)

      if (ownedTeam) {
        isTeamOwner = true
        teamName = ownedTeam.name

        // Get all member IDs for team-wide queries
        const members = await db
          .select({ userId: teamMembers.userId })
          .from(teamMembers)
          .where(eq(teamMembers.teamId, ownedTeam.id))

        teamMemberIds = members.map(m => m.userId)
        if (!teamMemberIds.includes(userId)) teamMemberIds.push(userId)
      }

      const since30 = daysAgo(30)
      const since7  = daysAgo(7)

      // Use inArray for team queries, eq for personal
      const userFilter = teamMemberIds.length > 1
        ? inArray(componentInstalls.userId, teamMemberIds)
        : eq(componentInstalls.userId, userId)

      const [all] = await db.select({ c: count() }).from(componentInstalls).where(userFilter)
      totalAllTime = all?.c ?? 0

      const [m30] = await db.select({ c: count() }).from(componentInstalls)
        .where(and(userFilter, gte(componentInstalls.createdAt, since30)))
      total30d = m30?.c ?? 0

      const [m7] = await db.select({ c: count() }).from(componentInstalls)
        .where(and(userFilter, gte(componentInstalls.createdAt, since7)))
      total7d = m7?.c ?? 0

      const [uniq] = await db
        .select({ c: sql<number>`count(distinct ${componentInstalls.componentName})` })
        .from(componentInstalls)
        .where(userFilter)
      uniqueComponents = uniq?.c ?? 0

      // Daily trend
      const dailyRows = await db
        .select({
          day: sql<string>`date_trunc('day', ${componentInstalls.createdAt})::date::text`,
          count: sql<number>`count(*)`,
        })
        .from(componentInstalls)
        .where(and(userFilter, gte(componentInstalls.createdAt, since30)))
        .groupBy(sql`date_trunc('day', ${componentInstalls.createdAt})`)
        .orderBy(sql`date_trunc('day', ${componentInstalls.createdAt})`)

      const dayMap = new Map(dailyRows.map(r => [r.day, Number(r.count)]))
      dailyCounts = Array.from({ length: 30 }, (_, i) => {
        const d = daysAgo(29 - i)
        const key = d.toISOString().slice(0, 10)
        return { day: key, count: dayMap.get(key) ?? 0 }
      })

      topComponents = (await db
        .select({
          name: componentInstalls.componentName,
          count: sql<number>`count(*)`,
        })
        .from(componentInstalls)
        .where(userFilter)
        .groupBy(componentInstalls.componentName)
        .orderBy(desc(sql`count(*)`))
        .limit(10)
      ).map(r => ({ name: r.name, count: Number(r.count) }))

      fwBreakdown = (await db
        .select({
          framework: componentInstalls.framework,
          count: sql<number>`count(*)`,
        })
        .from(componentInstalls)
        .where(userFilter)
        .groupBy(componentInstalls.framework)
        .orderBy(desc(sql`count(*)`))
      ).map(r => ({ framework: r.framework, count: Number(r.count) }))

      tierBreakdown = (await db
        .select({
          tier: componentInstalls.tier,
          count: sql<number>`count(*)`,
        })
        .from(componentInstalls)
        .where(userFilter)
        .groupBy(componentInstalls.tier)
        .orderBy(desc(sql`count(*)`))
      ).map(r => ({ tier: r.tier, count: Number(r.count) }))

    } catch (e) {
      console.error("[analytics] DB error:", e)
    }
  }

  const maxDaily = Math.max(...dailyCounts.map(d => d.count), 1)
  const maxComponent = Math.max(...topComponents.map(c => c.count), 1)
  const fwTotal = fwBreakdown.reduce((s, r) => s + r.count, 0) || 1

  const STAT_CARDS = [
    { label: "All-time installs",   value: totalAllTime,     icon: Download  },
    { label: "Last 30 days",        value: total30d,         icon: ChartBar  },
    { label: "Last 7 days",         value: total7d,          icon: Sparkle   },
    { label: "Unique components",   value: uniqueComponents, icon: Globe     },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-1)] mb-1">Analytics</h1>
        <p className="text-sm text-[var(--color-text-3)]">
          {isTeamOwner
            ? `Team-wide install data for ${teamName} · ${teamMemberIds.length} member${teamMemberIds.length !== 1 ? "s" : ""}`
            : "Your install history across all frameworks and components."}
        </p>
      </div>

      {/* Team badge */}
      {isTeamOwner && (
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)] px-3 py-1.5 text-xs font-semibold text-[var(--color-accent)]">
          <Users size={11} weight="fill" />
          Showing team-wide data — {teamMemberIds.length} member{teamMemberIds.length !== 1 ? "s" : ""}
        </div>
      )}

      {!dbReady && (
        <div className="mb-6 rounded-xl border border-[var(--color-warning-border)] bg-[var(--color-warning-dim)] px-4 py-3">
          <p className="text-sm font-medium text-[var(--color-warning-text)]">Database not connected</p>
          <p className="text-xs text-[var(--color-text-3)] mt-0.5">
            Add <code>DATABASE_URL</code> to <code>.env.local</code> to see real data.
          </p>
        </div>
      )}

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {STAT_CARDS.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-4)]">{label}</p>
              <Icon size={13} className="text-[var(--color-text-4)]" />
            </div>
            <p className="text-3xl font-bold tracking-tight text-[var(--color-text-1)]">{value}</p>
          </div>
        ))}
      </div>

      {/* Daily trend */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-5 mb-4">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-[var(--color-text-1)]">Installs over time</h2>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-4)]">Last 30 days</span>
        </div>

        {totalAllTime === 0 ? (
          <EmptyState message="No installs yet — start by running the CLI." />
        ) : (
          <>
            <div className="flex items-end gap-[3px] h-28 mb-2">
              {dailyCounts.map(({ day, count: c }) => (
                <div
                  key={day}
                  className="group relative flex-1 flex flex-col justify-end"
                  title={`${formatDate(new Date(day + "T12:00:00"))}: ${c}`}
                >
                  <div
                    className="w-full rounded-sm bg-[var(--color-accent)] opacity-70 group-hover:opacity-100 transition-opacity"
                    style={{ height: `${Math.max((c / maxDaily) * 100, c > 0 ? 4 : 0)}%` }}
                  />
                  {c > 0 && (
                    <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-10 pointer-events-none">
                      <div className="rounded-md bg-[var(--color-bg)] border border-[var(--color-border)] px-2 py-1 text-[10px] font-medium text-[var(--color-text-1)] whitespace-nowrap shadow-sm">
                        {c}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-[9px] text-[var(--color-text-4)] mt-1">
              <span>{formatDate(new Date(dailyCounts[0].day + "T12:00:00"))}</span>
              <span>{formatDate(new Date(dailyCounts[14].day + "T12:00:00"))}</span>
              <span>{formatDate(new Date(dailyCounts[29].day + "T12:00:00"))}</span>
            </div>
          </>
        )}
      </div>

      {/* Bottom grid */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Top components */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-5">
          <h2 className="text-sm font-semibold text-[var(--color-text-1)] mb-5">Top components</h2>
          {topComponents.length === 0 ? (
            <EmptyState message="No installs yet." />
          ) : (
            <ul className="space-y-3">
              {topComponents.map(({ name, count: c }, i) => (
                <li key={name} className="flex items-center gap-3">
                  <span className="w-4 text-[10px] text-[var(--color-text-4)] font-mono text-right shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono text-[var(--color-text-1)] truncate">{name}</span>
                      <span className="text-[10px] text-[var(--color-text-4)] ml-2 shrink-0">{c}</span>
                    </div>
                    <div className="h-1 rounded-full bg-[var(--color-surface-2)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[var(--color-accent)] opacity-60"
                        style={{ width: `${(c / maxComponent) * 100}%` }}
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Framework breakdown */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-5">
            <h2 className="text-sm font-semibold text-[var(--color-text-1)] mb-4">Framework</h2>
            {fwBreakdown.length === 0 ? (
              <EmptyState message="No data yet." />
            ) : (
              <>
                <div className="flex h-2 rounded-full overflow-hidden mb-4 gap-px">
                  {fwBreakdown.map(({ framework, count: c }) => {
                    const pct = (c / fwTotal) * 100
                    const col = FW_COLOR[framework]?.bar ?? "bg-[var(--color-text-4)]"
                    return <div key={framework} className={`${col} opacity-80`} style={{ width: `${pct}%` }} />
                  })}
                </div>
                <ul className="space-y-2">
                  {fwBreakdown.map(({ framework, count: c }) => {
                    const pct = Math.round((c / fwTotal) * 100)
                    const badge = FW_COLOR[framework]?.badge ?? "bg-[var(--color-surface-2)] text-[var(--color-text-3)] border-[var(--color-border)]"
                    return (
                      <li key={framework} className="flex items-center justify-between">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${badge}`}>
                          {framework}
                        </span>
                        <span className="text-xs text-[var(--color-text-3)]">
                          {c} <span className="text-[var(--color-text-4)]">({pct}%)</span>
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </>
            )}
          </div>

          {/* Tier breakdown */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-5">
            <h2 className="text-sm font-semibold text-[var(--color-text-1)] mb-4">Tier</h2>
            {tierBreakdown.length === 0 ? (
              <EmptyState message="No data yet." />
            ) : (
              <ul className="space-y-3">
                {tierBreakdown.map(({ tier, count: c }) => {
                  const pct = Math.round((c / totalAllTime) * 100)
                  const isPro = tier === "pro"
                  return (
                    <li key={tier} className="flex items-center gap-3">
                      <span className={`flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded border shrink-0 ${
                        isPro
                          ? "bg-[var(--color-accent-dim)] text-[var(--color-accent-text)] border-[var(--color-accent-border)]"
                          : "bg-[var(--color-surface-2)] text-[var(--color-text-3)] border-[var(--color-border)]"
                      }`}>
                        {isPro && <Sparkle size={8} weight="fill" />}
                        {tier}
                      </span>
                      <div className="flex-1 h-1 rounded-full bg-[var(--color-surface-2)] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${isPro ? "bg-[var(--color-accent)]" : "bg-[var(--color-text-3)]"} opacity-60`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[var(--color-text-4)] shrink-0">{c}</span>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <ChartBar size={24} className="text-[var(--color-text-4)] mb-2" />
      <p className="text-xs text-[var(--color-text-4)]">{message}</p>
    </div>
  )
}
