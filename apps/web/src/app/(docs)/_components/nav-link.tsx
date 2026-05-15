"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function NavLink({
  href,
  children,
  pro,
}: {
  href: string
  children: React.ReactNode
  pro?: boolean
}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`flex items-center justify-between rounded-md px-2 py-1.5 text-sm transition-all duration-150 ${
        isActive
          ? "bg-surface-2 text-text-1 font-medium"
          : "text-text-4 hover:text-text-1 hover:bg-white/[0.04]"
      }`}
    >
      <span>{children}</span>
      {pro && (
        <span className="text-[9px] font-bold uppercase tracking-wider text-accent opacity-60">
          Pro
        </span>
      )}
    </Link>
  )
}
