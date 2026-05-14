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
    <div className="rounded-xl border border-white/[0.07] overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#0a0a0a] px-1 py-1">
        <div className="flex">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md px-4 py-1.5 text-xs font-medium capitalize transition-all ${
                tab === t
                  ? "bg-white/[0.07] text-white"
                  : "text-[#444] hover:text-[#888]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {tab === "code" && (
          <button
            onClick={copy}
            className="mr-2 flex items-center gap-1.5 rounded-md border border-white/[0.07] px-2.5 py-1.5 text-xs text-[#444] hover:text-white transition-colors"
          >
            {copied ? <Check size={11} className="text-[#00d4ff]" /> : <Copy size={11} />}
            {copied ? "Copied" : "Copy"}
          </button>
        )}
      </div>

      {/* Preview pane */}
      {tab === "preview" && (
        <div className="flex min-h-[220px] items-center justify-center bg-[#0a0a0a] p-10">
          {preview}
        </div>
      )}

      {/* Code pane */}
      {tab === "code" && (
        <div className="bg-[#080808]">
          <pre className="overflow-x-auto p-5 text-xs leading-6 text-[#888] max-h-[480px]">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
