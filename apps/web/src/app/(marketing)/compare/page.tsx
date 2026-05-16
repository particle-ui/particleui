import Link from "next/link"
import { Check, X, ArrowRight, Sparkle, Info } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import { Nav } from "../_components/nav"

export const metadata: Metadata = {
  title: "Why ParticleUI — Compare",
  description:
    "See what ParticleUI gives you out of the box vs assembling it yourself with Radix UI and Tailwind.",
}

type Row = {
  feature: string
  other: boolean | string
  particle: boolean | string
  note?: string
}

const ROWS: Row[] = [
  { feature: "Radix UI headless layer",     other: true,       particle: true },
  { feature: "Copy-paste install",          other: true,       particle: true },
  { feature: "TypeScript-first",            other: true,       particle: true },
  { feature: "MIT licensed",               other: true,       particle: true },
  { feature: "Free core primitives",        other: "build it", particle: true },
  { feature: "Core UI primitives",          other: "build it", particle: "55+" },
  { feature: "Particle / animation layer",  other: false,      particle: "36 components" },
  { feature: "Full-page blocks",            other: false,      particle: "20 blocks" },
  { feature: "Pro dashboard templates",     other: false,      particle: true },
  { feature: "React",                       other: true,       particle: true },
  { feature: "Vue 3",                       other: false,      particle: true,  note: "Native registry, not a port" },
  { feature: "Svelte 5",                    other: false,      particle: true,  note: "Native registry, not a port" },
  { feature: "OKLCH design tokens",         other: false,      particle: true },
  { feature: "Opinionated dark theme",      other: false,      particle: true },
  { feature: "MCP server",                  other: false,      particle: true },
  { feature: "Bundled Claude skills",       other: false,      particle: "Pro" },
  { feature: "Theme generator",             other: false,      particle: true },
  { feature: "Price",                       other: "Your time", particle: "Free / $149 Pro" },
]

const SECTIONS = [
  {
    title: "You own the code",
    body: "Every component installs directly into your codebase as a source file. No runtime package to version, no black box, no vendor lock-in. Edit every line, delete what you don't need, ship with confidence.",
  },
  {
    title: "Visual opinions built in",
    body: "ParticleUI makes an opinionated choice: dark-first, OKLCH color science, and a particle animation layer. If you want to express a strong visual identity without writing it from scratch, that's the gap we fill.",
  },
  {
    title: "Three frameworks, one registry",
    body: "React, Vue 3, and Svelte 5 registries — same OKLCH design tokens, same component API. Switch the registry URL and you're done. Native implementations, not ports.",
  },
]

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check size={16} weight="bold" className="text-accent mx-auto" />
  if (value === false) return <X size={14} className="text-text-3 mx-auto" />
  return <span className="text-xs font-medium text-text-2">{value}</span>
}

export default function ComparePage() {
  return (
    <div className="min-h-svh bg-bg text-text-1">
      <Nav />

      <main id="main-content" tabIndex={-1} className="mx-auto max-w-5xl px-6 pt-32 pb-24 outline-none">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-3">
            Why ParticleUI
          </p>
          <h1 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-5">
            Everything you&apos;d build yourself.<br />Already built.
          </h1>
          <p className="text-text-2 text-lg leading-[1.7]">
            ParticleUI gives you Radix UI primitives, OKLCH design tokens, particle effects, and full-page blocks — all
            installed as source files you own outright. One command instead of weeks of groundwork.
          </p>
        </div>

        {/* Honest note */}
        <div className="mb-12 flex items-start gap-3 rounded-2xl border border-border bg-surface-1 px-5 py-4">
          <Info size={15} className="text-text-3 mt-0.5 shrink-0" />
          <p className="text-[15px] text-text-2 leading-[1.65]">
            ParticleUI is an independent component library. Components install directly into your project as source — no
            runtime dependency, no wrapper package. If you want full flexibility with zero opinions, build from Radix
            directly. If you want a strong visual identity ready to ship, that&apos;s what we&apos;re here for.
          </p>
        </div>

        {/* Comparison table */}
        <div className="mb-16 overflow-hidden rounded-2xl border border-border">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_80px_100px] sm:grid-cols-[1fr_120px_140px] border-b border-border bg-surface-2">
            <div className="px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.13em] text-text-2">
              Feature
            </div>
            <div className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.13em] text-text-2">
              DIY / Radix
            </div>
            <div className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.13em] text-accent">
              ParticleUI
            </div>
          </div>

          {/* Rows */}
          {ROWS.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-[1fr_120px_140px] border-b border-border last:border-0 transition-colors hover:bg-surface-1 ${
                i % 2 === 0 ? "bg-bg" : "bg-surface-1/50"
              }`}
            >
              <div className="px-5 py-3.5 flex items-center gap-2">
                <span className="text-[15px] text-text-2">{row.feature}</span>
                {row.note && (
                  <span className="text-xs text-text-2 border border-border rounded-full px-2 py-0.5 hidden sm:inline">
                    {row.note}
                  </span>
                )}
              </div>
              <div className="px-4 py-3.5 flex items-center justify-center">
                <Cell value={row.other} />
              </div>
              <div className="px-4 py-3.5 flex items-center justify-center">
                <Cell value={row.particle} />
              </div>
            </div>
          ))}
        </div>

        {/* Explanation sections */}
        <div className="mb-16 grid sm:grid-cols-3 gap-4">
          {SECTIONS.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-surface-1 p-6">
              <h2 className="text-base font-semibold tracking-[-0.02em] text-text-1 mb-3">
                {s.title}
              </h2>
              <p className="text-[15px] text-text-2 leading-[1.7]">{s.body}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-2xl border border-accent-border bg-surface-1 px-10 py-12 text-center">
          <div
            className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, var(--color-accent), transparent)" }}
          />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-dim px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-accent mb-5">
              <Sparkle size={10} weight="fill" />
              Free to start
            </span>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.04em] leading-[1.1] text-text-1 mb-4">
              Start with the free tier
            </h2>
            <p className="text-text-2 mb-8 max-w-md mx-auto leading-[1.7]">
              55+ core primitives + 36 particle effects + 20 full-page blocks. All MIT licensed.
              One command, no account needed.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/components"
                className="flex items-center gap-2 rounded-full bg-accent text-bg px-7 py-3 text-sm font-semibold hover:brightness-90 transition-all"
              >
                Browse free components
                <ArrowRight size={13} weight="bold" />
              </Link>
              <Link
                href="/docs/getting-started/installation"
                className="flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-7 py-3 text-sm font-medium text-text-2 hover:text-text-1 hover:border-border-hover transition-all"
              >
                Read the docs
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-2">© {new Date().getFullYear()} ParticleUI</p>
          <nav className="flex items-center gap-6 text-xs text-text-2">
            {["Components", "Docs", "Pricing", "Blog"].map((l) => (
              <Link key={l} href={`/${l.toLowerCase()}`} className="hover:text-text-2 transition-colors">
                {l}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  )
}
