import Link from "next/link"
import { Check } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import { Nav } from "../_components/nav"

export const metadata: Metadata = {
  title: "Free & Open Source — ParticleUI",
  description: "ParticleUI is free and open source. MIT licensed. Every component, block, and theme — no tiers, no gates.",
}

const FEATURES = [
  "100+ components, MIT licensed",
  "React · Vue · Svelte registries",
  "36 particle & animation effects",
  "Full-page blocks and templates",
  "OKLCH design tokens",
  "MCP server for AI editors",
  "TypeScript-first, fully typed",
  "WCAG 2.1 AA accessible",
  "No sign-in required",
  "No token needed",
  "Use in commercial projects",
  "Lifetime updates via GitHub",
]

const FAQ = [
  {
    q: "Is this really free?",
    a: "Yes. ParticleUI is MIT licensed and free forever. Every component, block, and theme — no tiers, no gates, no upsell.",
  },
  {
    q: "Do I need an account?",
    a: "No. Run npx particleui-cli add [component] and the source lands in your repo immediately. No sign-in, no token.",
  },
  {
    q: "Can I use these in commercial projects?",
    a: "Yes, the MIT license covers unlimited personal and commercial use. There are no restrictions on how you use, modify, or distribute the code.",
  },
  {
    q: "How is this different from shadcn/ui?",
    a: "shadcn/ui gives you great primitives. ParticleUI adds the particle and animation layer, full-page blocks, OKLCH design tokens, and native Vue + Svelte registries — all with a strong visual identity out of the box.",
  },
  {
    q: "How do components install?",
    a: "The CLI copies source files directly into your project — no runtime package, no version lock-in. You own the code the moment it lands.",
  },
  {
    q: "Can I contribute?",
    a: "Yes, the repo is open on GitHub. Open an issue, submit a PR, or share what you build. We review contributions regularly.",
  },
]

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1} className="min-h-svh bg-bg text-text-1 pt-24 pb-20 px-6 outline-none">
        <div className="mx-auto max-w-4xl">

          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent mb-4">
              Open source
            </p>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.05em] leading-[1.05] mb-5">
              Free. Always.
            </h1>
            <p className="text-[17px] text-text-2 leading-[1.7] max-w-xl mx-auto mb-8">
              ParticleUI is MIT licensed and open source. Every component, block, and theme is free to install, customize, and ship — no account required.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/components"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg hover:brightness-95 transition-all"
              >
                Browse components →
              </Link>
              <Link
                href="https://github.com/dawit-io/particleui"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-1 px-6 py-3 text-sm font-medium text-text-2 hover:text-text-1 hover:border-border-hover transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                Star on GitHub
              </Link>
            </div>
          </div>

          {/* Everything included card */}
          <div className="rounded-2xl border border-border bg-surface-1 p-8 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent mb-2">Everything included</p>
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-5xl font-bold text-text-1">$0</span>
                  <span className="text-text-3 text-sm mb-2">forever</span>
                </div>
                <p className="text-text-3 text-sm">MIT licensed. No account needed. No expiry.</p>
              </div>
              <div className="rounded-full border border-accent-border bg-accent-dim px-3 py-1.5 text-xs font-semibold text-accent">
                Open source
              </div>
            </div>

            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 mb-8">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[15px] text-text-2">
                  <Check size={13} weight="bold" className="text-accent shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="border-t border-border pt-6">
              <p className="text-[11px] font-mono text-text-4 mb-3">Install any component</p>
              <code className="block rounded-xl border border-border bg-bg px-5 py-3.5 font-mono text-sm text-accent">
                npx particleui-cli add button
              </code>
            </div>
          </div>

          <p className="text-center text-sm text-text-4 mb-20">
            MIT license ·{" "}
            <Link href="https://github.com/dawit-io/particleui" target="_blank" rel="noreferrer" className="hover:text-text-2 transition-colors">
              View on GitHub
            </Link>{" "}
            · No sign-in required
          </p>

          {/* FAQ */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold tracking-[-0.03em] text-center mb-10">Common questions</h2>
            <div className="divide-y divide-border">
              {FAQ.map(({ q, a }) => (
                <div key={q} className="py-6">
                  <p className="font-semibold text-text-1 mb-2">{q}</p>
                  <p className="text-[15px] text-text-2 leading-[1.75]">{a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
