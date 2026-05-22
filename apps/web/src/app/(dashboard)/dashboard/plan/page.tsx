export const dynamic = "force-dynamic"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { Check } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = { title: "Plan" }

const FEATURES = [
  "All 100+ components, MIT licensed",
  "React, Vue & Svelte registries",
  "36 particle & animation effects",
  "Full-page blocks & templates",
  "MCP server for AI editors",
  "OKLCH design tokens",
  "TypeScript-first, fully typed",
  "WCAG 2.1 AA accessible",
  "No token needed",
  "Use in commercial projects",
]

export default async function PlanPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-1)] mb-1">Plan</h1>
        <p className="text-sm text-[var(--color-text-3)]">Your current plan and what&apos;s included.</p>
      </div>

      {/* Plan card */}
      <div className="rounded-xl border border-[var(--color-accent-border)] bg-[var(--color-surface-1)] p-6 mb-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-4)] mb-1.5">
              Current Plan
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold bg-[var(--color-accent-dim)] border border-[var(--color-accent-border)] text-[var(--color-accent-text)]">
              Free forever
            </span>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[var(--color-text-1)]">$0</p>
            <p className="text-xs text-[var(--color-text-4)]">MIT licensed</p>
          </div>
        </div>

        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-6">
          {FEATURES.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm">
              <Check size={14} weight="bold" className="mt-0.5 shrink-0 text-[var(--color-accent-text)]" />
              <span className="text-[var(--color-text-2)]">{f}</span>
            </li>
          ))}
        </ul>

        <div className="border-t border-[var(--color-border)] pt-5">
          <p className="text-[11px] font-mono text-[var(--color-text-4)] mb-2.5">Install any component</p>
          <code className="block rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 font-mono text-sm text-[var(--color-accent)]">
            npx particleui-cli add button
          </code>
        </div>
      </div>

      {/* Open source note */}
      <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-5 flex items-start gap-3">
        <div>
          <p className="text-sm font-semibold text-[var(--color-text-1)] mb-1">ParticleUI is open source</p>
          <p className="text-sm text-[var(--color-text-3)]">
            All components are MIT licensed and free forever. Contribute, fork, or star us on{" "}
            <Link
              href="https://github.com/particleui/particleui"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--color-accent)] hover:underline font-medium"
            >
              GitHub
            </Link>.
          </p>
        </div>
      </div>
    </div>
  )
}
