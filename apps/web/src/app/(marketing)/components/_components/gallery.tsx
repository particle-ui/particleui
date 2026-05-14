"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { MagnifyingGlass, Sparkle, ArrowUpRight } from "@phosphor-icons/react"

interface RegistryItem {
  name: string
  type: string
  title: string
  description: string
  categories: string[]
}

const ALL_CATEGORIES = ["all", "free", "pro", "animations", "backgrounds", "buttons", "blocks", "text"]

export function Gallery({ items }: { items: RegistryItem[] }) {
  const [q, setQ] = useState("")
  const [cat, setCat] = useState("all")

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesQ =
        !q ||
        item.name.includes(q.toLowerCase()) ||
        item.title.toLowerCase().includes(q.toLowerCase()) ||
        item.description.toLowerCase().includes(q.toLowerCase())

      const matchesCat =
        cat === "all" ||
        (cat === "free" && !item.categories.includes("pro")) ||
        (cat === "pro" && item.categories.includes("pro")) ||
        item.categories.includes(cat)

      return matchesQ && matchesCat
    })
  }, [items, q, cat])

  const isPro = (item: RegistryItem) => item.categories.includes("pro")

  return (
    <div>
      {/* Search + filter bar */}
      <div className="mb-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <MagnifyingGlass
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search components..."
            className="w-full rounded-xl border border-white/[0.07] bg-[#0a0a0a] pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-[#333] outline-none focus:border-[rgba(0,212,255,0.3)] transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          {ALL_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium capitalize transition-all ${
                cat === c
                  ? "bg-white text-black"
                  : "border border-white/[0.07] text-[#555] hover:text-white hover:border-white/20"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-[#333] mb-6">
        {filtered.length} component{filtered.length !== 1 ? "s" : ""}
        {cat !== "all" && ` in "${cat}"`}
        {q && ` matching "${q}"`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center text-[#333]">
          <MagnifyingGlass size={32} className="mx-auto mb-4 text-[#222]" />
          <p>No components found.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((item) => (
            <Link
              key={item.name}
              href={`/components/${item.name}`}
              className="group relative rounded-2xl border border-white/[0.07] bg-[#0a0a0a] p-5 hover:border-[rgba(0,212,255,0.2)] hover:bg-[#0d0d0d] transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <span
                  className={`text-[9px] font-bold uppercase tracking-widest rounded-full px-2.5 py-1 ${
                    isPro(item)
                      ? "border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] text-[#00d4ff]"
                      : "border border-white/[0.07] bg-white/[0.03] text-[#333]"
                  }`}
                >
                  {isPro(item) ? (
                    <span className="flex items-center gap-1">
                      <Sparkle size={8} weight="fill" />Pro
                    </span>
                  ) : "Free"}
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-[#222] group-hover:text-[#00d4ff] transition-colors"
                />
              </div>
              <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-[#444] leading-relaxed line-clamp-2">{item.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.categories
                  .filter((c) => c !== "pro" && c !== "free")
                  .map((c) => (
                    <span
                      key={c}
                      className="rounded-full border border-white/[0.05] bg-white/[0.02] px-2 py-0.5 text-[9px] text-[#333] capitalize"
                    >
                      {c}
                    </span>
                  ))}
              </div>
              <div className="mt-3 font-mono text-[10px] text-[#333]">
                @particleui/{item.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
