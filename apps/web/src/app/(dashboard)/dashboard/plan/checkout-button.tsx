"use client"

import { useState } from "react"
import { Sparkle, CircleNotch } from "@phosphor-icons/react"
import type { PlanKey } from "@/lib/stripe"

interface CheckoutButtonProps {
  plan: PlanKey
}

export function CheckoutButton({ plan }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? "Failed to create checkout session")
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
      setLoading(false)
    }
  }

  const isPro = plan === "pro"

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className={`flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed ${
          isPro
            ? "bg-[var(--color-accent)] text-[var(--color-bg)] hover:opacity-90"
            : "border border-[var(--color-border)] text-[var(--color-text-2)] hover:text-[var(--color-text-1)] hover:border-[var(--color-border-hover)]"
        }`}
      >
        {loading ? (
          <CircleNotch size={14} className="animate-spin" />
        ) : (
          isPro && <Sparkle size={14} weight="fill" />
        )}
        {loading ? "Redirecting…" : isPro ? "Get Pro — $149" : "Get Team — $299"}
      </button>
      {error && (
        <p className="mt-2 text-xs text-[var(--color-error-text)]">{error}</p>
      )}
    </div>
  )
}
