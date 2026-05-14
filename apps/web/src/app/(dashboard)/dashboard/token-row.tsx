"use client"

import { useState } from "react"
import { Eye, EyeSlash, Copy, Check, Trash } from "@phosphor-icons/react"

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

  const masked = `pui_${"•".repeat(20)}${token.token.slice(-4)}`

  async function copy() {
    await navigator.clipboard.writeText(token.token)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-[#090909] px-4 py-3">
      <code className="flex-1 min-w-0 font-mono text-xs text-[#888] truncate">
        {revealed ? token.token : masked}
      </code>

      {token.lastUsedAt && (
        <span className="hidden sm:block text-[10px] text-[#333] shrink-0">
          used {token.lastUsedAt.toLocaleDateString()}
        </span>
      )}

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => setRevealed((v) => !v)}
          className="rounded p-1.5 text-[#444] hover:text-[#888] hover:bg-white/[0.04] transition-colors"
          title={revealed ? "Hide" : "Reveal"}
        >
          {revealed ? <EyeSlash size={14} /> : <Eye size={14} />}
        </button>
        <button
          onClick={copy}
          className="rounded p-1.5 text-[#444] hover:text-[#888] hover:bg-white/[0.04] transition-colors"
          title="Copy"
        >
          {copied ? <Check size={14} className="text-[#00d4ff]" /> : <Copy size={14} />}
        </button>
        <RevokeButton tokenId={token.id} />
      </div>
    </div>
  )
}

function RevokeButton({ tokenId }: { tokenId: string }) {
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
        className="rounded p-1.5 text-[#333] hover:text-red-500 hover:bg-red-500/[0.08] transition-colors"
        title="Revoke token"
      >
        <Trash size={14} />
      </button>
    </form>
  )
}
