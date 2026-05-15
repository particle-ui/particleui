import Link from "next/link"
import { Sparkle } from "@phosphor-icons/react/dist/ssr"
import { ThemeToggle } from "@/components/theme-toggle"
import { currentUser } from "@clerk/nextjs/server"
import { UserButton } from "@clerk/nextjs"
import { MobileMenu } from "./mobile-menu"

export async function Nav() {
  const user = await currentUser()

  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-sm tracking-tight">
          <Sparkle weight="fill" size={16} className="text-accent" />
          ParticleUI
        </Link>

        {/* Center pill nav */}
        <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-0.5 rounded-full border border-border bg-surface-1/90 px-2 py-2 backdrop-blur-xl">
          {["Components", "Docs", "Pricing"].map((l) => (
            <Link
              key={l}
              href={`/${l.toLowerCase()}`}
              className="rounded-full px-4 py-1.5 text-sm text-text-3 hover:text-text-1 hover:bg-white/[0.06] transition-all duration-150"
            >
              {l}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <MobileMenu />
          <ThemeToggle />
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-sm text-text-3 hover:text-text-1 transition-colors"
              >
                Dashboard
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-sm text-text-4 hover:text-text-1 transition-colors">
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-gray-200 transition-colors"
              >
                Get started free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
