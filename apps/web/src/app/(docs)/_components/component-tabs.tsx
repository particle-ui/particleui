"use client"

import { useState } from "react"
import { Check, Copy } from "@phosphor-icons/react"

export function ComponentTabs({
  preview,
  code,
}: {
  preview: React.ReactNode
  code: string
}) {
  const [tab, setTab] = useState<"preview" | "code">("preview")
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-border bg-surface-1 px-1 py-1">
        <div className="flex">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md px-4 py-1.5 text-xs font-medium capitalize transition-all ${
                tab === t
                  ? "bg-white/[0.07] text-text-1"
                  : "text-text-4 hover:text-text-2"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === "code" && (
          <button
            onClick={copy}
            className="mr-2 flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs text-text-4 hover:text-text-1 transition-colors"
          >
            {copied ? <Check size={11} className="text-accent" /> : <Copy size={11} />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>

      {/* Preview pane */}
      {tab === "preview" && (
        <div className="flex min-h-[240px] items-center justify-center bg-surface-1 p-10">
          {preview}
        </div>
      )}

      {/* Code pane */}
      {tab === "code" && (
        <div className="bg-bg">
          <pre className="overflow-x-auto p-5 text-xs leading-6 text-text-2 max-h-[480px]">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
