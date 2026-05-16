import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Sparkle, ArrowUpRight, Star, Check, Robot, Palette, SquaresFour, Lightning } from "@phosphor-icons/react/dist/ssr"
import { HeroCanvas } from "./_components/hero-canvas"
import { SpotlightCard } from "./_components/spotlight-card"
import { Marquee } from "./_components/marquee"
import { MagneticDemo } from "./_components/magnetic-demo"
import { Nav } from "./_components/nav"
import { Reveal } from "@/components/reveal"

export const metadata: Metadata = {
  title: "ParticleUI — 100+ UI components with particle effects",
  description:
    "100+ free components for React, Vue, and Svelte — particle effects, animated blocks, and OKLCH design tokens. One command install. MIT licensed.",
  openGraph: {
    title: "ParticleUI — 100+ UI components with particle effects",
    description:
      "100+ free components for React, Vue, and Svelte. Particle effects, animated blocks, OKLCH tokens. MIT licensed.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ParticleUI — 100+ UI components with particle effects",
    description:
      "100+ free components for React, Vue, and Svelte. Particle effects, animated blocks, OKLCH tokens.",
    images: ["/opengraph-image"],
  },
}

export default function HomePage() {
  return (
    <div
      className="bg-bg text-text-1 min-h-svh"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
      }}
    >
      <Nav />
      <Hero />
      <Marquee />
      <SocialProofStrip />
      <LiveDemo />
      <BentoFeatures />
      <AIFeatures />
      <CodeSection />
      <Testimonials />
      <Pricing />
      <FAQ />
      <BottomCTA />
      <Footer />
    </div>
  )
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="main-content" tabIndex={-1} aria-label="Hero" className="relative flex min-h-svh items-center justify-center overflow-hidden outline-none">
      {/* Live particle canvas */}
      <HeroCanvas />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, var(--color-bg) 100%)" }} />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center pt-20">
        {/* Eyebrow pill */}
        <Link
          href="/components"
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface-1/80 px-4 py-2 text-xs text-text-2 hover:text-text-1 transition-colors backdrop-blur-sm"
        >
          <span className="flex h-1.5 w-1.5 rounded-full bg-accent relative">
            <span className="animate-ping absolute inset-0 rounded-full bg-accent opacity-60" />
          </span>
          100+ components — React · Svelte · Vue · MIT · Open source
          <ArrowRight size={10} weight="bold" />
        </Link>

        {/* Headline */}
        <h1 className="text-[clamp(3.2rem,7.5vw,6rem)] font-bold leading-[0.96] tracking-[-0.05em] mb-6">
          Components so good
          <br />
          <span
            className="inline-block"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #888888 40%, #d4cfc8 70%, #ffffff 100%)",
              backgroundSize: "200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            your users stop scrolling
          </span>
        </h1>

        <p className="mx-auto max-w-lg text-lg text-text-2 leading-[1.7] mb-10">
          100+ animated components for React, Vue, and Svelte — particle effects, full-page blocks,
          and OKLCH design tokens. One command install. MIT licensed and free to start.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <Link
            href="/components"
            className="group flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-bg hover:brightness-95 hover:scale-[1.03] active:scale-[0.98] transition-all duration-150"
          >
            Browse free components
            <ArrowRight size={13} weight="bold" className="group-hover:translate-x-1 transition-transform duration-150" />
          </Link>
          <Link
            href="/pricing"
            className="flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-text-2 hover:text-text-1 hover:border-border-hover transition-all backdrop-blur-sm"
          >
            Get Pro — $149 →
          </Link>
        </div>

        {/* Social proof */}
        <div className="flex items-center justify-center gap-1.5 mb-12 text-xs text-text-2">
          <span className="flex items-center gap-0.5">
            {["★","★","★","★","★"].map((s, i) => <span key={i} className="text-accent text-[10px]">{s}</span>)}
          </span>
          <span>5.0 · Loved by 200+ developers · MIT licensed</span>
        </div>

        {/* Terminal */}
        <div
          className="mx-auto max-w-md overflow-hidden rounded-2xl border border-border"
          style={{ background: "var(--color-surface-1)" }}
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-auto font-mono text-xs text-text-2">bash</span>
          </div>
          <div className="px-5 py-4 font-mono text-sm text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-text-4">$</span>
              <span className="text-accent">npx particleui-cli</span>
              <span className="text-text-1">add glow-card</span>
            </div>
            <div className="text-success-text mt-2 text-xs pl-4">
              ✓ glow-card<br />
              ✓ Installing dependencies...<br />
              ✓ Wrote src/components/ui/glow-card.tsx
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 text-center pb-20">
          {[
            { value: "100+", label: "Components" },
            { value: "3", label: "Frameworks" },
            { value: "0", label: "Runtime deps" },
            { value: "MIT", label: "License" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold tracking-[-0.04em] text-text-1">{value}</span>
              <span className="text-xs text-text-4 uppercase tracking-[0.12em]">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40" style={{ background: "linear-gradient(to top, var(--color-bg), transparent)" }} />
    </section>
  )
}

/* ─── Social proof strip ──────────────────────────────────────────────────── */
function SocialProofStrip() {
  const stats = [
    { value: "100+", label: "Components" },
    { value: "36", label: "Particle effects" },
    { value: "3", label: "Frameworks" },
    { value: "20", label: "Full-page blocks" },
    { value: "0", label: "Runtime deps" },
    { value: "MIT", label: "License" },
  ]
  return (
    <section aria-hidden className="border-y border-border py-5 overflow-hidden">
      <div className="flex items-center justify-center flex-wrap gap-px">
        {stats.map(({ value, label }, i) => (
          <div key={label} className="flex items-center">
            <div className="flex items-baseline gap-2 px-8 py-2">
              <span className="text-lg font-bold tracking-[-0.04em] text-text-1">{value}</span>
              <span className="text-xs text-text-4 uppercase tracking-[0.1em]">{label}</span>
            </div>
            {i < stats.length - 1 && (
              <span className="h-4 w-px bg-border" />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Live demo section ───────────────────────────────────────────────────── */
function LiveDemo() {
  return (
    <Reveal>
    <section aria-label="Component demos" className="py-32 px-6 relative">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
            Live preview
          </span>
        </div>
        <h2 className="text-center text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-4">
          See them move
        </h2>
        <p className="text-center text-text-3 leading-[1.65] mb-16 max-w-md mx-auto">
          These are real components running in the browser. Hover, click, interact.
        </p>

        {/* Demo grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Magnetic button demo */}
          <SpotlightCard className="p-8 flex flex-col justify-between min-h-[220px]">
            <div className="flex-1 flex items-center justify-center">
              <MagneticDemo />
            </div>
            <div className="mt-6 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Magnetic Button</p>
                  <p className="text-xs text-text-3 mt-0.5">Follows your cursor with spring physics</p>
                </div>
                <ProBadge />
              </div>
            </div>
          </SpotlightCard>

          {/* Glow button demo */}
          <SpotlightCard className="p-8 flex flex-col justify-between min-h-[220px]">
            <div className="flex-1 flex items-center justify-center gap-3 flex-wrap">
              <button className="rounded-md bg-white px-4 py-2 text-xs font-semibold text-black transition-all hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.15)] hover:scale-[1.02]">
                Default
              </button>
              <button className="rounded-md px-4 py-2 text-xs font-semibold text-accent transition-all border border-accent-border bg-accent-dim hover:shadow-[0_0_24px_rgba(255,255,255,0.12)] hover:scale-[1.02]">
                Electric
              </button>
              <button className="rounded-md border border-border px-4 py-2 text-xs font-semibold text-text-3 hover:border-border-hover hover:text-text-1 transition-all hover:scale-[1.02]">
                Ghost
              </button>
            </div>
            <div className="mt-6 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Glow Button</p>
                  <p className="text-xs text-text-3 mt-0.5">Three variants with pulsing light</p>
                </div>
                <FreeBadge />
              </div>
            </div>
          </SpotlightCard>

          {/* Gradient card demo */}
          <SpotlightCard className="p-8 flex flex-col justify-between min-h-[220px]">
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-[220px] space-y-2">
                <div className="rounded-xl p-px" style={{ background: "linear-gradient(135deg, var(--color-surface-2), var(--color-border-hover), var(--color-surface-1))" }}>
                  <div className="rounded-[11px] bg-surface-2 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-6 w-6 rounded-full bg-accent/20" />
                      <div className="h-2 w-20 rounded bg-white/10" />
                    </div>
                    <div className="h-1.5 w-full rounded bg-white/[0.06] mb-1.5" />
                    <div className="h-1.5 w-3/4 rounded bg-white/[0.06]" />
                  </div>
                </div>
                <div className="rounded-xl p-px" style={{ background: "linear-gradient(135deg, var(--color-surface-1), var(--color-border-hover), var(--color-bg))" }}>
                  <div className="rounded-[11px] bg-surface-2 p-4">
                    <div className="h-1.5 w-full rounded bg-white/[0.06] mb-1.5" />
                    <div className="h-1.5 w-2/3 rounded bg-white/[0.06]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Gradient Card</p>
                  <p className="text-xs text-text-3 mt-0.5">Animated border gradients</p>
                </div>
                <FreeBadge />
              </div>
            </div>
          </SpotlightCard>

          {/* Particle hero preview — spans 2 cols */}
          <SpotlightCard className="md:col-span-2 p-0 overflow-hidden min-h-[240px] relative">
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, #050d14, var(--color-bg))" }}>
              {Array.from({ length: 24 }, (_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-accent"
                  style={{
                    left: `${(i * 41 + 7) % 94}%`,
                    top: `${(i * 67 + 11) % 88}%`,
                    width: i % 4 === 0 ? 3 : 2,
                    height: i % 4 === 0 ? 3 : 2,
                    opacity: 0.15 + (i % 5) * 0.07,
                    animation: `float-${i % 4} ${4 + (i % 5)}s ease-in-out ${(i * 0.4) % 3}s infinite alternate`,
                  }}
                />
              ))}
              <style>{`
                @keyframes float-0 { to { transform: translate(6px, -10px); } }
                @keyframes float-1 { to { transform: translate(-8px, 8px); } }
                @keyframes float-2 { to { transform: translate(10px, 6px); } }
                @keyframes float-3 { to { transform: translate(-5px, -12px); } }
              `}</style>
            </div>
            <div className="relative z-10 flex h-full flex-col items-center justify-center p-8 text-center">
              <ProBadge />
              <h3 className="mt-3 text-2xl font-bold tracking-tight">Particle Hero</h3>
              <p className="mt-2 text-sm text-text-3 max-w-sm">
                Full-viewport canvas particle system. Move your cursor on the live page to see it react.
              </p>
              <Link
                href="/components/particle-hero"
                className="mt-5 flex items-center gap-1.5 text-xs text-accent hover:text-text-1 transition-colors"
              >
                View component <ArrowUpRight size={12} />
              </Link>
            </div>
          </SpotlightCard>

          {/* Electric badge */}
          <SpotlightCard className="p-8 flex flex-col justify-between min-h-[220px]">
            <div className="flex-1 flex items-center justify-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-border bg-accent-dim px-3 py-1.5 text-xs text-accent">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-accent opacity-60" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                Live status
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white/[0.03] px-3 py-1.5 text-xs text-text-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-text-4)]" />
                Idle
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-60" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-red-500" />
                </span>
                Offline
              </span>
            </div>
            <div className="mt-6 border-t border-border pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Electric Badge</p>
                  <p className="text-xs text-text-3 mt-0.5">Animated pulse for status</p>
                </div>
                <FreeBadge />
              </div>
            </div>
          </SpotlightCard>

        </div>
      </div>
    </section>
    </Reveal>
  )
}

/* ─── Bento features ──────────────────────────────────────────────────────── */
function BentoFeatures() {
  return (
    <Reveal>
    <section aria-label="Features" className="py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Why ParticleUI</span>
        </div>
        <h2 className="text-center text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-16">
          Built different
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* CLI card — large */}
          <SpotlightCard className="md:col-span-7 p-8 min-h-[280px] flex flex-col justify-between">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.04] px-3 py-1.5 text-xs text-text-3">
                Zero new tools
              </div>
              <h3 className="text-2xl font-bold tracking-[-0.03em] leading-[1.25] mb-3">One command. Components land in your codebase.</h3>
              <p className="text-text-3 text-[15px] leading-[1.7]">
                No proprietary CLI, no wrapper package, no runtime imports. Components land
                directly in your codebase. Modify them, delete them, own them.
              </p>
            </div>
            <div className="mt-6 rounded-xl border border-border bg-bg p-4 font-mono text-xs">
              <span className="text-text-4">$&nbsp;</span>
              <span className="text-accent">npx particleui-cli</span>
              <span className="text-text-1"> add glow-button</span>
              <div className="mt-2 text-success-text">✓ Wrote src/components/ui/glow-button.tsx</div>
            </div>
          </SpotlightCard>

          {/* Claude skills */}
          <SpotlightCard className="md:col-span-5 p-8 min-h-[280px] flex flex-col justify-between relative overflow-hidden">
            <div
              className="absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, var(--color-accent), transparent 70%)" }}
            />
            <div>
              <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Exclusive</div>
              <h3 className="text-xl font-bold tracking-[-0.03em] leading-[1.25] mb-3">AI knows your components</h3>
              <p className="text-text-3 text-[15px] leading-[1.7]">
                Every Pro component ships a Claude skill. Your AI assistant understands
                every prop, every edge case, every customisation.
              </p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 rounded-lg bg-bg border border-border px-3 py-2">
                <Sparkle size={10} weight="fill" className="text-accent" />
                <span className="font-mono text-[10px] text-text-4">~/.claude/skills/</span>
                <span className="font-mono text-[10px] text-accent">particle-hero/</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-bg border border-border px-3 py-2">
                <Sparkle size={10} weight="fill" className="text-accent" />
                <span className="font-mono text-[10px] text-text-4">~/.claude/skills/</span>
                <span className="font-mono text-[10px] text-accent">magnetic-button/</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Multi-framework */}
          <SpotlightCard className="md:col-span-4 p-8 min-h-[200px] flex flex-col justify-between">
            <h3 className="text-lg font-bold tracking-[-0.02em] mb-2">React · Vue · Svelte</h3>
            <p className="text-text-3 text-[15px] leading-[1.65] flex-1">Same OKLCH design tokens. Three registries. One install.</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[["React", true], ["Vue", true], ["Svelte", true]].map(([fw, live]) => (
                <div
                  key={fw as string}
                  className={`rounded-lg border py-2 text-center text-xs font-medium ${
                    live
                      ? "border-border bg-white/[0.04] text-text-1"
                      : "border-white/[0.04] bg-transparent text-text-4"
                  }`}
                >
                  {fw as string}
                </div>
              ))}
            </div>
          </SpotlightCard>

          {/* MCP server */}
          <SpotlightCard className="md:col-span-4 p-8 min-h-[200px] flex flex-col justify-between">
            <h3 className="text-lg font-bold tracking-[-0.02em] mb-2">MCP server included</h3>
            <p className="text-text-3 text-[15px] leading-[1.65] flex-1">
              Let Claude search and install your components from inside any conversation.
            </p>
            <div className="mt-4 rounded-lg bg-bg border border-border px-3 py-2 font-mono text-[10px] text-text-4">
              claude mcp add <span className="text-accent">@particleui/mcp</span>
            </div>
          </SpotlightCard>

          {/* Lifetime */}
          <SpotlightCard className="md:col-span-4 p-8 min-h-[200px] flex flex-col justify-between">
            <h3 className="text-lg font-bold tracking-[-0.02em] mb-2">$149, once. Forever.</h3>
            <p className="text-text-3 text-[15px] leading-[1.65] flex-1">
              No subscription. No per-seat. Every component we ever ship, yours.
            </p>
            <Link
              href="/pricing"
              className="mt-4 flex items-center gap-1.5 text-sm font-medium text-text-1 hover:text-accent transition-colors"
            >
              See pricing <ArrowRight size={12} weight="bold" />
            </Link>
          </SpotlightCard>
        </div>
      </div>
    </section>
    </Reveal>
  )
}

