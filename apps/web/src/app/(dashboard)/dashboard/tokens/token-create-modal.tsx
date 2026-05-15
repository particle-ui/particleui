"use client"

import { useState, useTransition } from "react"
import { Copy, Check, X, Plus, Warning } from "@phosphor-icons/react"

interface Props {
  onCreate: () => Promise<string>
}

export function CreateTokenButton({ onCreate }: Props) {
  const [pending, startTransition] = useTransition()
  const [newToken, setNewToken] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  function handleCreate() {
    startTransition(async () => {
      const token = await onCreate()
      setNewToken(token)
    })
  }

  async function copy() {
    if (!newToken) return
    await navigator.clipboard.writeText(newToken)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <button
        onClick={handleCreate}
        disabled={pending}
        className="flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-3 py-1.5 text-xs text-[var(--color-text-2)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text-1)] transition-colors disabled:opacity-40"
      >
        <Plus size={12} weight="bold" />
        {pending ? "Creating…" : "New token"}
      </button>

      {/* Modal */}
      {newToken && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg)]/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] p-6 shadow-[0_8px_40px_0px_var(--color-shadow-strong)]">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-base font-semibold text-[var(--color-text-1)] mb-0.5">Token created</h2>
                <p className="text-xs text-[var(--color-text-3)]">Copy it now — this is the only time you'll see it.</p>
              </div>
              <button
                onClick={() => setNewToken(null)}
                className="p-1 rounded text-[var(--color-text-4)] hover:text-[var(--color-text-2)] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Warning */}
            <div className="flex items-start gap-2 rounded-lg border border-[var(--color-warning-border)] bg-[var(--color-warning-dim)] px-3 py-2.5 mb-4">
              <Warning size={14} className="text-[var(--color-warning-text)] shrink-0 mt-0.5" />
              <p className="text-xs text-[var(--color-warning-text)]">
                This token will not be shown again. Store it somewhere safe like a password manager or your <code>.env.local</code> file.
              </p>
            </div>

            {/* Token display */}
            <div className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2.5 mb-4">
              <code className="flex-1 font-mono text-xs text-[var(--color-text-2)] break-all">{newToken}</code>
              <button
                onClick={copy}
                className="shrink-0 rounded p-1.5 text-[var(--color-text-3)] hover:text-[var(--color-text-1)] hover:bg-[var(--color-surface-2)] transition-colors"
              >
                {copied ? <Check size={14} className="text-[var(--color-success-text)]" /> : <Copy size={14} />}
              </button>
            </div>

            <div className="flex gap-2">
              <button
                onClick={copy}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] text-[var(--color-bg)] py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                {copied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy token</>}
              </button>
              <button
                onClick={() => setNewToken(null)}
                className="rounded-lg border border-[var(--color-border)] px-4 py-2.5 text-sm text-[var(--color-text-3)] hover:text-[var(--color-text-1)] hover:border-[var(--color-border-hover)] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
