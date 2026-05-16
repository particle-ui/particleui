"use client"

import { useState } from "react"
import { Copy, Check } from "@phosphor-icons/react"

export function CopyButton({ code, className }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={copy}
      className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium text-text-2 hover:text-text-1 hover:bg-white/[0.06] transition-all ${className ?? ""}`}
    >
      {copied ? (
        <Check size={11} className="text-accent" />
      ) : (
        <Copy size={11} />
      )}
      {copied ? "Copied!" : "Copy"}
    </button>
  )
}
