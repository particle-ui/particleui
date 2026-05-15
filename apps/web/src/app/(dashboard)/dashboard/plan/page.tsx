export const dynamic = "force-dynamic"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { upgradeToPro, downgradeToFree } from "./actions"
import { Check, Sparkle, Warning } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Plan" }

const FREE_FEATURES = [
  "All free components (40+)",
  "React, Vue & Svelte registries",
  "Community support",
  "MIT licensed",
]

const PRO_FEATURES = [
  "Everything in Free",
  "All Pro components (Particle Hero, Aurora, Magnetic Button…)",
  "Full page blocks & templates",
  "Bundled Claude skills",
  "ParticleUI MCP server",
  "Priority support",
  "Lifetime updates",
]

export default async function PlanPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
  const isPro = user?.plan === "pro"

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-1)] mb-1">Plan</h1>
        <p className="text-sm text-[var(--color-text-3)]">
          Your current plan and upgrade options.
        </p>
      </div>

      {/* Current plan */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-4)] mb-1">Current Plan</p>
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${
                isPro
                  ? "bg-[var(--color-accent-dim)] border border-[var(--color-accent-border)] text-[var(--color-accent-text)]"
                  : "bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-2)]"
              }`}>
                {isPro && <Sparkle size={12} weight="fill" />}
                {isPro ? "Pro" : "Free"}
              </span>
              {isPro && user?.lsCustomerId?.startsWith("dummy_") && (
                <span className="text-[10px] text-[var(--color-warning-text)] bg-[var(--color-warning-dim)] border border-[var(--color-warning-border)] rounded-full px-2 py-0.5">
                  Dev mode
                </span>
              )}
            </div>
          </div>
          {user?.lsCustomerId && !user.lsCustomerId.startsWith("dummy_") && (
            <div className="text-right">
              <p className="text-[10px] text-[var(--color-text-4)]">Customer ID</p>
              <code className="text-xs font-mono text-[var(--color-text-3)]">{user.lsCustomerId}</code>
            </div>
          )}
        </div>

        <ul className="space-y-2">
          {(isPro ? PRO_FEATURES : FREE_FEATURES).map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm">
              <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-[var(--color-accent-text)]" />
              <span className="text-[var(--color-text-2)]">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Upgrade section */}
      {!isPro ? (
        <div className="rounded-xl border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)] p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-base font-semibold text-[var(--color-text-1)]">Upgrade to Pro</h2>
                <span className="text-[10px] font-medium text-[var(--color-warning-text)] bg-[var(--color-warning-dim)] border border-[var(--color-warning-border)] rounded-full px-2 py-0.5">
                  Dev mode — dummy
                </span>
              </div>
              <p className="text-sm text-[var(--color-text-3)] mb-1">
                One-time · $149 · Lifetime access
              </p>
              <p className="text-xs text-[var(--color-text-4)]">
                Real Lemon Squeezy checkout coming soon. This button flips your plan instantly for testing.
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-2xl font-bold text-[var(--color-text-1)]">$149</p>
              <p className="text-xs text-[var(--color-text-4)]">one-time</p>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <form action={upgradeToPro}>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-[var(--color-accent)] text-[var(--color-bg)] px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <Sparkle size={14} weight="fill" />
                Upgrade to Pro (dev)
              </button>
            </form>
          </div>

          <div className="mt-4 flex items-start gap-2 rounded-lg border border-[var(--color-warning-border)] bg-[var(--color-warning-dim)] px-3 py-2.5">
            <Warning size={13} className="text-[var(--color-warning-text)] shrink-0 mt-0.5" />
            <p className="text-xs text-[var(--color-warning-text)]">
              This is a dummy upgrade — no payment is processed. Real Lemon Squeezy checkout integration is coming soon.
            </p>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6">
          <h2 className="text-sm font-semibold text-[var(--color-text-1)] mb-2">You're on Pro</h2>
          <p className="text-sm text-[var(--color-text-3)] mb-4">
            Lifetime access — no renewal needed.
          </p>
          {user?.lsCustomerId?.startsWith("dummy_") && (
            <form action={downgradeToFree}>
              <button
                type="submit"
                className="text-xs text-[var(--color-text-4)] hover:text-[var(--color-error-text)] transition-colors"
              >
                Reset to Free (dev only)
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
