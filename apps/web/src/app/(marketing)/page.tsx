import Link from "next/link"
import { ElectricBadge } from "@/components/ui/electric-badge"

export default function HomePage() {
  return (
    <main className="min-h-svh bg-particle-950 text-white">
      <Nav />
      <Hero />
      <Features />
      <ComponentShowcase />
      <CTA />
      <Footer />
    </main>
  )
}

function Nav() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-particle-800/50 bg-particle-950/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-bold text-lg tracking-tight">
          <span className="text-electric-400">Particle</span>UI
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-particle-300">
          <Link href="/components" className="hover:text-white transition-colors">Components</Link>
          <Link href="/docs" className="hover:text-white transition-colors">Docs</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm text-particle-300 hover:text-white transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-md bg-electric-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-electric-400 transition-colors shadow-[0_0_16px_oklch(68%_0.27_205_/_0.3)]"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden pt-14">
      {/* Static gradient background — particle canvas added in Phase 3 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,oklch(52%_0.24_265_/_0.3),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_30%_at_60%_80%,oklch(68%_0.27_205_/_0.15),transparent)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <ElectricBadge className="mb-6 inline-flex">
          shadcn-compatible · no CLI to install
        </ElectricBadge>
        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          Beautiful components
          <br />
          <span className="bg-gradient-to-r from-electric-400 via-particle-300 to-electric-500 bg-clip-text text-transparent">
            built for motion
          </span>
        </h1>
        <p className="mt-6 text-lg text-particle-300 max-w-2xl mx-auto">
          Premium animated components on top of shadcn/ui. Particles, glows, and complex UI
          blocks — installed with one command into your existing project.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/components"
            className="rounded-md bg-electric-500 px-6 py-3 font-medium text-white hover:bg-electric-400 transition-all shadow-[0_0_20px_oklch(68%_0.27_205_/_0.4)] hover:shadow-[0_0_30px_oklch(68%_0.27_205_/_0.6)]"
          >
            Browse components
          </Link>
          <Link
            href="/docs"
            className="rounded-md border border-particle-700 px-6 py-3 font-medium text-particle-300 hover:bg-particle-900 hover:text-white transition-colors"
          >
            Read docs →
          </Link>
        </div>

        <div className="mt-16 font-mono text-sm text-particle-500 bg-particle-900/50 border border-particle-800 rounded-lg p-4 max-w-lg mx-auto text-left">
          <span className="text-particle-600">$</span>{" "}
          <span className="text-electric-400">npx</span>{" "}
          <span className="text-white">shadcn add @particleui/particle-hero</span>
        </div>
      </div>
    </section>
  )
}

function Features() {
  const items = [
    {
      icon: "⚡",
      title: "shadcn-native",
      body: "Installs into your existing project via `npx shadcn add`. No separate CLI or build step. You own the source.",
    },
    {
      icon: "✦",
      title: "Motion-first",
      body: "Every component is built with animation as a first-class concern — canvas particles, spring physics, magnetic interactions.",
    },
    {
      icon: "🤖",
      title: "Claude skills bundled",
      body: "Pro components ship with a Claude skill so AI assistants understand exactly how to customize them.",
    },
    {
      icon: "🌐",
      title: "React · Vue · Svelte",
      body: "The same components across all three frameworks from a single design token source.",
    },
  ]

  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold mb-12">Why ParticleUI?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-particle-800 bg-particle-900/50 p-6"
            >
              <div className="mb-3 text-2xl">{item.icon}</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-particle-400">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ComponentShowcase() {
  const components = [
    { name: "particle-hero", label: "Particle Hero", tier: "pro" },
    { name: "glow-button", label: "Glow Button", tier: "free" },
    { name: "gradient-card", label: "Gradient Card", tier: "free" },
    { name: "electric-badge", label: "Electric Badge", tier: "free" },
    { name: "magnetic-button", label: "Magnetic Button", tier: "pro" },
    { name: "aurora-background", label: "Aurora Background", tier: "pro" },
  ]

  return (
    <section className="py-24 px-6 border-t border-particle-800/50">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">Components</h2>
          <Link href="/components" className="text-sm text-electric-400 hover:text-electric-300">
            View all →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {components.map((c) => (
            <Link
              key={c.name}
              href={`/components/${c.name}`}
              className="group flex items-center justify-between rounded-lg border border-particle-800 bg-particle-900/30 px-5 py-4 hover:border-electric-500/50 hover:bg-particle-900/70 transition-all"
            >
              <span className="font-mono text-sm text-particle-300 group-hover:text-white transition-colors">
                {c.name}
              </span>
              {c.tier === "pro" ? (
                <span className="text-xs rounded-full bg-electric-500/10 border border-electric-500/30 text-electric-400 px-2 py-0.5">
                  Pro
                </span>
              ) : (
                <span className="text-xs rounded-full bg-particle-800 text-particle-400 px-2 py-0.5">
                  Free
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-4">
          Ready to ship faster?
        </h2>
        <p className="text-particle-400 mb-8">
          Start free. Upgrade when you need premium components.
        </p>
        <Link
          href="/sign-up"
          className="inline-block rounded-md bg-electric-500 px-8 py-3 font-medium text-white hover:bg-electric-400 transition-all shadow-[0_0_24px_oklch(68%_0.27_205_/_0.4)] hover:shadow-[0_0_36px_oklch(68%_0.27_205_/_0.6)]"
        >
          Get started free
        </Link>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-particle-800/50 py-10 px-6 text-center text-sm text-particle-600">
      <p>
        © {new Date().getFullYear()} ParticleUI. Built on{" "}
        <a href="https://ui.shadcn.com" className="hover:text-particle-400 underline underline-offset-2">
          shadcn/ui
        </a>
        .
      </p>
    </footer>
  )
}
