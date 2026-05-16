export const dynamic = "force-dynamic"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { Check, Sparkle, ArrowSquareOut } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import { CheckoutButton } from "./checkout-button"
import { PortalButton } from "./portal-button"

export const metadata: Metadata = { title: "Plan" }

const FREE_FEATURES = [
  "All free components (60+)",
  "React, Vue & Svelte registries",
  "Community support",
  "MIT licensed",
]

const PRO_FEATURES = [
  "Everything in Free",
  "All Pro components",
  "Animated Beam, Globe, Aurora, Orbit, Cursor Trail",
  "Full page blocks & templates",
  "Bundled Claude skills",
  "ParticleUI MCP server",
  "Priority support",
  "Lifetime updates",
]

const TEAM_FEATURES = [
  "Everything in Pro",
  "5 shared API tokens",
  "Team billing — one invoice",
  "Up to 5 developer seats",
]

export default async function PlanPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  let user: { plan: string; stripeCustomerId: string | null } | undefined
  try {
    const [row] = await db.select().from(users).where(eq(users.id, userId)).limit(1)
    user = row
  } catch (e) {
    console.error("[plan] DB error:", e)
  }
  const plan = user?.plan ?? "free"
  const isPro = plan === "pro" || plan === "team"
  const isTeam = plan === "team"
  const hasStripeCustomer = !!user?.stripeCustomerId

  const features = isTeam ? TEAM_FEATURES : isPro ? PRO_FEATURES : FREE_FEATURES
  const planLabel = isTeam ? "Team" : isPro ? "Pro" : "Free"

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-1)] mb-1">Plan</h1>
        <p className="text-sm text-[var(--color-text-3)]">Your current plan and upgrade options.</p>
      </div>

      {/* Current plan card */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6 mb-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-4)] mb-1.5">
              Current Plan
            </p>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${
              isPro
                ? "bg-[var(--color-accent-dim)] border border-[var(--color-accent-border)] text-[var(--color-accent-text)]"
                : "bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-2)]"
            }`}>
              {isPro && <Sparkle size={12} weight="fill" />}
              {planLabel}
            </span>
          </div>
          {isPro && hasStripeCustomer && <PortalButton />}
        </div>

        <ul className="space-y-2.5">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm">
              <Check size={14} weight="bold" className={`mt-0.5 shrink-0 ${isPro ? "text-[var(--color-accent-text)]" : "text-[var(--color-text-4)]"}`} />
              <span className="text-[var(--color-text-2)]">{f}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Upgrade section — shown only when not Pro/Team */}
      {!isPro && (
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Pro */}
          <div className="rounded-xl border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)] p-6 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-4)] mb-1">Pro</p>
                <p className="text-2xl font-bold text-[var(--color-text-1)]">$149</p>
                <p className="text-xs text-[var(--color-text-4)]">one-time</p>
              </div>
              <Sparkle size={20} weight="fill" className="text-[var(--color-accent)] mt-0.5" />
            </div>
            <p className="text-sm text-[var(--color-text-3)] mb-4 flex-1">
              All components, now and in the future. One purchase, lifetime access.
            </p>
            <CheckoutButton plan="pro" />
          </div>

          {/* Team */}
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-4)] mb-1">Team</p>
                <p className="text-2xl font-bold text-[var(--color-text-1)]">$299</p>
                <p className="text-xs text-[var(--color-text-4)]">one-time · 5 seats</p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-3)] mb-4 flex-1">
              5 developers, shared tokens, one invoice. $60 per seat.
            </p>
            <CheckoutButton plan="team" />
          </div>
        </div>
      )}

      {/* Already Pro — show manage billing */}
      {isPro && (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6">
          <h2 className="text-sm font-semibold text-[var(--color-text-1)] mb-1">Lifetime access</h2>
          <p className="text-sm text-[var(--color-text-3)] mb-4">
            No renewal needed. All future Pro components are included.
            {" "}
            {hasStripeCustomer
              ? "Use the \"Manage billing\" button above to download receipts or invoices."
              : "Need a receipt? Contact support."}
          </p>
          <p className="text-xs text-[var(--color-text-4)]">
            Questions or refund requests within 14 days?{" "}
            <a href="mailto:support@particleui.dev" className="text-[var(--color-accent)] hover:underline">
              Email support
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
