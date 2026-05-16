"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr"

interface DocPage {
  label: string
  href: string
}

const DOC_PAGES: DocPage[] = [
  { label: "Introduction", href: "/docs" },
  { label: "Installation", href: "/docs/getting-started/installation" },
  { label: "components.json", href: "/docs/getting-started/components-json" },
  { label: "MCP Server", href: "/docs/getting-started/mcp" },
  { label: "Theme Generator", href: "/docs/getting-started/theming" },
]

export function PrevNext() {
  const pathname = usePathname()
  const currentIndex = DOC_PAGES.findIndex((p) => p.href === pathname)

  if (currentIndex === -1) return null

  const prev = currentIndex > 0 ? DOC_PAGES[currentIndex - 1] : null
  const next = currentIndex < DOC_PAGES.length - 1 ? DOC_PAGES[currentIndex + 1] : null

  if (!prev && !next) return null

  return (
    <div className="mt-12 flex items-stretch gap-3 border-t border-border pt-8">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-1 items-center gap-3 rounded-xl border border-border bg-surface-1 px-4 py-3.5 hover:border-border-hover hover:bg-surface-2 transition-all duration-150"
        >
          <ArrowLeft
            size={15}
            className="shrink-0 text-text-3 group-hover:text-text-2 transition-colors"
          />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-2 mb-0.5">
              Previous
            </p>
            <p className="text-sm font-medium text-text-1 truncate">{prev.label}</p>
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex flex-1 items-center justify-end gap-3 rounded-xl border border-border bg-surface-1 px-4 py-3.5 hover:border-border-hover hover:bg-surface-2 transition-all duration-150 text-right"
        >
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-2 mb-0.5">
              Next
            </p>
            <p className="text-sm font-medium text-text-1 truncate">{next.label}</p>
          </div>
          <ArrowRight
            size={15}
            className="shrink-0 text-text-3 group-hover:text-text-2 transition-colors"
          />
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  )
}
