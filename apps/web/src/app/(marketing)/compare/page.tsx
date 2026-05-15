import Link from "next/link"
import { Check, X, ArrowRight, Sparkle, Info } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import { Nav } from "../_components/nav"

export const metadata: Metadata = {
  title: "ParticleUI vs shadcn/ui — Compare",
  description:
    "An honest comparison of ParticleUI and shadcn/ui. See what's the same, what's different, and when to use each.",
}

type Row = {
  feature: string
  shadcn: boolean | string
  particle: boolean | string
  note?: string
}

const ROWS: Row[] = [
  { feature: "shadcn CLI compatible",       shadcn: true,       particle: true },
  { feature: "Radix UI headless layer",     shadcn: true,       particle: true },
  { feature: "Copy-paste install",          shadcn: true,       particle: true },
  { feature: "TypeScript-first",            shadcn: true,       particle: true },
  { feature: "MIT licensed",               shadcn: true,       particle: true },
  { feature: "Free core primitives",        shadcn: true,       particle: true },
  { feature: "Core UI primitives",          shadcn: "50+",      particle: "39" },
  { feature: "Particle / animation layer",  shadcn: false,      particle: "12 components" },
  { feature: "Full-page blocks",            shadcn: false,      particle: "15 blocks" },
  { feature: "Pro dashboard templates",     shadcn: false,      particle: true },
  { feature: "React",                       shadcn: true,       particle: true },
  { feature: "Vue 3",                       shadcn: false,      particle: true,  note: "Native registry, not a port" },
  { feature: "Svelte 5",                    shadcn: false,      particle: true,  note: "Native registry, not a port" },
  { feature: "OKLCH design tokens",         shadcn: false,      particle: true },
  { feature: "Opinionated dark theme",      shadcn: false,      particle: true },
  { feature: "MCP server",                  shadcn: false,      particle: true },
  { feature: "Bundled Claude skills",       shadcn: false,      particle: "Pro" },
  { feature: "Theme generator",             shadcn: true,       particle: true },
  { feature: "Price",                       shadcn: "Free",     particle: "Free / $149 Pro" },
]

const SECTIONS = [
  {
    title: "The same where it matters",
    body: "ParticleUI installs with the exact same shadcn CLI command. The component API, file structure, and Radix UI behaviour are identical. Switching is a find-and-replace, not a migration.",
  },
  {
    title: "Different where it counts",
    body: "shadcn/ui is deliberately unstyled — a blank canvas. ParticleUI makes an opinionated choice: dark-first, OKLCH color science, and a particle animation layer on top of every primitive. If you want to express a strong visual identity without writing it from scratch, that's the gap we fill.",
  },
  {
    title: "Can I use both?",
    body: "Yes. ParticleUI components drop into any shadcn project. You can use shadcn's base components alongside ParticleUI's particle effects and blocks — they share the same install pattern and the same Radix primitives underneath.",
  },
]

function Cell({ value }: { value: boolean | string }) {
  if (value === true) return <Check size={16} weight="bold" className="text-accent mx-auto" />
  if (value === false) return <X size={14} className="text-text-4 mx-auto opacity-50" />
  return <span className="text-xs font-medium text-text-2">{value}</span>
}

export default function ComparePage() {
  return (
    <div className="min-h-svh bg-bg text-text-1">
      <Nav />

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent mb-3">
            vs shadcn/ui
          </p>
          <h1 className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-5">
            Built on the shoulders of giants.
          </h1>
          <p className="text-text-2 text-lg leading-[1.7]">
            ParticleUI extends the shadcn ecosystem — not competes with it. Same CLI, same Radix primitives,
            same copy-paste model. We add the visual layer shadcn deliberately leaves out.
          </p>
        </div>

        {/* Honest note */}
        <div className="mb-12 flex items-start gap-3 rounded-2xl border border-border bg-surface-1 px-5 py-4">
          <Info size={15} className="text-text-4 mt-0.5 shrink-0" />
          <p className="text-sm text-text-3 leading-[1.65]">
            This is an honest comparison. shadcn/ui is an excellent project — it&apos;s what ParticleUI is built on.
            If you want maximum flexibility and no visual opinions, use shadcn. If you want a strong dark aesthetic
            and animation out of the box, that&apos;s where we come in.
          </p>
        </div>

        {/* Comparison table */}
        <div className="mb-16 overflow-hidden rounded-2xl border border-border">
          {/* Table header */}
          <div className="grid grid-cols-[1fr_120px_140px] border-b border-border bg-surface-2">
            <div className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.13em] text-text-4">
              Feature
            </div>
            <div className="px-4 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.13em] text-text-4">
              shadcn/ui
            </div>
            <div className="px-4 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.13em] text-accent">
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
                <span className="text-sm text-text-2">{row.feature}</span>
                {row.note && (
                  <span className="text-[10px] text-text-4 border border-border rounded-full px-2 py-0.5 hidden sm:inline">
                    {row.note}
                  </span>
                )}
              </div>
              <div className="px-4 py-3.5 flex items-center justify-center">
                <Cell value={row.shadcn} />
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
              <h3 className="text-base font-semibold tracking-[-0.02em] text-text-1 mb-3">
                {s.title}
              </h3>
              <p className="text-sm text-text-3 leading-[1.7]">{s.body}</p>
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
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-dim px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-accent mb-5">
              <Sparkle size={10} weight="fill" />
              Free to start
            </span>
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-[-0.04em] leading-[1.1] text-text-1 mb-4">
              Try it alongside your shadcn project
            </h2>
            <p className="text-text-3 mb-8 max-w-md mx-auto leading-[1.7]">
              All free components install with one command. No token, no account needed.
              Add to any existing shadcn/ui project in under a minute.
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
                className="flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-7 py-3 text-sm font-medium text-text-3 hover:text-text-1 hover:border-border-hover transition-all"
              >
                Read the docs
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border px-6 py-10">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-4">© {new Date().getFullYear()} ParticleUI</p>
          <nav className="flex items-center gap-6 text-xs text-text-4">
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
