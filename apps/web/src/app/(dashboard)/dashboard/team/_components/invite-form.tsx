"use client"

import { useState } from "react"
import { PaperPlaneTilt, Check, Warning } from "@phosphor-icons/react"

export function InviteForm({ teamId }: { teamId: string }) {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setState("loading")
    setErrorMsg("")

    try {
      const res = await fetch("/api/team/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId, email: email.trim() }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.")
        setState("error")
      } else {
        setState("success")
        setEmail("")
      }
    } catch {
      setErrorMsg("Network error — please try again.")
      setState("error")
    }
  }

  if (state === "success") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-[var(--color-success-border)] bg-[var(--color-success-dim)] px-4 py-3">
        <Check size={14} className="text-[var(--color-success-text)] shrink-0" />
        <p className="text-sm text-[var(--color-success-text)]">Invite sent! They'll receive an email shortly.</p>
        <button
          onClick={() => setState("idle")}
          className="ml-auto text-xs text-[var(--color-text-4)] hover:text-[var(--color-text-2)] transition-colors"
        >
          Send another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="colleague@company.com"
        required
        disabled={state === "loading"}
        className="flex-1 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2 text-sm text-[var(--color-text-1)] placeholder:text-[var(--color-text-4)] outline-none focus:border-[var(--color-accent)] transition-colors disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={state === "loading" || !email.trim()}
        className="flex items-center gap-2 rounded-lg bg-[var(--color-accent)] text-[var(--color-bg)] px-4 py-2 text-sm font-semibold hover:brightness-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <PaperPlaneTilt size={13} weight="fill" />
        {state === "loading" ? "Sending…" : "Send invite"}
      </button>

      {state === "error" && (
        <div className="absolute mt-10 flex items-center gap-1.5 text-xs text-[var(--color-error-text)]">
          <Warning size={12} />
          {errorMsg}
        </div>
      )}
    </form>
  )
}
