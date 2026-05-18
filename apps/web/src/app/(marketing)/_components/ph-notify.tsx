"use client"

import { useState, useRef } from "react"
import { ArrowRight, Check, WarningCircle } from "@phosphor-icons/react/dist/ssr"

type State = "idle" | "loading" | "success" | "error"

export function PhNotify() {
  const [state, setState] = useState<State>("idle")
  const inputRef = useRef<HTMLInputElement>(null)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const email = inputRef.current?.value.trim()
    if (!email) return

    setState("loading")
    try {
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      setState(res.ok ? "success" : "error")
    } catch {
      setState("error")
    }
  }

  if (state === "success") {
    return (
      <div className="flex items-center justify-center gap-2.5 rounded-full border border-accent/30 bg-accent/[0.06] px-5 py-3 text-sm text-accent">
        <Check size={14} weight="bold" />
        You&apos;re on the list — we&apos;ll ping you on launch day.
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-sm mx-auto">
      <div className="relative flex-1 w-full">
        <input
          ref={inputRef}
          type="email"
          required
          placeholder="you@company.com"
          disabled={state === "loading"}
          className="w-full rounded-full border border-border bg-white/[0.04] px-5 py-2.5 text-sm text-text-1 placeholder:text-text-4 outline-none focus:border-border-hover focus:ring-1 focus:ring-accent/20 transition-all disabled:opacity-50"
        />
      </div>
      <button
        type="submit"
        disabled={state === "loading"}
        className="flex shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-bg transition-all hover:brightness-95 disabled:opacity-60 whitespace-nowrap"
      >
        {state === "loading" ? (
          <span className="h-3.5 w-3.5 rounded-full border-2 border-bg/40 border-t-bg animate-spin" />
        ) : (
          <ArrowRight size={13} weight="bold" />
        )}
        Notify me
      </button>
      {state === "error" && (
        <p className="absolute -bottom-6 left-0 flex items-center gap-1 text-xs text-red-400">
          <WarningCircle size={12} />
          Something went wrong — try again.
        </p>
      )}
    </form>
  )
}
