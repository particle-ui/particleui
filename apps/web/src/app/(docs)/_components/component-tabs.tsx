"use client"

import { useState } from "react"
import { Check, Copy, Sparkle, ArrowSquareOut } from "@phosphor-icons/react"

export function ComponentTabs({
  preview,
  code,
  highlightedCode,
  aiPrompt,
  componentName,
}: {
  preview: React.ReactNode
  code: string
  highlightedCode?: string
  aiPrompt?: string
  componentName?: string
}) {
  const [tab, setTab] = useState<"preview" | "code" | "ai">("preview")
  const [copied, setCopied] = useState(false)

  const activeCode = tab === "ai" ? (aiPrompt ?? "") : code
  const activeHighlighted = tab === "code" ? highlightedCode : undefined

  async function copy() {
    await navigator.clipboard.writeText(activeCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-border bg-surface-1 px-1 py-1">
        <div className="flex">
          {(["preview", "code"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setCopied(false) }}
              className={`rounded-md px-4 py-1.5 text-xs font-medium capitalize transition-all ${
                tab === t ? "bg-surface-2 text-text-1 shadow-sm" : "text-text-2 hover:text-text-1 hover:bg-surface-2/50"
              }`}
            >
              {t === "code" ? "Code" : "Preview"}
            </button>
          ))}
          {aiPrompt && (
            <button
              onClick={() => { setTab("ai"); setCopied(false) }}
              className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-xs font-medium transition-all ${
                tab === "ai" ? "bg-surface-2 text-text-1 shadow-sm" : "text-text-2 hover:text-text-1 hover:bg-surface-2/50"
              }`}
            >
              <Sparkle size={10} weight={tab === "ai" ? "fill" : "regular"} className={tab === "ai" ? "text-accent" : ""} />
              AI Prompt
            </button>
          )}
        </div>
        {tab !== "preview" && (
          <button
            onClick={copy}
            className="mr-2 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium text-text-2 hover:text-text-1 hover:bg-surface-2 transition-all"
          >
            {copied ? <Check size={11} className="text-accent" /> : <Copy size={11} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>

      {/* Preview pane */}
      {tab === "preview" && (
        <div className="flex min-h-[260px] items-center justify-center bg-surface-1 p-10">
          {preview}
        </div>
      )}

      {/* Code pane */}
      {tab === "code" && (
        activeHighlighted ? (
          <div
            className="max-h-[520px] overflow-auto [&_pre]:m-0 [&_pre]:rounded-none [&_pre]:!bg-surface-1 [&_pre]:p-5 [&_pre]:text-[0.8125rem] [&_pre]:leading-[1.75]"
            dangerouslySetInnerHTML={{ __html: activeHighlighted }}
          />
        ) : (
          <div className="max-h-[520px] overflow-auto bg-surface-1">
            <pre className="p-5 text-[0.8125rem] leading-[1.75] text-text-2 font-mono">
              <code>{code}</code>
            </pre>
          </div>
        )
      )}

      {/* AI Prompt pane */}
      {tab === "ai" && (
        <div className="bg-surface-1 p-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-medium text-text-2 uppercase tracking-widest">
              Copy this prompt into Claude, ChatGPT, or any AI assistant
            </p>
            {componentName && (
              <a
                href={`/generate?seed=${componentName}`}
                className="flex items-center gap-1 rounded-md px-2.5 py-1 text-[11px] font-medium text-accent hover:bg-accent-dim transition-colors"
              >
                Open in Generator
                <ArrowSquareOut size={10} />
              </a>
            )}
          </div>
          <pre className="whitespace-pre-wrap break-words text-[0.8125rem] leading-[1.75] text-text-2 font-mono">
            {aiPrompt}
          </pre>
        </div>
      )}
    </div>
  )
}
