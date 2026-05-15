export const dynamic = "force-dynamic"

import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { listTokens, createToken, revokeToken } from "@/lib/auth/token"
import { CreateTokenButton } from "./token-create-modal"
import { Key, Trash, Clock } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import { revalidatePath } from "next/cache"

export const metadata: Metadata = { title: "Tokens" }

export default async function TokensPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const tokens = await listTokens(userId)

  async function create(): Promise<string> {
    "use server"
    const { auth: getAuth } = await import("@clerk/nextjs/server")
    const { userId } = await getAuth()
    if (!userId) throw new Error("Unauthenticated")
    const plaintext = await createToken(userId, "Default")
    revalidatePath("/dashboard/tokens")
    return plaintext
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--color-text-1)] mb-1">API Tokens</h1>
          <p className="text-sm text-[var(--color-text-3)]">
            Use tokens to install Pro components via the shadcn CLI.
          </p>
        </div>
        <CreateTokenButton onCreate={create} />
      </div>

      {/* Token list */}
      {tokens.length === 0 ? (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] flex flex-col items-center justify-center py-16 text-center">
          <Key size={32} className="text-[var(--color-text-4)] mb-3" />
          <p className="text-sm font-medium text-[var(--color-text-2)] mb-1">No tokens yet</p>
          <p className="text-xs text-[var(--color-text-4)]">Create your first token to start installing Pro components.</p>
        </div>
      ) : (
        <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-5 py-2.5 border-b border-[var(--color-border)] text-[10px] font-semibold uppercase tracking-widest text-[var(--color-text-4)]">
            <span>Token</span>
            <span>Last used</span>
            <span>Created</span>
            <span></span>
          </div>
          <ul className="divide-y divide-[var(--color-border)]">
            {tokens.map((t) => (
              <li key={t.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-5 py-3">
                <div className="flex items-center gap-3 min-w-0">
                  <Key size={14} className="text-[var(--color-text-4)] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[var(--color-text-2)] mb-0.5">{t.label}</p>
                    <code className="text-[11px] font-mono text-[var(--color-text-4)]">
                      {t.tokenPrefix ?? "pui_"}…
                    </code>
                  </div>
                </div>
                <span className="text-[11px] text-[var(--color-text-4)] flex items-center gap-1">
                  <Clock size={11} />
                  {t.lastUsedAt ? new Date(t.lastUsedAt).toLocaleDateString() : "Never"}
                </span>
                <span className="text-[11px] text-[var(--color-text-4)]">
                  {new Date(t.createdAt).toLocaleDateString()}
                </span>
                <form action={async () => { "use server"; await revokeToken(t.id); revalidatePath("/dashboard/tokens") }}>
                  <button
                    type="submit"
                    className="p-1.5 rounded text-[var(--color-text-4)] hover:text-[var(--color-error-text)] hover:bg-[var(--color-error-dim)] transition-colors"
                    title="Revoke token"
                  >
                    <Trash size={14} />
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Usage snippet */}
      <div className="mt-6 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-5">
        <h2 className="text-sm font-semibold text-[var(--color-text-1)] mb-3">Using your token</h2>
        <pre className="rounded-lg bg-[var(--color-bg)] border border-[var(--color-border)] p-4 text-[11px] font-mono text-[var(--color-text-3)] overflow-x-auto leading-relaxed">{`# .env.local
PARTICLEUI_TOKEN=pui_...

# components.json
"registries": {
  "@particleui": {
    "url": "https://particleui.dev/r/react/{name}.json",
    "headers": { "Authorization": "Bearer \${PARTICLEUI_TOKEN}" }
  }
}

# Install a component
npx shadcn@latest add @particleui/particle-hero`}</pre>
      </div>
    </div>
  )
}
