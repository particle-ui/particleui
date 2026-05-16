"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "@phosphor-icons/react"

export function TeamSetupForm({ teamId, currentName }: { teamId: string; currentName: string }) {
  const router = useRouter()
  const [name, setName] = useState(currentName === "My Team" ? "" : currentName)
  const [state, setState] = useState<"idle" | "loading" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    setState("loading")

    try {
      const res = await fetch("/api/team/rename", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ teamId, name: trimmed }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.")
        setState("error")
      } else {
        router.push("/dashboard/team?setup=1")
      }
    } catch {
      setErrorMsg("Network error — please try again.")
      setState("error")
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label className="block text-xs font-semibold text-[var(--color-text-3)] mb-2 uppercase tracking-widest">
          Team name
        </label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Acme Corp"
          required
          maxLength={60}
          autoFocus
          disabled={state === "loading"}
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-sm text-[var(--color-text-1)] placeholder:text-[var(--color-text-4)] outline-none focus:border-[var(--color-accent)] transition-colors disabled:opacity-50"
        />
        {state === "error" && (
          <p className="mt-2 text-xs text-[var(--color-error-text)]">{errorMsg}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={state === "loading" || !name.trim()}
        className="w-full flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] px-6 py-3 text-sm font-semibold hover:brightness-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state === "loading" ? "Saving…" : "Continue to team dashboard"}
        {state !== "loading" && <ArrowRight size={13} weight="bold" />}
      </button>
    </form>
  )
}
