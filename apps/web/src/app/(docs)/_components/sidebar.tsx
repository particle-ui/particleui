import Link from "next/link"
import { Sparkle } from "@phosphor-icons/react/dist/ssr"
import { promises as fs } from "fs"
import path from "path"

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
  const free = components.filter((c: { categories: string[] }) => !c.categories.includes("pro"))
  const pro = components.filter((c: { categories: string[] }) => c.categories.includes("pro"))

  return (
    <aside className="fixed top-0 left-0 h-svh w-64 border-r border-white/[0.06] bg-[#030303] flex flex-col overflow-y-auto hidden lg:flex z-40">
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-white/[0.06] px-5">
        <Link href="/" className="flex items-center gap-2 font-bold text-sm">
          <Sparkle weight="fill" size={15} className="text-[#00d4ff]" />
          ParticleUI
        </Link>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-6">
        {/* Getting started */}
        <div>
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#333]">
            Getting Started
          </p>
          <ul className="space-y-0.5">
            {GETTING_STARTED.map((item) => (
              <li key={item.href}>
                <SidebarLink href={item.href}>{item.label}</SidebarLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Free components */}
        <div>
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#333]">
            Free
          </p>
          <ul className="space-y-0.5">
            {free.map((c: { name: string; title: string }) => (
              <li key={c.name}>
                <SidebarLink href={`/docs/components/${c.name}`}>{c.title}</SidebarLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Pro components */}
        <div>
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#333]">
            Pro
          </p>
          <ul className="space-y-0.5">
            {pro.map((c: { name: string; title: string }) => (
              <li key={c.name}>
                <SidebarLink href={`/docs/components/${c.name}`} pro>
                  {c.title}
                </SidebarLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  )
}

function SidebarLink({
  href,
  children,
  pro,
}: {
  href: string
  children: React.ReactNode
  pro?: boolean
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm text-[#555] hover:text-white hover:bg-white/[0.04] transition-all"
    >
      <span>{children}</span>
      {pro && (
        <span className="text-[9px] font-bold uppercase tracking-wider text-[#00d4ff]/60">
          Pro
        </span>
      )}
    </Link>
  )
}