/* ─── AI Features section ─────────────────────────────────────────────────── */
function AIFeatures() {
  return (
    <Reveal>
    <section aria-label="Platform features" className="py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Beyond components</span>
        </div>
        <h2 className="text-center text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-4">
          ParticleUI is a platform
        </h2>
        <p className="text-center text-text-3 leading-[1.65] mb-16 max-w-md mx-auto">
          Not just a component library. A complete UI toolkit with an AI generator, live theme studio, templates, and multi-framework support.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* AI Generator */}
          <Link href="/generate" className="group relative overflow-hidden rounded-2xl border border-border bg-surface-1 p-8 hover:border-border-hover hover:-translate-y-1 transition-all duration-200 hover:bg-surface-2">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(ellipse 60% 40% at 30% 50%, var(--color-accent-dim), transparent)" }} />
            <div className="relative">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-accent-border bg-accent-dim">
                <Robot size={18} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold tracking-[-0.03em] mb-3">AI UI Generator</h3>
              <p className="text-text-3 text-[15px] leading-[1.7] mb-6">
                Describe any page in plain English. Get a live preview assembled from real ParticleUI blocks, plus a one-command install.
              </p>
              <div className="rounded-xl border border-border bg-bg p-3 font-mono text-xs text-text-3 leading-relaxed">
                <span className="text-text-4">Prompt: </span>
                <span className="text-text-2">"A SaaS landing page for a project management tool targeting remote teams"</span>
                <div className="mt-2 text-accent text-[10px]">→ hero-split + logo-cloud + feature-alternating + pricing + faq + footer</div>
              </div>
              <div className="mt-5 flex items-center gap-1.5 text-xs text-accent group-hover:gap-2.5 transition-all">
                Try the generator <ArrowRight size={11} weight="bold" />
              </div>
            </div>
          </Link>

          {/* Theme Studio */}
          <Link href="/theme-studio" className="group relative overflow-hidden rounded-2xl border border-border bg-surface-1 p-8 hover:border-border-hover hover:-translate-y-1 transition-all duration-200 hover:bg-surface-2">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(ellipse 60% 40% at 70% 50%, var(--color-accent-dim), transparent)" }} />
            <div className="relative">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-accent-border bg-accent-dim">
                <Palette size={18} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold tracking-[-0.03em] mb-3">Live Theme Studio</h3>
              <p className="text-text-3 text-[15px] leading-[1.7] mb-6">
                Tweak OKLCH design tokens with real-time preview. Export your theme as CSS, share a registry URL, or save to your account.
              </p>
              <div className="flex gap-2 mb-4">
                {[
                  { name: "Espresso", bg: "oklch(4% 0.005 60)", accent: "oklch(96% 0.01 80)" },
                  { name: "Ocean", bg: "oklch(8% 0.01 230)", accent: "oklch(75% 0.15 200)" },
                  { name: "Forest", bg: "oklch(6% 0.01 145)", accent: "oklch(72% 0.18 145)" },
                  { name: "Cyber", bg: "oklch(5% 0.005 270)", accent: "oklch(80% 0.22 300)" },
                ].map((t) => (
                  <div key={t.name} className="flex items-center gap-1.5 rounded-lg border border-border bg-bg px-2.5 py-1.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: t.accent }} />
                    <span className="text-[10px] text-text-3">{t.name}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-1.5 text-xs text-accent group-hover:gap-2.5 transition-all">
                Open Theme Studio <ArrowRight size={11} weight="bold" />
              </div>
            </div>
          </Link>

          {/* Templates */}
          <Link href="/docs/templates/landing" className="group relative overflow-hidden rounded-2xl border border-border bg-surface-1 p-8 hover:border-border-hover hover:-translate-y-1 transition-all duration-200 hover:bg-surface-2">
            <div className="relative">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-accent-border bg-accent-dim">
                <SquaresFour size={18} className="text-accent" />
              </div>
              <h3 className="text-xl font-bold tracking-[-0.03em] mb-3">Full-page Templates</h3>
              <p className="text-text-3 text-[15px] leading-[1.7] mb-6">
                6 composed page templates — landing, SaaS dashboard, auth flow, pricing, docs, blog. Install every block in one command.
              </p>
              <div className="rounded-xl border border-border bg-bg p-3 font-mono text-xs">
                <span className="text-text-4">$</span>
                <span className="text-accent"> npx particleui-cli</span>
                <span className="text-text-1"> add landing</span>
                <div className="mt-1.5 text-success-text text-[10px]">✓ Installed 9 blocks</div>
              </div>
              <div className="mt-5 flex items-center gap-1.5 text-xs text-accent group-hover:gap-2.5 transition-all">
                Browse templates <ArrowRight size={11} weight="bold" />
              </div>
            </div>
          </Link>

          {/* Multi-framework */}
          <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-1 p-8">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-accent-border bg-accent-dim">
              <Lightning size={18} className="text-accent" />
            </div>
            <h3 className="text-xl font-bold tracking-[-0.03em] mb-3">React · Vue · Svelte</h3>
            <p className="text-text-3 text-sm leading-[1.7] mb-6">
              100+ components across React, Vue 3, and Svelte. Same API, same design tokens, same CLI install. Switch the registry URL and you're done.
            </p>
            <div className="flex flex-col gap-2">
              {["react", "vue", "svelte"].map((fw) => (
                <div key={fw} className="flex items-center justify-between rounded-lg border border-border bg-bg px-3 py-2">
                  <span className="font-mono text-[10px] text-text-2 capitalize">{fw}</span>
                  <span className="font-mono text-[10px] text-text-4">
                    /r/{fw}/{"{"}name{"}"}.json
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
    </Reveal>
  )
}

/* ─── Code section ────────────────────────────────────────────────────────── */
function CodeSection() {
  return (
    <Reveal>
    <section aria-label="Developer setup" className="py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Developer first</span>
          <h2 className="mt-3 text-[clamp(1.875rem,3.5vw,2.875rem)] font-bold tracking-[-0.04em] leading-[1.15] mb-4">
            Setup in 60 seconds.<br />
            <span className="text-text-3">Customise forever.</span>
          </h2>
          <p className="text-text-2 leading-[1.7] mb-8">
            Add the registry to your <code className="text-text-2 bg-white/[0.05] px-1.5 py-0.5 rounded text-xs">components.json</code>.
            Run the install. The source is yours — edit every line, every prop, every style.
          </p>
          <ul className="space-y-3">
            {[
              "You own every line of source code",
              "MIT licensed — use in any project",
              "TypeScript-first, full type safety",
              "No runtime deps you don't already have",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3 text-[15px] text-text-2">
                <Check size={14} weight="bold" className="text-accent shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Code block */}
        <div className="rounded-2xl border border-border overflow-hidden bg-surface-1">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <span className="font-mono text-xs text-text-4">components.json</span>
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            </div>
          </div>
          <pre className="p-5 font-mono text-xs leading-6 overflow-x-auto">
            <span className="text-text-4">{"{"}</span>{"\n"}
            <span className="text-text-3">  ...</span>{"\n"}
            <span className="text-accent">  "registries"</span>
            <span className="text-text-4">: {"{"}</span>{"\n"}
            <span className="text-text-1">    "@particleui"</span>
            <span className="text-text-4">: {"{"}</span>{"\n"}
            <span className="text-text-3">      </span>
            <span className="text-text-2">"url"</span>
            <span className="text-text-4">: </span>
            <span className="text-[#4ade80]">"https://particleui.dev/r/react/{"{"}<span className="text-accent">name</span>{"}"}.json"</span>{"\n"}
            <span className="text-text-3">      </span>
            <span className="text-text-2">"headers"</span>
            <span className="text-text-4">: {"{"}</span>{"\n"}
            <span className="text-text-3">        </span>
            <span className="text-text-2">"Authorization"</span>
            <span className="text-text-4">: </span>
            <span className="text-[#4ade80]">"Bearer ${"{"}<span className="text-accent">PARTICLEUI_TOKEN</span>{"}"}"</span>{"\n"}
            <span className="text-text-4">{"      }"}</span>{"\n"}
            <span className="text-text-4">{"    }"}</span>{"\n"}
            <span className="text-text-4">{"  }"}</span>{"\n"}
            <span className="text-text-4">{"}"}</span>
          </pre>
        </div>
      </div>
    </section>
    </Reveal>
  )
}

/* ─── Testimonials ────────────────────────────────────────────────────────── */
const REVIEWS = [
  { name: "Alex K.", role: "Frontend Lead", company: "Linear", text: "Shipped our entire dashboard redesign in a weekend. The particle hero alone is worth ten times the price.", stars: 5 },
  { name: "Maya R.", role: "Founder", company: "Indie Hacker", text: "My landing page conversion went up 40% after switching. Investors keep asking who designed it.", stars: 5 },
  { name: "Tom B.", role: "Full-stack Dev", company: "Freelance", text: "The Claude skills bundled with each component are a game changer. AI customisation just works.", stars: 5 },
  { name: "Sara J.", role: "Design Engineer", company: "Vercel", text: "I've tried every component library out there. ParticleUI is the only one I never uninstalled.", stars: 5 },
  { name: "Dev P.", role: "CTO", company: "YC S23", text: "My users literally message us to ask about our UI. I just say 'ParticleUI' and they go look it up.", stars: 5 },
  { name: "Chris W.", role: "Product Engineer", company: "Stripe", text: "Vue + Svelte support sealed it. My work project (React) and side project (Vue) both use it now.", stars: 5 },
]

function Testimonials() {
  return (
    <Reveal>
    <section aria-label="Testimonials" className="py-24 px-6 border-t border-border overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={14} weight="fill" className="text-accent" />
          ))}
        </div>
        <p className="text-center text-text-4 text-sm mb-4">5.0 · Loved by 500+ developers</p>
        <h2 className="text-center text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-16">
          Loved by builders
        </h2>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="break-inside-avoid rounded-2xl border border-border bg-surface-1 p-6"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <Star key={i} size={11} weight="fill" className="text-accent" />
                ))}
              </div>
              <p className="text-[15px] text-text-2 leading-relaxed mb-5">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-2 border border-border text-xs font-bold text-text-2">
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-1">{r.name}</p>
                  <p className="text-xs text-text-4">{r.role} · {r.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </Reveal>
  )
}

/* ─── Pricing preview ─────────────────────────────────────────────────────── */
function Pricing() {
  const pro = [
    "50+ components, forever", "React + Vue + Svelte registries",
    "Full page blocks & templates", "Bundled Claude skills per component",
    "ParticleUI MCP server", "Lifetime updates", "Priority support",
  ]

  return (
    <Reveal>
    <section aria-label="Pricing" className="py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">Pricing</span>
        </div>
        <h2 className="text-center text-[clamp(2rem,4vw,3.25rem)] font-bold tracking-[-0.04em] leading-[1.1] mb-4">
          One price. Everything. Forever.
        </h2>
        <p className="text-center text-text-3 mb-12">No subscriptions. No per-seat. No games.</p>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Free */}
          <SpotlightCard className="p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-3 mb-1">Free</p>
            <div className="flex items-end gap-1.5 mb-1">
              <span className="text-5xl font-bold">$0</span>
            </div>
            <p className="text-sm text-text-3 mb-6">Free components, always free.</p>
            <Link
              href="/sign-up"
              className="block w-full rounded-xl border border-border py-3 text-center text-sm font-medium text-text-2 hover:text-text-1 hover:border-border-hover transition-all mb-6"
            >
              Get started
            </Link>
            <p className="text-xs text-text-4 mb-3 uppercase tracking-widest">Includes</p>
            <ul className="space-y-2.5">
              {["55+ core primitives (MIT)", "36 particle effects", "20 full-page blocks", "particleui-cli included", "Community support"].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-text-2">
                  <Check size={13} weight="bold" className="text-text-3 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </SpotlightCard>

          {/* Pro */}
          <div className="relative rounded-2xl border border-accent-border bg-surface-1 p-8 overflow-hidden">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, var(--color-accent), transparent)" }}
            />
            <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-1">Pro</p>
            <div className="flex items-end gap-1.5 mb-1">
              <span className="text-5xl font-bold">$149</span>
              <span className="text-text-4 text-sm mb-2">one-time</span>
            </div>
            <p className="text-sm text-text-3 mb-6">Lifetime access. No expiry.</p>
            <Link
              href="/sign-up?plan=pro"
              className="block w-full rounded-xl bg-white py-3 text-center text-sm font-semibold text-black hover:bg-gray-200 transition-colors mb-6"
            >
              Buy lifetime access →
            </Link>
            <p className="text-xs text-text-4 mb-3 uppercase tracking-widest">Everything in Free, plus</p>
            <ul className="space-y-2.5">
              {pro.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-[15px] text-text-2">
                  <Check size={13} weight="bold" className="text-accent shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
    </Reveal>
  )
}

/* ─── Bottom CTA ──────────────────────────────────────────────────────────── */
/* ─── FAQ ─────────────────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: "Is this really a one-time payment?",
    a: "Yes. $149 once, yours forever. No monthly fees, no renewal reminders. Every component added in the future is included.",
  },
  {
    q: "How is this different from shadcn/ui?",
    a: "shadcn/ui gives you great primitives. ParticleUI adds the particle and animation layer, full-page blocks, OKLCH design tokens, and native Vue + Svelte registries — all with a strong visual identity out of the box.",
  },
  {
    q: "Do components work with my existing stack?",
    a: "Yes. Components install as source files into your project — no runtime package, no version lock-in. They work alongside anything else in your codebase.",
  },
  {
    q: "What frameworks are supported?",
    a: "React, Vue 3, and Svelte 5 — all native implementations, not ports. The CLI auto-detects your framework.",
  },
  {
    q: "What if I need a refund?",
    a: "14-day no-questions-asked refund. Email us within 14 days of purchase and you'll get a full refund.",
  },
  {
    q: "Can I use Pro components on client projects?",
    a: "Yes. One Pro license covers unlimited personal and commercial projects. Components land in your codebase — your client never needs to know or pay.",
  },
]

function FAQ() {
  return (
    <Reveal>
      <section aria-label="FAQ" className="py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-3xl">
          <div className="mb-12 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent mb-3">FAQ</p>
            <h2 className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold tracking-[-0.04em] leading-[1.1]">
              Common questions
            </h2>
          </div>
          <dl className="space-y-0 divide-y divide-border">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="py-6">
                <dt className="text-[15px] font-semibold text-text-1 mb-2">{q}</dt>
                <dd className="text-[15px] text-text-2 leading-[1.7]">{a}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 text-center">
            <p className="text-sm text-text-3">
              Still have questions?{" "}
              <Link href="/docs/getting-started/installation" className="text-accent hover:underline">
                Read the docs
              </Link>{" "}
              or{" "}
              <a href="mailto:hello@particleui.dev" className="text-accent hover:underline">
                email us
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </Reveal>
  )
}

/* ─── Bottom CTA ──────────────────────────────────────────────────────────── */
function BottomCTA() {
  return (
    <section aria-label="Get started" className="relative overflow-hidden py-40 px-6 border-t border-border">
      <HeroCanvas />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, var(--color-bg) 80%)" }}
      />
      <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.96] tracking-[-0.05em] mb-6">
          Your users deserve
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #fff 0%, #d4cfc8 50%, #fff 100%)",
              backgroundSize: "200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            the best UI alive
          </span>
        </h2>
        <p className="text-text-2 text-lg leading-[1.7] mb-10">
          Start with free components today. Upgrade when you&apos;re ready to blow minds.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/sign-up"
            className="flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-black hover:bg-gray-200 hover:scale-[1.03] active:scale-[0.98] transition-all duration-150"
          >
            Start building free
            <ArrowRight size={14} weight="bold" />
          </Link>
          <Link
            href="/pricing"
            className="flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-8 py-4 text-sm font-medium text-text-3 hover:text-text-1 hover:border-border-hover transition-all backdrop-blur-sm"
          >
            See pricing <ArrowUpRight size={13} />
          </Link>
        </div>
      </Reveal>
    </section>
  )
}

/* ─── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold">
          <Sparkle weight="fill" size={14} className="text-accent" />
          ParticleUI
        </Link>
        <nav className="flex items-center gap-6 text-xs text-text-4">
          {["Components", "Docs", "Pricing", "Dashboard", "Blog"].map((l) => (
            <Link key={l} href={`/${l.toLowerCase()}`} className="hover:text-text-2 transition-colors">
              {l}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-text-4">© {new Date().getFullYear()} ParticleUI</p>
      </div>
    </footer>
  )
}

/* ─── Badges ──────────────────────────────────────────────────────────────── */
function ProBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-accent-border bg-accent-dim px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-accent">
      <Sparkle size={8} weight="fill" />Pro
    </span>
  )
}

function FreeBadge() {
  return (
    <span className="inline-flex rounded-full border border-border bg-white/[0.03] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-text-4">
      Free
    </span>
  )
}
