"use client"

import { useState } from "react"
import Link from "next/link"
import { CheckIcon, CopyIcon, CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react"

export function DocHeaderActions({
  markdown,
  prevHref,
  prevLabel,
  nextHref,
  nextLabel,
}: {
  markdown: string
  prevHref?: string
  prevLabel?: string
  nextHref?: string
  nextLabel?: string
}) {
  const [copied, setCopied] = useState(false)

  async function copyPage() {
    await navigator.clipboard.writeText(markdown)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="flex items-center gap-1.5 shrink-0">
      <button
        onClick={copyPage}
        className="flex items-center gap-1.5 rounded-md border border-border bg-surface-1 px-3 py-1.5 text-[12px] font-medium text-text-2 hover:bg-surface-2 hover:border-border-hover hover:text-text-1 transition-all"
        title="Copy page as markdown"
      >
        {copied ? (
          <CheckIcon size={12} className="text-accent" />
        ) : (
          <CopyIcon size={12} />
        )}
        {copied ? "Copied!" : "Copy"}
      </button>

      <div className="flex items-center gap-0.5">
        {prevHref ? (
          <Link
            href={prevHref}
            title={prevLabel ? `Previous: ${prevLabel}` : "Previous"}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface-1 text-text-3 hover:bg-surface-2 hover:border-border-hover hover:text-text-1 transition-all"
          >
            <CaretLeftIcon size={13} />
          </Link>
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface-1 text-text-4 opacity-40 cursor-not-allowed">
            <CaretLeftIcon size={13} />
          </div>
        )}
        {nextHref ? (
          <Link
            href={nextHref}
            title={nextLabel ? `Next: ${nextLabel}` : "Next"}
            className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface-1 text-text-3 hover:bg-surface-2 hover:border-border-hover hover:text-text-1 transition-all"
          >
            <CaretRightIcon size={13} />
          </Link>
        ) : (
          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface-1 text-text-4 opacity-40 cursor-not-allowed">
            <CaretRightIcon size={13} />
          </div>
        )}
      </div>
    </div>
  )
}
