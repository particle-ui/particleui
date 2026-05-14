"use client"

import { useState } from "react"
import { Copy, Check } from "@phosphor-icons/react"

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 rounded-lg border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-xs text-[#444] hover:text-white hover:border-white/20 transition-all"
    >
      {copied ? (
        <>
          <Check size={12} className="text-[#00d4ff]" />
          Copied
        </>
      ) : (
        <>
          <Copy size={12} />
          Copy
        </>
      )}
    </button>
  )
}
