import { promises as fs } from "fs"
import path from "path"
import type { Metadata } from "next"
import { Nav } from "../_components/nav"
import { BlocksGallery } from "./_components/blocks-gallery"

export const metadata: Metadata = {
  title: "Blocks — ParticleUI",
  description:
    "20+ full-page section blocks for React, Vue, and Svelte. Hero sections, marketing blocks, auth flows, dashboards, and more. One command install.",
}

interface RawItem {
  name: string
  title: string
  description: string
  categories: string[]
  registryDependencies?: string[]
}

async function getBlocks(): Promise<RawItem[]> {
  const p = path.join(process.cwd(), "public/r/react/index.json")
  const data = JSON.parse(await fs.readFile(p, "utf-8"))
  const items: RawItem[] = Array.isArray(data) ? data : (data.items ?? [])
  return items.filter((i) => i.categories?.includes("blocks"))
}

export default async function BlocksPage() {
  const blocks = await getBlocks()
  const freeCount = blocks.filter((b) => !b.categories.includes("pro")).length
  const proCount = blocks.length - freeCount

  return (
    <>
      <Nav />
      <main
        id="main-content"
        tabIndex={-1}
        className="min-h-svh bg-bg text-text-1 pt-24 pb-20 px-6 outline-none"
      >
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent mb-3">
              Section Blocks
            </p>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.05em] leading-[1.0] mb-5">
              {blocks.length} blocks.<br />
              <span className="text-text-3">Drop any section in seconds.</span>
            </h1>
            <p className="text-[15px] text-text-2 max-w-xl leading-[1.7]">
              Full-page sections — hero variants, marketing blocks, auth flows, dashboards, and more.
              Built with OKLCH design tokens and particle effects. One command installs the block and
              all its dependencies.
            </p>
            <div className="mt-6 flex items-center gap-4 text-sm text-text-4">
              <span>{freeCount} free</span>
              <span className="h-px w-4 bg-border" />
              <span>{proCount} pro</span>
              <span className="h-px w-4 bg-border" />
              <span>React · Vue · Svelte</span>
            </div>
          </div>

          {/* Install banner */}
          <div className="mb-10 rounded-2xl border border-border bg-surface-1 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-text-1 mb-0.5">Installing a block</p>
              <p className="text-xs text-text-3">
                Free blocks work immediately. Pro blocks require a{" "}
                <code className="text-accent font-mono">PARTICLEUI_TOKEN</code>.
              </p>
            </div>
            <div className="font-mono text-xs rounded-xl border border-border bg-bg px-4 py-2.5 text-text-2 whitespace-nowrap">
              <span className="text-text-4">$</span>{" "}
              <span className="text-accent">npx particleui-cli</span>{" "}
              <span>add hero-centered</span>
            </div>
          </div>

          {/* Gallery */}
          <BlocksGallery items={blocks} />
        </div>
      </main>

      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-4">© {new Date().getFullYear()} ParticleUI</p>
          <nav className="flex items-center gap-6 text-xs text-text-4">
            {["Components", "Blocks", "Docs", "Pricing"].map((l) => (
              <a key={l} href={`/${l.toLowerCase()}`} className="hover:text-text-2 transition-colors">
                {l}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  )
}
