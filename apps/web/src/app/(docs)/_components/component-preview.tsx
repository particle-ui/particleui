"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon, SparkleIcon, ArrowSquareOutIcon } from "@phosphor-icons/react"
import Link from "next/link"

export function ComponentPreview({
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
  const [expanded, setExpanded] = useState(false)
  const [showAi, setShowAi] = useState(false)
  const [copied, setCopied] = useState(false)

  const activeCode = showAi ? (aiPrompt ?? "") : code

  async function copy() {
    await navigator.clipboard.writeText(activeCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  function toggleAi() {
    setShowAi((v) => !v)
    setExpanded(false)
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      {/* Preview pane — always visible */}
      <div className="relative flex min-h-[400px] items-center justify-center bg-surface-1 p-10">
        {preview}
        {aiPrompt && (
          <button
            onClick={toggleAi}
            title={showAi ? "View code" : "View AI prompt"}
            className={[
              "absolute right-3 top-3 flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-all",
              showAi
                ? "border border-accent-border bg-accent-dim text-accent"
                : "text-text-3 hover:text-text-2 hover:bg-surface-2",
            ].join(" ")}
          >
            <SparkleIcon size={11} weight={showAi ? "fill" : "regular"} />
            AI Prompt
          </button>
        )}
      </div>

      {/* Code / AI peek — fused directly below the preview */}
      <div className="border-t border-border">
        {/* Label + copy bar */}
        <div className="flex items-center justify-between border-b border-border bg-surface-2 px-4 py-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-text-3">
            {showAi ? "AI Prompt" : "Code"}
          </span>
          <div className="flex items-center gap-3">
            {showAi && componentName && (
              <Link
                href={`/generate?seed=${componentName}`}
                className="flex items-center gap-1 text-[10px] text-accent hover:underline"
              >
                Open in Generator <ArrowSquareOutIcon size={9} />
              </Link>
            )}
            <button
              onClick={copy}
              className="flex items-center gap-1.5 text-[10px] text-text-3 hover:text-text-1 transition-colors"
            >
              {copied ? <CheckIcon size={11} className="text-accent" /> : <CopyIcon size={11} />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Code content with fade + View Code overlay */}
        <div className="relative bg-surface-1">
          {/* The code — capped when collapsed */}
          <div
            className={[
              "[&_pre]:m-0 [&_pre]:rounded-none [&_pre]:!bg-surface-1 [&_pre]:px-5 [&_pre]:py-5 [&_pre]:text-[0.8125rem] [&_pre]:leading-[1.75]",
              expanded ? "max-h-[520px] overflow-auto" : "max-h-[130px] overflow-hidden",
            ].join(" ")}
          >
            {!showAi && highlightedCode ? (
              <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            ) : (
              <pre className="p-5 text-[0.8125rem] leading-[1.75] text-text-2 font-mono whitespace-pre-wrap break-words">
                <code>{activeCode}</code>
              </pre>
            )}
          </div>

          {/* Gradient fade + "View Code" button when collapsed */}
          {!expanded && (
            <div className="absolute inset-x-0 bottom-0 flex h-20 items-end justify-center bg-gradient-to-t from-surface-1 to-transparent pb-3">
              <button
                onClick={() => setExpanded(true)}
                className="flex items-center gap-1.5 rounded-md border border-border bg-surface-1 px-4 py-1.5 text-[11px] font-medium text-text-2 shadow-sm hover:bg-surface-2 hover:border-border-hover hover:text-text-1 transition-all"
              >
                View Code
              </button>
            </div>
          )}

          {/* Collapse button when expanded */}
          {expanded && (
            <div className="flex justify-center border-t border-border bg-surface-1 py-2.5">
              <button
                onClick={() => setExpanded(false)}
                className="text-[11px] font-medium text-text-3 hover:text-text-1 transition-colors"
              >
                Collapse
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
