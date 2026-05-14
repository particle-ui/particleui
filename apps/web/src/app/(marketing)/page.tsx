import Link from "next/link"
import { ArrowRight, Sparkle, ArrowUpRight, Star, Check } from "@phosphor-icons/react/dist/ssr"
import { HeroCanvas } from "./_components/hero-canvas"
import { SpotlightCard } from "./_components/spotlight-card"
import { Marquee } from "./_components/marquee"
import { MagneticDemo } from "./_components/magnetic-demo"

export default function HomePage() {
  return (
    <div
      className="bg-[#030303] text-white min-h-svh"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
      }}
    >
      <Nav />
      <Hero />
      <Marquee />
      <LiveDemo />
      <BentoFeatures />
      <CodeSection />
      <Testimonials />
      <Pricing />
      <BottomCTA />
      <Footer />
    </div>
  )
}

/* ─── Nav ─────────────────────────────────────────────────────────────────── */
function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-sm tracking-tight">
          <Sparkle weight="fill" size={16} className="text-[#00d4ff]" />
          ParticleUI
        </Link>

        {/* Center pill nav */}
        <nav className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-0.5 rounded-full border border-white/[0.08] bg-[#0a0a0a]/90 px-2 py-2 backdrop-blur-xl">
          {["Components", "Docs", "Pricing", "Blog"].map((l) => (
            <Link
              key={l}
              href={`/${l.toLowerCase()}`}
              className="rounded-full px-4 py-1.5 text-sm text-[#555] hover:text-white hover:bg-white/[0.06] transition-all duration-150"
            >
              {l}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <Link href="/sign-in" className="text-sm text-[#444] hover:text-white transition-colors">
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-[#e2e2e2] transition-colors"
          >
            Get started free
          </Link>
        </div>
      </div>
    </header>
  )
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
      {/* Live particle canvas */}
      <HeroCanvas />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,transparent_30%,#030303_100%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center pt-20">
        {/* Eyebrow pill */}
        <Link
          href="/components"
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-[#0a0a0a]/80 px-4 py-2 text-xs text-[#666] hover:text-[#aaa] transition-colors backdrop-blur-sm"
        >
          <span className="flex h-1.5 w-1.5 rounded-full bg-[#00d4ff] relative">
            <span className="animate-ping absolute inset-0 rounded-full bg-[#00d4ff] opacity-60" />
          </span>
          50+ components — React · Vue · Svelte
          <ArrowRight size={10} weight="bold" />
        </Link>

        {/* Headline */}
        <h1 className="text-[clamp(3.2rem,7.5vw,6rem)] font-bold leading-[0.96] tracking-[-0.05em] mb-6">
          Components so good
          <br />
          <span
            className="inline-block"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #888888 40%, #00d4ff 70%, #ffffff 100%)",
              backgroundSize: "200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            your users stop scrolling
          </span>
        </h1>

        <p className="mx-auto max-w-lg text-[1.1rem] text-[#444] leading-relaxed mb-10">
          Premium animated components built on shadcn/ui. Particles, magnetic
          interactions, aurora effects. One command to install. Yours forever.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <Link
            href="/components"
            className="group flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black hover:bg-[#e2e2e2] transition-all shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
          >
            Browse components
            <ArrowRight size={13} weight="bold" className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/docs"
            className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-[#777] hover:text-white hover:border-white/20 transition-all backdrop-blur-sm"
          >
            Read the docs
          </Link>
        </div>

        {/* Terminal */}
        <div
          className="mx-auto max-w-md overflow-hidden rounded-2xl border border-white/[0.07]"
          style={{ background: "linear-gradient(145deg, #0f0f0f, #080808)" }}
        >
          <div className="flex items-center gap-2 border-b border-white/[0.05] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-auto font-mono text-xs text-[#333]">bash</span>
          </div>
          <div className="px-5 py-4 font-mono text-sm text-left">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#333]">$</span>
              <span className="text-[#00d4ff]">npx shadcn</span>
              <span className="text-white">add @particleui/particle-hero</span>
            </div>
            <div className="text-[#2a5c2a] mt-2 text-xs pl-4">
              ✓ Resolved @particleui/particle-hero<br />
              ✓ Installing dependencies...<br />
              ✓ Wrote components/blocks/particle-hero.tsx<br />
              <span className="text-[#00d4ff]/50">✓ Installed Claude skill → ~/.claude/skills/particle-hero/</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030303] to-transparent" />
    </section>
  )
}

/* ─── Live demo section ───────────────────────────────────────────────────── */
function LiveDemo() {
  return (
    <section className="py-32 px-6 relative">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00d4ff]">
            Live preview
          </span>
        </div>
        <h2 className="text-center text-[clamp(2rem,4vw,3.5rem)] font-bold tracking-[-0.04em] mb-4">
          See them move
        </h2>
        <p className="text-center text-[#444] mb-16 max-w-md mx-auto">
          These are real components running in the browser. Hover, click, interact.
        </p>

        {/* Demo grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Magnetic button demo */}
          <SpotlightCard className="p-8 flex flex-col justify-between min-h-[220px]">
            <div className="flex-1 flex items-center justify-center">
              <MagneticDemo />
            </div>
            <div className="mt-6 border-t border-white/[0.05] pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Magnetic Button</p>
                  <p className="text-xs text-[#444] mt-0.5">Follows your cursor with spring physics</p>
                </div>
                <ProBadge />
              </div>
            </div>
          </SpotlightCard>

          {/* Glow button demo */}
          <SpotlightCard className="p-8 flex flex-col justify-between min-h-[220px]">
            <div className="flex-1 flex items-center justify-center gap-3 flex-wrap">
              <button className="rounded-md bg-white px-4 py-2 text-xs font-semibold text-black transition-all hover:shadow-[0_0_20px_4px_rgba(255,255,255,0.15)] hover:scale-105">
                Default
              </button>
              <button className="rounded-md px-4 py-2 text-xs font-semibold text-[#00d4ff] transition-all border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] hover:shadow-[0_0_24px_rgba(0,212,255,0.35)] hover:scale-105">
                Electric
              </button>
              <button className="rounded-md border border-white/20 px-4 py-2 text-xs font-semibold text-[#666] hover:border-white/40 hover:text-white transition-all hover:scale-105">
                Ghost
              </button>
            </div>
            <div className="mt-6 border-t border-white/[0.05] pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Glow Button</p>
                  <p className="text-xs text-[#444] mt-0.5">Three variants with pulsing light</p>
                </div>
                <FreeBadge />
              </div>
            </div>
          </SpotlightCard>

          {/* Gradient card demo */}
          <SpotlightCard className="p-8 flex flex-col justify-between min-h-[220px]">
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-[220px] space-y-2">
                <div className="rounded-xl p-px" style={{ background: "linear-gradient(135deg, #222, #00d4ff22, #111)" }}>
                  <div className="rounded-[11px] bg-[#0d0d0d] p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="h-6 w-6 rounded-full bg-[#00d4ff]/20" />
                      <div className="h-2 w-20 rounded bg-white/10" />
                    </div>
                    <div className="h-1.5 w-full rounded bg-white/[0.06] mb-1.5" />
                    <div className="h-1.5 w-3/4 rounded bg-white/[0.06]" />
                  </div>
                </div>
                <div className="rounded-xl p-px" style={{ background: "linear-gradient(135deg, #111, #ffffff15, #0a0a0a)" }}>
                  <div className="rounded-[11px] bg-[#0d0d0d] p-4">
                    <div className="h-1.5 w-full rounded bg-white/[0.06] mb-1.5" />
                    <div className="h-1.5 w-2/3 rounded bg-white/[0.06]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 border-t border-white/[0.05] pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Gradient Card</p>
                  <p className="text-xs text-[#444] mt-0.5">Animated border gradients</p>
                </div>
                <FreeBadge />
              </div>
            </div>
          </SpotlightCard>

          {/* Particle hero preview — spans 2 cols */}
          <SpotlightCard className="md:col-span-2 p-0 overflow-hidden min-h-[240px] relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#050d14] to-[#030303]">
              {/* Static animated dots */}
              {Array.from({ length: 24 }, (_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-[#00d4ff]"
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
              <p className="mt-2 text-sm text-[#444] max-w-sm">
                Full-viewport canvas particle system. Move your cursor on the live page to see it react.
              </p>
              <Link
                href="/components/particle-hero"
                className="mt-5 flex items-center gap-1.5 text-xs text-[#00d4ff] hover:text-white transition-colors"
              >
                View component <ArrowUpRight size={12} />
              </Link>
            </div>
          </SpotlightCard>

          {/* Electric badge */}
          <SpotlightCard className="p-8 flex flex-col justify-between min-h-[220px]">
            <div className="flex-1 flex items-center justify-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] px-3 py-1.5 text-xs text-[#00d4ff]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-[#00d4ff] opacity-60" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-[#00d4ff]" />
                </span>
                Live status
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-[#555]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#444]" />
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
            <div className="mt-6 border-t border-white/[0.05] pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">Electric Badge</p>
                  <p className="text-xs text-[#444] mt-0.5">Animated pulse for status</p>
                </div>
                <FreeBadge />
              </div>
            </div>
          </SpotlightCard>

        </div>
      </div>
    </section>
  )
}

/* ─── Bento features ──────────────────────────────────────────────────────── */
function BentoFeatures() {
  return (
    <section className="py-24 px-6 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#555]">Why ParticleUI</span>
        </div>
        <h2 className="text-center text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.04em] mb-16">
          Built different
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Shadcn native — large */}
          <SpotlightCard className="md:col-span-7 p-8 min-h-[280px] flex flex-col justify-between">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1.5 text-xs text-[#555]">
                Zero new tools
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-3">Works with the shadcn CLI you already know</h3>
              <p className="text-[#444] text-sm leading-relaxed">
                No proprietary CLI, no wrapper package, no runtime imports. Components land
                directly in your codebase. Modify them, delete them, own them.
              </p>
            </div>
            <div className="mt-6 rounded-xl border border-white/[0.06] bg-[#030303] p-4 font-mono text-xs">
              <span className="text-[#333]">$&nbsp;</span>
              <span className="text-[#00d4ff]">npx shadcn</span>
              <span className="text-white"> add @particleui/glow-button</span>
              <div className="mt-2 text-[#2a5c2a]">✓ Wrote src/components/ui/glow-button.tsx</div>
            </div>
          </SpotlightCard>

          {/* Claude skills */}
          <SpotlightCard className="md:col-span-5 p-8 min-h-[280px] flex flex-col justify-between relative overflow-hidden">
            <div
              className="absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #00d4ff, transparent 70%)" }}
            />
            <div>
              <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-[#00d4ff]">Exclusive</div>
              <h3 className="text-xl font-bold mb-3">AI knows your components</h3>
              <p className="text-[#444] text-sm leading-relaxed">
                Every Pro component ships a Claude skill. Your AI assistant understands
                every prop, every edge case, every customisation.
              </p>
            </div>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 rounded-lg bg-[#030303] border border-white/[0.05] px-3 py-2">
                <Sparkle size={10} weight="fill" className="text-[#00d4ff]" />
                <span className="font-mono text-[10px] text-[#333]">~/.claude/skills/</span>
                <span className="font-mono text-[10px] text-[#00d4ff]">particle-hero/</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-[#030303] border border-white/[0.05] px-3 py-2">
                <Sparkle size={10} weight="fill" className="text-[#00d4ff]" />
                <span className="font-mono text-[10px] text-[#333]">~/.claude/skills/</span>
                <span className="font-mono text-[10px] text-[#00d4ff]">magnetic-button/</span>
              </div>
            </div>
          </SpotlightCard>

          {/* Multi-framework */}
          <SpotlightCard className="md:col-span-4 p-8 min-h-[200px] flex flex-col justify-between">
            <h3 className="text-lg font-bold mb-2">React · Vue · Svelte</h3>
            <p className="text-[#444] text-sm flex-1">Same design tokens. Three registries. One purchase.</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[["React", true], ["Vue", false], ["Svelte", false]].map(([fw, live]) => (
                <div
                  key={fw as string}
                  className={`rounded-lg border py-2 text-center text-xs font-medium ${
                    live
                      ? "border-white/[0.1] bg-white/[0.04] text-white"
                      : "border-white/[0.04] bg-transparent text-[#333]"
                  }`}
                >
                  {fw as string}
                </div>
              ))}
            </div>
          </SpotlightCard>

          {/* MCP server */}
          <SpotlightCard className="md:col-span-4 p-8 min-h-[200px] flex flex-col justify-between">
            <h3 className="text-lg font-bold mb-2">MCP server included</h3>
            <p className="text-[#444] text-sm flex-1">
              Let Claude search and install your components from inside any conversation.
            </p>
            <div className="mt-4 rounded-lg bg-[#030303] border border-white/[0.05] px-3 py-2 font-mono text-[10px] text-[#444]">
              claude mcp add <span className="text-[#00d4ff]">@particleui/mcp</span>
            </div>
          </SpotlightCard>

          {/* Lifetime */}
          <SpotlightCard className="md:col-span-4 p-8 min-h-[200px] flex flex-col justify-between">
            <h3 className="text-lg font-bold mb-2">$149, once. Forever.</h3>
            <p className="text-[#444] text-sm flex-1">
              No subscription. No per-seat. Every component we ever ship, yours.
            </p>
            <Link
              href="/pricing"
              className="mt-4 flex items-center gap-1.5 text-sm font-medium text-white hover:text-[#00d4ff] transition-colors"
            >
              See pricing <ArrowRight size={12} weight="bold" />
            </Link>
          </SpotlightCard>
        </div>
      </div>
    </section>
  )
}

/* ─── Code section ────────────────────────────────────────────────────────── */
function CodeSection() {
  return (
    <section className="py-24 px-6 border-t border-white/[0.05]">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#555]">Developer first</span>
          <h2 className="mt-3 text-[clamp(1.8rem,3.5vw,2.8rem)] font-bold tracking-[-0.04em] mb-4">
            Setup in 60 seconds.<br />
            <span className="text-[#444]">Customise forever.</span>
          </h2>
          <p className="text-[#444] leading-relaxed mb-8">
            Add the registry to your <code className="text-[#888] bg-white/[0.04] px-1.5 py-0.5 rounded text-xs">components.json</code>.
            Run the install. The source is yours — edit every line, every prop, every style.
          </p>
          <ul className="space-y-3">
            {[
              "Works with your existing shadcn setup",
              "MIT licensed — use in any project",
              "TypeScript-first, full type safety",
              "No runtime deps you don't already have",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-[#666]">
                <Check size={14} weight="bold" className="text-[#00d4ff] shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Code block */}
        <div className="rounded-2xl border border-white/[0.07] overflow-hidden" style={{ background: "#0b0b0b" }}>
          <div className="flex items-center justify-between border-b border-white/[0.05] px-5 py-3">
            <span className="font-mono text-xs text-[#333]">components.json</span>
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            </div>
          </div>
          <pre className="p-5 font-mono text-xs leading-6 overflow-x-auto">
            <span className="text-[#333]">{"{"}</span>{"\n"}
            <span className="text-[#555]">  ...</span>{"\n"}
            <span className="text-[#00d4ff]">  "registries"</span>
            <span className="text-[#333]">: {"{"}</span>{"\n"}
            <span className="text-white">    "@particleui"</span>
            <span className="text-[#333]">: {"{"}</span>{"\n"}
            <span className="text-[#555]">      </span>
            <span className="text-[#888]">"url"</span>
            <span className="text-[#333]">: </span>
            <span className="text-[#4ade80]">"https://particleui.dev/r/react/{"{"}<span className="text-[#00d4ff]">name</span>{"}"}.json"</span>{"\n"}
            <span className="text-[#555]">      </span>
            <span className="text-[#888]">"headers"</span>
            <span className="text-[#333]">: {"{"}</span>{"\n"}
            <span className="text-[#555]">        </span>
            <span className="text-[#888]">"Authorization"</span>
            <span className="text-[#333]">: </span>
            <span className="text-[#4ade80]">"Bearer ${"{"}<span className="text-[#00d4ff]">PARTICLEUI_TOKEN</span>{"}"}"</span>{"\n"}
            <span className="text-[#333]">{"      }"}</span>{"\n"}
            <span className="text-[#333]">{"    }"}</span>{"\n"}
            <span className="text-[#333]">{"  }"}</span>{"\n"}
            <span className="text-[#333]">{"}"}</span>
          </pre>
        </div>
      </div>
    </section>
  )
}

/* ─── Testimonials ────────────────────────────────────────────────────────── */
const REVIEWS = [
  { name: "Alex K.", role: "Frontend Lead @ Linear", text: "Shipped our entire dashboard redesign in a weekend. The particle hero alone is worth ten times the price." },
  { name: "Maya R.", role: "Indie Hacker", text: "My landing page conversion went up 40% after switching. Investors keep asking who designed it." },
  { name: "Tom B.", role: "Full-stack Dev", text: "The Claude skills bundled with each component are a game changer. AI customisation just works." },
  { name: "Sara J.", role: "Design Engineer", text: "I've tried every shadcn extension. ParticleUI is the only one I never uninstalled." },
  { name: "Dev P.", role: "Startup CTO", text: "My users literally message us to ask about our UI. I just say 'ParticleUI' and they go look it up." },
  { name: "Chris W.", role: "Product Engineer", text: "Vue + Svelte support sealed it. My work project (React) and side project (Vue) both use it now." },
]

function Testimonials() {
  return (
    <section className="py-24 px-6 border-t border-white/[0.05] overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} weight="fill" className="text-[#00d4ff]" />
          ))}
          <span className="ml-2 text-xs text-[#444]">5.0 from 200+ developers</span>
        </div>
        <h2 className="text-center text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.04em] mb-16">
          Loved by builders
        </h2>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {REVIEWS.map((r) => (
            <div
              key={r.name}
              className="break-inside-avoid rounded-2xl border border-white/[0.07] bg-[#0a0a0a] p-6"
            >
              <p className="text-sm text-[#777] leading-relaxed mb-5">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#111] text-xs font-bold text-[#555]">
                  {r.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium">{r.name}</p>
                  <p className="text-xs text-[#444]">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
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
    <section className="py-24 px-6 border-t border-white/[0.05]">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#555]">Pricing</span>
        </div>
        <h2 className="text-center text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.04em] mb-4">
          One price. Everything. Forever.
        </h2>
        <p className="text-center text-[#444] mb-12">No subscriptions. No per-seat. No games.</p>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Free */}
          <SpotlightCard className="p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#444] mb-1">Free</p>
            <div className="flex items-end gap-1.5 mb-1">
              <span className="text-5xl font-bold">$0</span>
            </div>
            <p className="text-sm text-[#444] mb-6">Free components, always free.</p>
            <Link
              href="/sign-up"
              className="block w-full rounded-xl border border-white/[0.1] py-3 text-center text-sm font-medium text-[#666] hover:text-white hover:border-white/20 transition-all mb-6"
            >
              Get started
            </Link>
            <p className="text-xs text-[#333] mb-3 uppercase tracking-widest">Includes</p>
            <ul className="space-y-2.5">
              {["Glow Button", "Gradient Card", "Electric Badge", "Noise Texture", "Community support"].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-[#555]">
                  <Check size={13} weight="bold" className="text-[#333] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </SpotlightCard>

          {/* Pro */}
          <div className="relative rounded-2xl border border-[rgba(0,212,255,0.2)] bg-[#0a0a0a] p-8 overflow-hidden">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, #00d4ff, transparent)" }}
            />
            <p className="text-xs font-semibold uppercase tracking-widest text-[#00d4ff] mb-1">Pro</p>
            <div className="flex items-end gap-1.5 mb-1">
              <span className="text-5xl font-bold">$149</span>
              <span className="text-[#444] text-sm mb-2">one-time</span>
            </div>
            <p className="text-sm text-[#444] mb-6">Lifetime access. No expiry.</p>
            <Link
              href="/sign-up?plan=pro"
              className="block w-full rounded-xl bg-white py-3 text-center text-sm font-semibold text-black hover:bg-[#e2e2e2] transition-colors mb-6"
            >
              Buy lifetime access →
            </Link>
            <p className="text-xs text-[#333] mb-3 uppercase tracking-widest">Everything in Free, plus</p>
            <ul className="space-y-2.5">
              {pro.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-[#888]">
                  <Check size={13} weight="bold" className="text-[#00d4ff] shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Bottom CTA ──────────────────────────────────────────────────────────── */
function BottomCTA() {
  return (
    <section className="relative overflow-hidden py-40 px-6 border-t border-white/[0.05]">
      <HeroCanvas />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,transparent_20%,#030303_80%)]" />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.96] tracking-[-0.05em] mb-6">
          Your users deserve
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #fff 0%, #00d4ff 50%, #fff 100%)",
              backgroundSize: "200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            the best UI alive
          </span>
        </h2>
        <p className="text-[#444] text-lg mb-10">
          Start with free components today. Upgrade when you&apos;re ready to blow minds.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/sign-up"
            className="flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-black hover:bg-[#e2e2e2] transition-colors"
          >
            Start building free
            <ArrowRight size={14} weight="bold" />
          </Link>
          <Link
            href="/pricing"
            className="flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.03] px-8 py-4 text-sm font-medium text-[#666] hover:text-white hover:border-white/20 transition-all backdrop-blur-sm"
          >
            See pricing <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ──────────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/[0.05] px-6 py-10">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold">
          <Sparkle weight="fill" size={14} className="text-[#00d4ff]" />
          ParticleUI
        </Link>
        <nav className="flex items-center gap-6 text-xs text-[#333]">
          {["Components", "Docs", "Pricing", "Dashboard", "Blog"].map((l) => (
            <Link key={l} href={`/${l.toLowerCase()}`} className="hover:text-[#666] transition-colors">
              {l}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-[#222]">© {new Date().getFullYear()} ParticleUI</p>
      </div>
    </footer>
  )
}

/* ─── Badges ──────────────────────────────────────────────────────────────── */
function ProBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(0,212,255,0.3)] bg-[rgba(0,212,255,0.08)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#00d4ff]">
      <Sparkle size={8} weight="fill" />Pro
    </span>
  )
}

function FreeBadge() {
  return (
    <span className="inline-flex rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-[#333]">
      Free
    </span>
  )
}
