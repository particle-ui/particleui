"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { MagnifyingGlass, ArrowUpRight, Sparkle } from "@phosphor-icons/react"

interface RegistryItem {
  name: string
  type: string
  title: string
  description: string
  categories: string[]
  frameworks: { react: boolean; vue: boolean; svelte: boolean }
}

type FilterKey = "all" | "core" | "particles" | "blocks" | "pro" | "free"

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "core", label: "Core" },
  { key: "particles", label: "Particles" },
  { key: "blocks", label: "Blocks" },
  { key: "pro", label: "Pro" },
  { key: "free", label: "Free" },
]

function matchesFilter(item: RegistryItem, filter: FilterKey): boolean {
  switch (filter) {
    case "all":
      return true
    case "core":
      return item.categories.includes("core")
    case "particles":
      return (
        item.categories.includes("animations") ||
        item.categories.includes("backgrounds")
      )
    case "blocks":
      return item.categories.includes("blocks")
    case "pro":
      return item.categories.includes("pro")
    case "free":
      return !item.categories.includes("pro")
  }
}

function getFilterCount(items: RegistryItem[], filter: FilterKey): number {
  return items.filter((i) => matchesFilter(i, filter)).length
}

export function Gallery({ items }: { items: RegistryItem[] }) {
  const [q, setQ] = useState("")
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all")

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const lq = q.toLowerCase()
      const matchesQ =
        !q ||
        item.name.includes(lq) ||
        item.title.toLowerCase().includes(lq) ||
        item.description.toLowerCase().includes(lq)

      return matchesQ && matchesFilter(item, activeFilter)
    })
  }, [items, q, activeFilter])

  const isPro = (item: RegistryItem) => item.categories.includes("pro")

  return (
    <div>
      {/* Search + filter bar */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <MagnifyingGlass
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-4"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search components..."
            className="w-full rounded-xl border border-border bg-surface-1 pl-9 pr-4 py-3 text-sm text-text-1 placeholder:text-text-3 outline-none focus:border-border-hover transition-colors"
          />
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {FILTERS.map(({ key, label }) => {
            const count = getFilterCount(items, key)
            const isActive = activeFilter === key
            return (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`rounded-full px-4 py-2.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-accent text-bg"
                    : "border border-border text-text-2 hover:text-text-1 hover:border-border-hover"
                }`}
              >
                {label}{" "}
                <span className={isActive ? "opacity-60" : "text-text-2"}>
                  ({count})
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-text-2 mb-6">
        {filtered.length} component{filtered.length !== 1 ? "s" : ""}
        {activeFilter !== "all" && ` in "${FILTERS.find((f) => f.key === activeFilter)?.label}"`}
        {q && ` matching "${q}"`}
      </p>

      {/* Grid or empty state */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <MagnifyingGlass size={32} className="mx-auto mb-4 text-text-3" />
          <p className="text-text-3">No components match.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((item) => (
            <Link
              key={item.name}
              href={`/docs/components/${item.name}`}
              className="group relative bg-surface-1 border border-border rounded-2xl p-5 hover:border-border-hover hover:bg-surface-2 transition-all"
            >
              {/* Top row: badge + arrow */}
              <div className="flex items-start justify-between">
                {isPro(item) ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-accent-border bg-accent-dim text-accent text-[9px] font-bold uppercase tracking-widest px-2.5 py-1">
                    <Sparkle size={8} weight="fill" />
                    Pro
                  </span>
                ) : (
                  <span className="inline-flex rounded-full border border-border text-text-2 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1">
                    Free
                  </span>
                )}
                <ArrowUpRight
                  size={14}
                  className="text-text-4 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Title */}
              <h2 className="text-[0.9375rem] font-semibold tracking-[-0.01em] text-text-1 mt-3 mb-1">
                {item.title}
              </h2>

              {/* Description */}
              <p className="text-[15px] text-text-2 leading-[1.6] line-clamp-2">
                {item.description}
              </p>

              {/* Framework pills */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.frameworks.react && (
                  <span className="text-xs text-text-2 border border-border rounded-full px-2 py-0.5">
                    React
                  </span>
                )}
                {item.frameworks.vue && (
                  <span className="text-xs text-text-2 border border-border rounded-full px-2 py-0.5">
                    Vue
                  </span>
                )}
                {item.frameworks.svelte && (
                  <span className="text-xs text-text-2 border border-border rounded-full px-2 py-0.5">
                    Svelte
                  </span>
                )}
              </div>

              {/* Install slug */}
              <div className="font-mono text-xs text-text-2 mt-3">
                @particleui/{item.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
