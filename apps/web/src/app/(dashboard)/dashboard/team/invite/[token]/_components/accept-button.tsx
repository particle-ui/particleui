"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "@phosphor-icons/react"

export function AcceptButton({ inviteToken }: { inviteToken: string }) {
  const router = useRouter()
  const [state, setState] = useState<"idle" | "loading" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function accept() {
    setState("loading")
    try {
      const res = await fetch(`/api/team/invite/${inviteToken}/accept`, { method: "POST" })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? "Something went wrong.")
        setState("error")
      } else {
        router.push("/dashboard/team?joined=1")
      }
    } catch {
      setErrorMsg("Network error — please try again.")
      setState("error")
    }
  }

  return (
    <div className="space-y-3">
      <button
        onClick={accept}
        disabled={state === "loading"}
        className="w-full flex items-center justify-center gap-2 rounded-full bg-[var(--color-accent)] text-[var(--color-bg)] px-6 py-3 text-sm font-semibold hover:brightness-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Check size={14} weight="bold" />
        {state === "loading" ? "Joining…" : "Accept invite"}
      </button>
      {state === "error" && (
        <p className="text-xs text-[var(--color-error-text)]">{errorMsg}</p>
      )}
    </div>
  )
}
