"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkle, SquaresFour, Key, Download, CreditCard, User } from "@phosphor-icons/react"
import { UserButton } from "@clerk/nextjs"
import { ThemeToggle } from "@/components/theme-toggle"

const NAV = [
  { label: "Overview",  href: "/dashboard",          icon: SquaresFour },
  { label: "Tokens",    href: "/dashboard/tokens",    icon: Key         },
  { label: "Installs",  href: "/dashboard/installs",  icon: Download    },
  { label: "Plan",      href: "/dashboard/plan",      icon: CreditCard  },
  { label: "Profile",   href: "/dashboard/profile",   icon: User        },
]

export function DashSidebar() {
  const path = usePathname()

  return (
    <aside className="fixed top-0 left-0 h-svh w-56 flex flex-col border-r border-[var(--color-border)] bg-[var(--color-surface-1)] z-40">
      {/* Logo */}
      <div className="flex h-14 shrink-0 items-center border-b border-[var(--color-border)] px-5">
        <Link href="/" className="flex items-center gap-2 font-bold text-sm tracking-tight text-[var(--color-text-1)]">
          <Sparkle weight="fill" size={14} className="text-[var(--color-accent)]" />
          ParticleUI
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
        {NAV.map(({ label, href, icon: Icon }) => {
          const active = href === "/dashboard" ? path === href : path.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={[
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-100",
                active
                  ? "bg-[var(--color-surface-2)] text-[var(--color-text-1)] font-medium"
                  : "text-[var(--color-text-3)] hover:text-[var(--color-text-1)] hover:bg-[var(--color-surface-2)]",
              ].join(" ")}
            >
              <Icon size={16} weight={active ? "fill" : "regular"} className={active ? "text-[var(--color-accent)]" : ""} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom bar */}
      <div className="shrink-0 border-t border-[var(--color-border)] px-4 py-3 flex items-center justify-between gap-2">
        <ThemeToggle />
        <UserButton />
      </div>
    </aside>
  )
}
