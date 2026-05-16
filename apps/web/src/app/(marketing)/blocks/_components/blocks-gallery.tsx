"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ArrowUpRight, Sparkle, Copy, Check } from "@phosphor-icons/react"

interface BlockItem {
  name: string
  title: string
  description: string
  categories: string[]
  registryDependencies?: string[]
}

type Category = "all" | "hero" | "marketing" | "auth" | "dashboard" | "layout" | "ai"

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "hero", label: "Hero" },
  { key: "marketing", label: "Marketing" },
  { key: "auth", label: "Auth" },
  { key: "dashboard", label: "Dashboard" },
  { key: "layout", label: "Layout" },
  { key: "ai", label: "AI" },
]

function getCategory(item: BlockItem): Category {
  if (item.categories.includes("hero")) return "hero"
  if (item.categories.includes("auth")) return "auth"
  if (item.categories.includes("dashboard")) return "dashboard"
  if (item.categories.includes("ai")) return "ai"
  if (item.categories.includes("layout")) return "layout"
  return "marketing"
}

function BlockPreview({ item }: { item: BlockItem }) {
  const cat = getCategory(item)
  const isPro = item.categories.includes("pro")

  if (cat === "hero") {
    return (
      <div className="h-full w-full p-6 flex flex-col justify-between" style={{ background: "linear-gradient(135deg, var(--color-bg) 0%, var(--color-surface-2) 100%)" }}>
        <div className="space-y-2">
          <div className="h-2 w-16 rounded-full" style={{ background: "var(--color-accent)", opacity: 0.6 }} />
          <div className="h-5 w-3/4 rounded" style={{ background: "var(--color-text-1)", opacity: 0.9 }} />
          <div className="h-5 w-2/3 rounded" style={{ background: "var(--color-text-1)", opacity: 0.7 }} />
          <div className="h-3 w-full rounded mt-3" style={{ background: "var(--color-text-3)", opacity: 0.3 }} />
          <div className="h-3 w-5/6 rounded" style={{ background: "var(--color-text-3)", opacity: 0.3 }} />
        </div>
        <div className="flex gap-2 mt-4">
          <div className="h-8 w-24 rounded-full" style={{ background: "var(--color-accent)", opacity: 0.9 }} />
          <div className="h-8 w-20 rounded-full border" style={{ borderColor: "var(--color-border)" }} />
        </div>
      </div>
    )
  }

  if (cat === "auth") {
    return (
      <div className="h-full w-full flex items-center justify-center p-6" style={{ background: "var(--color-bg)" }}>
        <div className="w-full max-w-[180px] space-y-2.5">
          <div className="h-3 w-20 rounded" style={{ background: "var(--color-text-1)", opacity: 0.8 }} />
          <div className="h-8 w-full rounded-lg border" style={{ borderColor: "var(--color-border)", background: "var(--color-surface-1)" }} />
          <div className="h-3 w-16 rounded mt-1" style={{ background: "var(--color-text-1)", opacity: 0.8 }} />
          <div className="h-8 w-full rounded-lg border" style={{ borderColor: "var(--color-border)", background: "var(--color-surface-1)" }} />
          <div className="h-8 w-full rounded-lg mt-1" style={{ background: "var(--color-accent)", opacity: 0.9 }} />
          <div className="h-2 w-3/4 mx-auto rounded" style={{ background: "var(--color-text-4)", opacity: 0.4 }} />
        </div>
      </div>
    )
  }

  if (cat === "dashboard") {
    return (
      <div className="h-full w-full p-5" style={{ background: "var(--color-bg)" }}>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {[0.6, 0.4, 0.8].map((o, i) => (
            <div key={i} className="rounded-lg p-2 border" style={{ borderColor: "var(--color-border)", background: "var(--color-surface-1)" }}>
              <div className="h-1.5 w-8 rounded mb-1" style={{ background: "var(--color-text-4)", opacity: 0.4 }} />
              <div className="h-4 w-full rounded" style={{ background: "var(--color-accent)", opacity: o }} />
            </div>
          ))}
        </div>
        <div className="rounded-lg border p-3 flex items-end gap-1.5 h-16" style={{ borderColor: "var(--color-border)", background: "var(--color-surface-1)" }}>
          {[0.3, 0.5, 0.8, 0.6, 0.9, 0.4, 0.7, 0.5, 0.8, 0.6, 0.9, 0.7].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm" style={{ background: "var(--color-accent)", opacity: 0.6, height: `${h * 100}%` }} />
          ))}
        </div>
      </div>
    )
  }

  if (cat === "ai") {
    return (
      <div className="h-full w-full p-5 flex flex-col justify-end gap-2" style={{ background: "var(--color-bg)" }}>
        <div className="self-end max-w-[70%] rounded-xl rounded-br-sm px-3 py-2" style={{ background: "var(--color-accent)", opacity: 0.9 }}>
          <div className="h-2 w-20 rounded" style={{ background: "var(--color-bg)", opacity: 0.6 }} />
        </div>
        <div className="self-start max-w-[80%] rounded-xl rounded-bl-sm px-3 py-2 border" style={{ borderColor: "var(--color-border)", background: "var(--color-surface-1)" }}>
          <div className="space-y-1">
            <div className="h-2 w-28 rounded" style={{ background: "var(--color-text-3)", opacity: 0.5 }} />
            <div className="h-2 w-20 rounded" style={{ background: "var(--color-text-3)", opacity: 0.4 }} />
          </div>
        </div>
        <div className="h-8 w-full rounded-xl border flex items-center px-3 gap-2" style={{ borderColor: "var(--color-border)", background: "var(--color-surface-1)" }}>
          <div className="h-2 flex-1 rounded" style={{ background: "var(--color-text-4)", opacity: 0.3 }} />
          <div className="h-5 w-5 rounded-lg" style={{ background: "var(--color-accent)", opacity: 0.8 }} />
        </div>
      </div>
    )
  }

  if (cat === "layout") {
    return (
      <div className="h-full w-full p-4 flex flex-col gap-2" style={{ background: "var(--color-bg)" }}>
        <div className="grid grid-cols-3 gap-2 flex-1">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-lg" style={{ background: "var(--color-surface-1)", border: "1px solid var(--color-border)" }} />
          ))}
        </div>
        <div className="flex items-center justify-between h-6 border-t pt-2" style={{ borderColor: "var(--color-border)" }}>
          <div className="h-2 w-16 rounded" style={{ background: "var(--color-text-4)", opacity: 0.4 }} />
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-2 w-8 rounded" style={{ background: "var(--color-text-4)", opacity: 0.3 }} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Marketing (default)
  return (
    <div className="h-full w-full p-5 space-y-3" style={{ background: "var(--color-bg)" }}>
      <div className="h-2 w-12 rounded-full" style={{ background: "var(--color-accent)", opacity: 0.6 }} />
      <div className="h-4 w-2/3 rounded" style={{ background: "var(--color-text-1)", opacity: 0.8 }} />
      <div className="space-y-1.5">
        <div className="h-2 w-full rounded" style={{ background: "var(--color-text-3)", opacity: 0.3 }} />
        <div className="h-2 w-5/6 rounded" style={{ background: "var(--color-text-3)", opacity: 0.3 }} />
        <div className="h-2 w-4/6 rounded" style={{ background: "var(--color-text-3)", opacity: 0.3 }} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="h-12 rounded-xl border" style={{ borderColor: "var(--color-border)", background: "var(--color-surface-1)" }} />
        <div className="h-12 rounded-xl border" style={{ borderColor: "var(--color-border)", background: "var(--color-surface-1)" }} />
      </div>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }}
      className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-1 px-3 py-1.5 text-xs text-text-3 hover:text-text-1 hover:border-border-hover transition-all font-mono"
    >
      {copied ? <Check size={11} className="text-accent" /> : <Copy size={11} />}
      {copied ? "Copied" : `add ${text.split(" add ")[1]}`}
    </button>
  )
}

