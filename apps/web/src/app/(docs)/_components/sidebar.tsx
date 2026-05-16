import Link from "next/link"
import { Sparkle } from "@phosphor-icons/react/dist/ssr"
import { promises as fs } from "fs"
import path from "path"
import { cn } from "@/lib/utils"
import { NavLink } from "./nav-link"
import { SearchDialog } from "./search-dialog"
import { ThemeToggle } from "@/components/theme-toggle"

async function getComponents() {
  try {
    const p = path.join(process.cwd(), "public/r/react/index.json")
    const data = JSON.parse(await fs.readFile(p, "utf-8"))
    return Array.isArray(data) ? data : (data.items ?? [])
  } catch {
    return []
  }
}

const GETTING_STARTED = [
  { label: "Introduction", href: "/docs" },
  { label: "Installation", href: "/docs/getting-started/installation" },
  { label: "components.json", href: "/docs/getting-started/components-json" },
  { label: "Theme Generator", href: "/docs/getting-started/theming" },
  { label: "Themes", href: "/docs/themes" },
  { label: "MCP Server", href: "/docs/getting-started/mcp" },
]

export async function Sidebar() {
  const components = await getComponents()
  const isFree = (c: { categories: string[]; tier?: string }) => !c.categories.includes("pro")
  const core = components.filter((c: { categories: string[]; tier?: string }) => c.tier !== "themes" && c.categories.includes("core") && isFree(c))
  const particles = components.filter((c: { categories: string[]; tier?: string }) => c.tier !== "themes" && c.categories.includes("particles") && isFree(c))
  const blocks = components.filter((c: { categories: string[]; tier?: string }) => c.tier !== "themes" && c.categories.includes("blocks") && isFree(c))
  const pro = components.filter((c: { categories: string[]; tier?: string }) => c.tier !== "themes" && c.categories.includes("pro"))
  const themes = components.filter((c: { tier?: string }) => c.tier === "themes")

  return (
    <aside aria-label="Docs navigation" className="fixed top-0 left-0 h-svh w-64 border-r border-border bg-bg flex flex-col overflow-y-auto hidden lg:flex z-40">
      {/* Logo */}
      <div className="flex h-14 shrink-0 items-center border-b border-border px-5">
        <Link href="/" className="flex items-center gap-2 font-bold text-sm tracking-tight">
          <Sparkle weight="fill" size={15} className="text-accent" />
          ParticleUI
        </Link>
      </div>

      {/* Search */}
      <div className="px-3 py-3 border-b border-border">
        <SearchDialog items={components} />
      </div>

      <nav aria-label="Docs sections" className={cn("flex-1 py-5 px-3 space-y-5 overflow-y-auto")}>
        {/* Getting started */}
        <div>
          <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-[0.15em] text-text-2">
            Getting Started
          </p>
          <ul className="space-y-0.5">
            {GETTING_STARTED.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href}>{item.label}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Themes */}
        {themes.length > 0 && (
          <div>
            <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-[0.15em] text-text-2">
              Themes
            </p>
            <ul className="space-y-0.5">
              {themes.map((c: { name: string; title: string }) => (
                <li key={c.name}>
                  <NavLink href={`/docs/themes/${c.name}`}>{c.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Core components */}
        {core.length > 0 && (
          <div>
            <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-[0.15em] text-text-2">
              Core
            </p>
            <ul className="space-y-0.5">
              {core.map((c: { name: string; title: string }) => (
                <li key={c.name}>
                  <NavLink href={`/docs/components/${c.name}`}>{c.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Particle / animation components */}
        {particles.length > 0 && (
          <div>
            <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-[0.15em] text-text-2">
              Particle Effects
            </p>
            <ul className="space-y-0.5">
              {particles.map((c: { name: string; title: string }) => (
                <li key={c.name}>
                  <NavLink href={`/docs/components/${c.name}`}>{c.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Blocks */}
        {blocks.length > 0 && (
          <div>
            <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-[0.15em] text-text-2">
              Blocks
            </p>
            <ul className="space-y-0.5">
              {blocks.map((c: { name: string; title: string }) => (
                <li key={c.name}>
                  <NavLink href={`/docs/components/${c.name}`}>{c.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Templates */}
        <div>
          <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-[0.15em] text-text-2">
            Templates
          </p>
          <ul className="space-y-0.5">
            {[
              { name: "landing", title: "Landing Page" },
              { name: "saas-dashboard", title: "SaaS Dashboard" },
              { name: "auth", title: "Auth Flow" },
              { name: "pricing-page", title: "Pricing Page" },
              { name: "docs-site", title: "Docs Site" },
              { name: "blog", title: "Blog" },
            ].map((t) => (
              <li key={t.name}>
                <NavLink href={`/docs/templates/${t.name}`}>{t.title}</NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Pro components */}
        {pro.length > 0 && (
          <div>
            <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-[0.15em] text-text-2">
              Pro
            </p>
            <ul className="space-y-0.5">
              {pro.map((c: { name: string; title: string }) => (
                <li key={c.name}>
                  <NavLink href={`/docs/components/${c.name}`} pro>
                    {c.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Theme switcher */}
      <div className="shrink-0 border-t border-border px-4 py-3 flex items-center justify-between">
        <span className="text-xs text-text-2">Theme</span>
        <ThemeToggle />
      </div>
    </aside>
  )
}
