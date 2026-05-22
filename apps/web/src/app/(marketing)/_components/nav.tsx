import Link from "next/link"
import { Sparkle } from "@phosphor-icons/react/dist/ssr"
import { ThemeToggle } from "@/components/theme-toggle"
import { MobileMenu } from "./mobile-menu"

const NAV_LINKS = [
  { label: "Components", href: "/components" },
  { label: "Blocks", href: "/blocks" },
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: "https://github.com/particleui/particleui" },
]

export function Nav() {
  return (
    <header aria-label="Site header" className="fixed top-0 z-50 w-full">
      {/* Subtle top border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          aria-label="ParticleUI home"
          className="flex items-center gap-2 text-sm text-text-1 transition-opacity hover:opacity-70"
          style={{ fontWeight: 300, letterSpacing: "-0.01em" }}
        >
          <Sparkle weight="fill" size={13} className="text-accent" aria-hidden="true" />
          ParticleUI
        </Link>

        {/* Center pill nav */}
        <nav
          aria-label="Main navigation"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-0 rounded-full border border-border bg-surface-1/80 px-1.5 py-1.5 backdrop-blur-xl"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-4 py-1.5 text-xs text-text-3 hover:text-text-1 hover:bg-white/[0.05] transition-all duration-150"
              style={{ fontWeight: 300 }}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right — no auth, just theme + CTA */}
        <div className="flex items-center gap-2">
          <MobileMenu />
          <ThemeToggle />
          <Link
            href="/components"
            className="hidden md:flex items-center rounded-full border border-border bg-surface-1 px-4 py-1.5 text-xs text-text-2 hover:text-text-1 hover:border-border-hover transition-all"
            style={{ fontWeight: 300 }}
          >
            Browse free
          </Link>
        </div>
      </div>
    </header>
  )
}