export function BlocksGallery({ items }: { items: BlockItem[] }) {
  const [activeCategory, setActiveCategory] = useState<Category>("all")

  const filtered = useMemo(() => {
    if (activeCategory === "all") return items
    return items.filter((item) => getCategory(item) === activeCategory)
  }, [items, activeCategory])

  return (
    <div>
      {/* Category tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {CATEGORIES.map(({ key, label }) => {
          const count = key === "all" ? items.length : items.filter((i) => getCategory(i) === key).length
          if (key !== "all" && count === 0) return null
          const isActive = activeCategory === key
          return (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "bg-accent text-bg"
                  : "border border-border text-text-2 hover:text-text-1 hover:border-border-hover"
              }`}
            >
              {label}
              <span className={`text-xs ${isActive ? "text-bg/70" : "text-text-4"}`}>{count}</span>
            </button>
          )
        })}
      </div>

      {/* Blocks grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((item) => {
          const isPro = item.categories.includes("pro")
          const installCmd = `npx particleui-cli add ${item.name}`
          return (
            <Link
              key={item.name}
              href={`/docs/components/${item.name}`}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface-1 hover:border-border-hover transition-all duration-200 hover:-translate-y-0.5 flex flex-col"
            >
              {/* Visual preview */}
              <div className="relative h-44 overflow-hidden border-b border-border">
                <BlockPreview item={item} />
                {/* Hover overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(2px)" }}>
                  <span className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-bg">
                    View block <ArrowUpRight size={11} weight="bold" />
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-text-1 leading-snug">{item.title}</h3>
                  {isPro ? (
                    <span className="shrink-0 inline-flex items-center gap-1 rounded-full border border-accent-border bg-accent-dim px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-accent">
                      <Sparkle size={7} weight="fill" />Pro
                    </span>
                  ) : (
                    <span className="shrink-0 rounded-full border border-border bg-white/[0.03] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-text-4">
                      Free
                    </span>
                  )}
                </div>

                <p className="text-xs text-text-3 leading-relaxed mb-4 flex-1 line-clamp-2">
                  {item.description}
                </p>

                {/* Install command */}
                {!isPro && (
                  <div onClick={(e) => e.preventDefault()}>
                    <CopyButton text={installCmd} />
                  </div>
                )}
                {isPro && (
                  <span className="text-xs text-text-4">
                    Requires Pro token
                  </span>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
