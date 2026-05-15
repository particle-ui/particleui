"use client"
import { useState } from "react"
import Link from "next/link"
import { List, X } from "@phosphor-icons/react"

const LINKS = [
  { label: "Components", href: "/components" },
  { label: "Docs", href: "/docs" },
  { label: "Pricing", href: "/pricing" },
]

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-text-3 hover:text-text-1 hover:bg-surface-2 transition-all"
        aria-label="Toggle menu"
      >
        {open ? <X size={18} /> : <List size={18} />}
      </button>
      {open && (
        <div className="fixed inset-x-0 top-16 z-40 border-b border-border bg-bg/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm text-text-2 hover:text-text-1 border-b border-border last:border-0 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
