"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { List, X, Sparkle } from "@phosphor-icons/react"

export function MobileDrawer({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  // Close on route change — listen to popstate
  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener("popstate", close)
    return () => window.removeEventListener("popstate", close)
  }, [])

  return (
    <>
      {/* Mobile top bar — lg:hidden */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-bg flex items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-tight text-text-1">
          <Sparkle weight="fill" size={15} className="text-accent" />
          ParticleUI
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center rounded-lg p-2 text-text-3 hover:text-text-1 hover:bg-white/[0.05] transition-all"
          aria-label="Open navigation"
        >
          <List size={20} />
        </button>
      </header>

      {/* Backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer panel */}
      <div
        className={`lg:hidden fixed top-0 left-0 h-svh w-72 bg-bg border-r border-border z-50 flex flex-col transition-transform duration-250 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-border px-5">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 text-sm font-bold tracking-tight text-text-1"
          >
            <Sparkle weight="fill" size={15} className="text-accent" />
            ParticleUI
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="flex items-center justify-center rounded-lg p-2 text-text-3 hover:text-text-1 hover:bg-white/[0.05] transition-all"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable nav content (server-rendered children) */}
        <div className="flex-1 overflow-y-auto" onClick={() => setOpen(false)}>
          {children}
        </div>
      </div>
    </>
  )
}
