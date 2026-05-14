import { promises as fs } from "fs"
import path from "path"
import type { Metadata } from "next"
import { Gallery } from "./_components/gallery"

export const metadata: Metadata = { title: "Components" }

async function getIndex() {
  const p = path.join(process.cwd(), "public/r/react/index.json")
  const raw = await fs.readFile(p, "utf-8")
  return JSON.parse(raw)
}

export default async function ComponentsPage() {
  const items = await getIndex()
  const proCount = items.filter((i: { categories: string[] }) => i.categories.includes("pro")).length
  const freeCount = items.length - proCount

  return (
    <main className="min-h-svh bg-[#030303] text-white pt-24 pb-20 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#555] mb-3">
            Components
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.04em] mb-4">
            {items.length} components.<br />
            <span className="text-[#444]">Built to impress.</span>
          </h1>
          <div className="flex items-center gap-4 text-sm text-[#444]">
            <span>{freeCount} free</span>
            <span className="h-1 w-1 rounded-full bg-[#222]" />
            <span>{proCount} pro</span>
            <span className="h-1 w-1 rounded-full bg-[#222]" />
            <span>React · Vue · Svelte</span>
          </div>
        </div>

        {/* Install banner */}
        <div className="mb-12 rounded-2xl border border-white/[0.07] bg-[#0a0a0a] px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium mb-0.5">Installing components</p>
            <p className="text-xs text-[#444]">
              Free components work immediately. Pro requires{" "}
              <code className="text-[#00d4ff]">PARTICLEUI_TOKEN</code> in your{" "}
              <code className="text-[#666]">.env</code>.
            </p>
          </div>
          <div className="font-mono text-xs rounded-xl border border-white/[0.06] bg-[#030303] px-4 py-2.5 whitespace-nowrap text-[#00d4ff] shrink-0">
            npx shadcn add @particleui/[name]
          </div>
        </div>

        <Gallery items={items} />
      </div>
    </main>
  )
}
