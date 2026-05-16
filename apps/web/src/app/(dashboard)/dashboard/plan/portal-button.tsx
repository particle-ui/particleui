"use client"

import { useState } from "react"
import { ArrowSquareOut, CircleNotch } from "@phosphor-icons/react"

export function PortalButton() {
  const [loading, setLoading] = useState(false)

  async function handleClick() {
    setLoading(true)
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed to open billing portal")
      window.location.href = data.url
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong")
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-3)] hover:text-[var(--color-text-1)] hover:border-[var(--color-border-hover)] transition-all disabled:opacity-60"
    >
      {loading ? <CircleNotch size={12} className="animate-spin" /> : <ArrowSquareOut size={12} />}
      Manage billing
    </button>
  )
}
