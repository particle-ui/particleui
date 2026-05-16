export const dynamic = "force-dynamic"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { componentInstalls, apiTokens } from "@/db/schema"
import { eq, desc } from "drizzle-orm"
import Link from "next/link"
import { Download } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Installs" }

const FW_COLORS: Record<string, string> = {
  react: "bg-[var(--color-info-dim)] text-[var(--color-info-text)] border-[var(--color-info-border)]",
  vue: "bg-[var(--color-success-dim)] text-[var(--color-success-text)] border-[var(--color-success-border)]",
  svelte: "bg-[var(--color-error-dim)] text-[var(--color-error-text)] border-[var(--color-error-border)]",
}

const TIER_COLORS: Record<string, string> = {
  pro: "bg-[var(--color-accent-dim)] text-[var(--color-accent-text)] border-[var(--color-accent-border)]",
  core: "bg-[var(--color-surface-2)] text-[var(--color-text-3)] border-[var(--color-border)]",
  particles: "bg-[var(--color-surface-2)] text-[var(--color-text-3)] border-[var(--color-border)]",
}

export default async function InstallsPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const rows = await db
    .select({
      id: componentInstalls.id,
      componentName: componentInstalls.componentName,
      framework: componentInstalls.framework,
      tier: componentInstalls.tier,
      createdAt: componentInstalls.createdAt,
      tokenLabel: apiTokens.label,
      tokenPrefix: apiTokens.tokenPrefix,
    })
    .from(componentInstalls)
    .leftJoin(apiTokens, eq(componentInstalls.tokenId, apiTokens.id))
    .where(eq(componentInstalls.userId, userId))
    .orderBy(desc(componentInstalls.createdAt))
    .limit(50)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-1)] mb-1">Installs</h1>
        <p className="text-sm text-[var(--color-text-3)]">
          Every component you've installed via the ParticleUI CLI.
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] flex flex-col items-center justify-center py-20 text-center">
          <Download size={32} className="text-[var(--color-text-4)] mb-3" />
          <p className="text-sm font-medium text-[var(--color-text-2)] mb-1">No installs yet</p>
          <p className="text-xs text-[var(--color-text-4)] max-w-xs">
            When you install a component with{" "}
            <code className="text-[var(--color-text-3)]">npx particleui-cli add ...</code>,
            it'll show up here.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-5 py-2.5 border-b border-[var(--color-border)] text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-4)]">
            <span>Component</span>
            <span>Framework</span>
            <span>Tier</span>
            <span>Token</span>
            <span>When</span>
          </div>
          <ul className="divide-y divide-[var(--color-border)]">
            {rows.map((row) => (
              <li key={row.id} className="grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center px-5 py-3">
                <Link
                  href={`/docs/components/${row.componentName}`}
                  className="font-mono text-xs text-[var(--color-text-1)] hover:underline truncate"
                >
                  {row.componentName}
                </Link>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${FW_COLORS[row.framework] ?? "bg-[var(--color-surface-2)] text-[var(--color-text-3)] border-[var(--color-border)]"}`}>
                  {row.framework}
                </span>
                <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${TIER_COLORS[row.tier] ?? "bg-[var(--color-surface-2)] text-[var(--color-text-3)] border-[var(--color-border)]"}`}>
                  {row.tier}
                </span>
                <code className="text-[10px] font-mono text-[var(--color-text-4)]">
                  {row.tokenPrefix ? `${row.tokenPrefix}…` : "—"}
                </code>
                <span className="text-[11px] text-[var(--color-text-4)] whitespace-nowrap">
                  {new Date(row.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
