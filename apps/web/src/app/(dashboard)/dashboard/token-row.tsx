"use client"

import { useState } from "react"
import { revalidatePath } from "next/cache"

interface Token {
  id: string
  token: string
  label: string
  lastUsedAt: Date | null
  createdAt: Date
}

export function TokenRow({ token }: { token: Token }) {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)

  const masked = `pui_${"•".repeat(24)}${token.token.slice(-4)}`

  async function copy() {
    await navigator.clipboard.writeText(token.token)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-particle-800 bg-particle-950/50 px-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-xs text-particle-500 mb-0.5">{token.label}</p>
        <code className="font-mono text-sm text-particle-300 break-all">
          {revealed ? token.token : masked}
        </code>
        {token.lastUsedAt && (
          <p className="text-xs text-particle-600 mt-1">
            Last used {token.lastUsedAt.toLocaleDateString()}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => setRevealed((v) => !v)}
          className="text-xs text-particle-500 hover:text-particle-300 transition-colors"
        >
          {revealed ? "Hide" : "Reveal"}
        </button>
        <button
          onClick={copy}
          className="rounded bg-particle-800 px-2.5 py-1 text-xs text-particle-300 hover:bg-particle-700 hover:text-white transition-colors"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <RevokeForm tokenId={token.id} />
      </div>
    </div>
  )
}

function RevokeForm({ tokenId }: { tokenId: string }) {
  return (
    <form
      action={async () => {
        "use server"
        const { db } = await import("@/db")
        const { apiTokens } = await import("@/db/schema")
        const { eq } = await import("drizzle-orm")
        await db
          .update(apiTokens)
          .set({ revokedAt: new Date() })
          .where(eq(apiTokens.id, tokenId))
        const { revalidatePath } = await import("next/cache")
        revalidatePath("/dashboard")
      }}
    >
      <button
        type="submit"
        className="text-xs text-red-500/60 hover:text-red-400 transition-colors"
      >
        Revoke
      </button>
    </form>
  )
}
