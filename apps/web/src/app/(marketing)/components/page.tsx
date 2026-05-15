import { promises as fs } from "fs"
import path from "path"
import type { Metadata } from "next"
import { Gallery } from "./_components/gallery"

export const metadata: Metadata = { title: "Components" }

interface RawItem {
  name: string
  type: string
  title: string
  description: string
  categories: string[]
}

interface EnrichedItem extends RawItem {
  frameworks: { react: boolean; vue: boolean; svelte: boolean }
}

async function readIndex(framework: string): Promise<RawItem[]> {
  const p = path.join(process.cwd(), "public/r", framework, "index.json")
  try {
    const data = JSON.parse(await fs.readFile(p, "utf-8"))
    const items: RawItem[] = Array.isArray(data) ? data : (data.items ?? [])
    return items.filter((i: RawItem & { tier?: string }) => i.tier !== "themes")
  } catch {
    return []
  }
}

async function getEnrichedItems(): Promise<EnrichedItem[]> {
  const [reactItems, vueItems, svelteItems] = await Promise.all([
    readIndex("react"),
    readIndex("vue"),
    readIndex("svelte"),
  ])

  const vueNames = new Set(vueItems.map((i) => i.name))
  const svelteNames = new Set(svelteItems.map((i) => i.name))

  return reactItems.map((item) => ({
    ...item,
    frameworks: {
      react: true,
      vue: vueNames.has(item.name),
      svelte: svelteNames.has(item.name),
    },
  }))
}

export default async function ComponentsPage() {
  const items = await getEnrichedItems()
  const proCount = items.filter((i) => i.categories.includes("pro")).length
  const freeCount = items.length - proCount

  return (
    <main className="min-h-svh bg-bg text-text-1 pt-24 pb-20 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent mb-3">
            Component Library
          </p>
          <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.05em] leading-[1.0] mb-5">
            {items.length} components.<br />
            Built to impress.
          </h1>
          <p className="text-sm text-text-4">
            {freeCount} free · {proCount} pro · React · Vue · Svelte
          </p>
        </div>

        {/* Install banner */}
        <div className="mb-12 rounded-2xl border border-border bg-surface-1 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-text-1 mb-1">Installing components</p>
            <p className="text-xs text-text-3">
              Free components work immediately. Pro requires{" "}
              <code className="text-accent font-mono">PARTICLEUI_TOKEN</code>{" "}
              in your <code className="text-text-3 font-mono">.env</code>.
            </p>
          </div>
          <div className="font-mono text-xs rounded-xl border border-border bg-bg px-4 py-2.5 whitespace-nowrap text-accent shrink-0">
            npx particleui-cli add [name]
          </div>
        </div>

        <Gallery items={items} />
      </div>
    </main>
  )
}
