"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

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
      className={cn(
        "flex items-center justify-between rounded-md border-l-2 px-2 py-1.5 text-sm transition-all duration-150",
        isActive
          ? "border-accent bg-surface-2 text-accent font-medium"
          : "border-transparent text-text-2 hover:text-text-1 hover:bg-surface-2"
      )}
    >
      <span>{children}</span>
      {pro && (
        <span className="text-[10px] font-bold uppercase tracking-wider text-accent opacity-70">
          Pro
        </span>
      )}
    </Link>
  )
}
