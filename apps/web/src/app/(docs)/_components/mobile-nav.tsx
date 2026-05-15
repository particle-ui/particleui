import { promises as fs } from "fs"
import path from "path"
import { NavLink } from "./nav-link"
import { SearchDialog } from "./search-dialog"
import { MobileDrawer } from "./mobile-drawer"

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

export async function MobileNav() {
  const components = await getComponents()
  const core = components.filter((c: { categories: string[] }) => c.categories.includes("core"))
  const particles = components.filter((c: { categories: string[] }) => c.categories.includes("particles"))
  const blocks = components.filter((c: { categories: string[] }) => c.categories.includes("blocks"))
  const pro = components.filter((c: { categories: string[] }) => c.categories.includes("pro"))

  return (
    <MobileDrawer>
      {/* Search */}
      <div className="px-3 py-3 border-b border-border">
        <SearchDialog items={components} />
      </div>

      {/* Nav sections */}
      <nav className="flex-1 py-5 px-3 space-y-5">
        {/* Getting Started */}
        <div>
          <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-3">
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
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-3">
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
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-3">
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
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-3">
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

        {/* Pro components */}
        {pro.length > 0 && (
          <div>
            <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-text-3">
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
    </MobileDrawer>
  )
}
