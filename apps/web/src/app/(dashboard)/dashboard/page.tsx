export const dynamic = "force-dynamic"

import { auth, currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { users, apiTokens, componentInstalls } from "@/db/schema"
import { eq, isNull, and, desc, gte, count, sql } from "drizzle-orm"
import Link from "next/link"
import { Key, Download, ArrowRight, Sparkle } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Dashboard" }

function relativeTime(date: Date) {
  const diff = Date.now() - date.getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return "just now"
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

const FW_COLORS: Record<string, string> = {
  react: "bg-[var(--color-info-dim)] text-[var(--color-info-text)] border-[var(--color-info-border)]",
  vue: "bg-[var(--color-success-dim)] text-[var(--color-success-text)] border-[var(--color-success-border)]",
  svelte: "bg-[var(--color-error-dim)] text-[var(--color-error-text)] border-[var(--color-error-border)]",
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ upgraded?: string }>
}) {
  const { upgraded } = await searchParams
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const clerkUser = await currentUser()
  const dbReady = !!process.env.DATABASE_URL

  let user: { plan: string; createdAt: Date; email: string } | undefined
  let activeTokenCount = 0
  let recentInstalls: { componentName: string; framework: string; tier: string; createdAt: Date }[] = []
  let totalInstalls30d = 0
  let topComponent: string | null = null

  if (dbReady) {
    try {
      if (clerkUser) {
        await db
          .insert(users)
          .values({
            id: userId,
            email: clerkUser.emailAddresses[0]?.emailAddress ?? "",
            plan: "free",
          })
          .onConflictDoNothing()
      }

      const [userRow] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
      user = userRow

      const since30d = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

      const [tokenCountRow] = await db
        .select({ count: count() })
        .from(apiTokens)
        .where(and(eq(apiTokens.userId, userId), isNull(apiTokens.revokedAt)))
      activeTokenCount = tokenCountRow?.count ?? 0

      recentInstalls = await db
        .select({
          componentName: componentInstalls.componentName,
          framework: componentInstalls.framework,
          tier: componentInstalls.tier,
          createdAt: componentInstalls.createdAt,
        })
        .from(componentInstalls)
        .where(eq(componentInstalls.userId, userId))
        .orderBy(desc(componentInstalls.createdAt))
        .limit(8)

      const [installCount] = await db
        .select({ count: count() })
        .from(componentInstalls)
        .where(and(eq(componentInstalls.userId, userId), gte(componentInstalls.createdAt, since30d)))
      totalInstalls30d = installCount?.count ?? 0

      const topRows = await db
        .select({
          componentName: componentInstalls.componentName,
          installs: sql<number>`count(*)`,
        })
        .from(componentInstalls)
        .where(and(eq(componentInstalls.userId, userId), gte(componentInstalls.createdAt, since30d)))
        .groupBy(componentInstalls.componentName)
        .orderBy(desc(sql`count(*)`))
        .limit(1)
      topComponent = topRows[0]?.componentName ?? null
    } catch (e) {
      console.error("[dashboard] DB error:", e)
    }
  }

  const isPro = user?.plan === "pro"
  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "—"

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-1)] mb-1">
          Welcome back{clerkUser?.firstName ? `, ${clerkUser.firstName}` : ""}
        </h1>
        <p className="text-sm text-[var(--color-text-3)]">
          {clerkUser?.emailAddresses[0]?.emailAddress}
        </p>
      </div>

      {/* Post-purchase success banner */}
      {upgraded === "1" && (
        <div className="mb-6 rounded-xl border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)] px-5 py-4 flex items-start gap-3">
          <Sparkle size={16} weight="fill" className="text-[var(--color-accent)] mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-[var(--color-text-1)] mb-0.5">Welcome to ParticleUI Pro! 🎉</p>
            <p className="text-xs text-[var(--color-text-3)]">
              Your license is active. An API token has been auto-generated — check your email or go to{" "}
              <a href="/dashboard/tokens" className="text-[var(--color-accent)] hover:underline font-medium">Tokens</a>{" "}
              to copy it. You can now install any Pro component.
            </p>
          </div>
        </div>
      )}

      {/* DB not ready warning */}
      {!dbReady && (
        <div className="mb-6 rounded-xl border border-[var(--color-warning-border)] bg-[var(--color-warning-dim)] px-4 py-3">
          <p className="text-sm font-medium text-[var(--color-warning-text)] mb-0.5">Database not connected</p>
          <p className="text-xs text-[var(--color-text-3)]">
            Add <code className="text-[var(--color-warning-text)]">DATABASE_URL</code> to <code>.env.local</code> to enable all features. Get a free DB at{" "}
            <a href="https://neon.tech" target="_blank" rel="noreferrer" className="underline">neon.tech</a>.
          </p>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Plan card */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-4)] mb-1">Current Plan</p>
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                isPro
                  ? "bg-[var(--color-accent-dim)] border border-[var(--color-accent-border)] text-[var(--color-accent-text)]"
                  : "bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-3)]"
              }`}>
                {isPro && <Sparkle size={10} weight="fill" />}
                {isPro ? "Pro" : "Free"}
              </span>
            </div>
            <p className="text-[10px] text-[var(--color-text-4)]">since {memberSince}</p>
          </div>
          {!isPro && (
            <Link
              href="/dashboard/plan"
              className="flex items-center gap-1 text-xs text-[var(--color-accent-text)] hover:underline mt-2"
            >
              Upgrade to Pro <ArrowRight size={11} />
            </Link>
          )}
        </div>

        {/* Stats card */}
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-5">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-4)] mb-3">30-day activity</p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-[var(--color-text-3)]">
                <Download size={13} /> Installs
              </span>
              <span className="font-semibold text-sm text-[var(--color-text-1)]">{totalInstalls30d}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-[var(--color-text-3)]">
                <Key size={13} /> Active tokens
              </span>
              <span className="font-semibold text-sm text-[var(--color-text-1)]">{activeTokenCount}</span>
            </div>
            {topComponent && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--color-text-3)]">Top component</span>
                <span className="font-mono text-xs text-[var(--color-text-2)]">{topComponent}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] mb-6">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
          <h2 className="text-sm font-semibold text-[var(--color-text-1)]">Recent installs</h2>
          <Link href="/dashboard/installs" className="text-xs text-[var(--color-text-4)] hover:text-[var(--color-text-2)] transition-colors">
            View all →
          </Link>
        </div>
        {recentInstalls.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Download size={28} className="text-[var(--color-text-4)] mb-3" />
            <p className="text-sm text-[var(--color-text-3)] mb-1">No installs yet</p>
            <p className="text-xs text-[var(--color-text-4)]">
              Installs appear here when you use the CLI to add components.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[var(--color-border)]">
            {recentInstalls.map((install, i) => (
              <li key={i} className="flex items-center gap-3 px-5 py-3">
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/docs/components/${install.componentName}`}
                    className="text-sm font-medium text-[var(--color-text-1)] hover:underline font-mono"
                  >
                    {install.componentName}
                  </Link>
                </div>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${FW_COLORS[install.framework] ?? "bg-[var(--color-surface-2)] text-[var(--color-text-3)] border-[var(--color-border)]"}`}>
                  {install.framework}
                </span>
                <span className="text-[11px] text-[var(--color-text-4)] shrink-0">
                  {relativeTime(new Date(install.createdAt))}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick start — show if no tokens */}
      {activeTokenCount === 0 && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-5">
          <h2 className="text-sm font-semibold text-[var(--color-text-1)] mb-3">Quick start</h2>
          <p className="text-xs text-[var(--color-text-3)] mb-3">
            Create an API token, then add it to your project:
          </p>
          <pre className="rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] p-4 text-[11px] font-mono text-[var(--color-text-3)] overflow-x-auto leading-relaxed">{`# .env
PARTICLEUI_TOKEN=<your-token>

# components.json
"registries": {
  "@particleui": {
    "url": "https://particleui.dev/r/react/{name}.json",
    "headers": { "Authorization": "Bearer \${PARTICLEUI_TOKEN}" }
  }
}`}</pre>
          <Link
            href="/dashboard/tokens"
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-[var(--color-accent-text)] hover:underline"
          >
            Create your first token <ArrowRight size={11} />
          </Link>
        </div>
      )}
    </div>
  )
}
