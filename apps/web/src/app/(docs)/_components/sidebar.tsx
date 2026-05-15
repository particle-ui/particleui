import Link from "next/link"
import { Sparkle } from "@phosphor-icons/react/dist/ssr"
import { promises as fs } from "fs"
import path from "path"
import { NavLink } from "./nav-link"

async function getComponents() {
  try {
    const p = path.join(process.cwd(), "public/r/react/index.json")
    return JSON.parse(await fs.readFile(p, "utf-8"))
  } catch {
    return []
  }
}

const GETTING_STARTED = [
  { label: "Introduction", href: "/docs" },
  { label: "Installation", href: "/docs/getting-started/installation" },
  { label: "components.json", href: "/docs/getting-started/components-json" },
  { label: "Theming", href: "/docs/getting-started/theming" },
  { label: "MCP Server", href: "/docs/getting-started/mcp" },
]

export async function Sidebar() {
  const components = await getComponents()
  const core = components.filter((c: { categories: string[] }) => c.categories.includes("core"))
  const free = components.filter((c: { categories: string[] }) => !c.categories.includes("core") && !c.categories.includes("pro"))
  const pro = components.filter((c: { categories: string[] }) => c.categories.includes("pro"))

  return (
    <aside className="fixed top-0 left-0 h-svh w-64 border-r border-border bg-bg flex flex-col overflow-y-auto hidden lg:flex z-40">
      {/* Logo */}
      <div className="flex h-14 shrink-0 items-center border-b border-border px-5">
        <Link href="/" className="flex items-center gap-2 font-bold text-sm tracking-tight">
          <Sparkle weight="fill" size={15} className="text-accent" />
          ParticleUI
        </Link>
      </div>

      <nav className="flex-1 py-5 px-3 space-y-5 overflow-y-auto">
        {/* Getting started */}
        <div>
          <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-4">
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

        {/* Core components */}
        {core.length > 0 && (
          <div>
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-4">
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

        {/* Free / particle components */}
        {free.length > 0 && (
          <div>
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-4">
              Particle
            </p>
            <ul className="space-y-0.5">
              {free.map((c: { name: string; title: string }) => (
                <li key={c.name}>
                  <NavLink href={`/docs/components/${c.name}`}>{c.title}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pro components */}
        {pro.length > 0 && (
          <div>
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-4">
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
    </aside>
  )
}
