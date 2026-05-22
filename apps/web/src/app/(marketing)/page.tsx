import type { Metadata } from "next"
import Link from "next/link"
import { SparkleIcon, ArrowRightIcon, TerminalIcon, CodeIcon, PuzzlePieceIcon } from "@phosphor-icons/react/dist/ssr"
import { HeroCanvas } from "./_components/hero-canvas"
import { Marquee } from "./_components/marquee"
import { Nav } from "./_components/nav"

export const metadata: Metadata = {
  title: "ParticleUI — Open source UI components for React, Vue & Svelte",
  description:
    "MIT licensed shadcn-compatible components. Install with one command — source lands directly in your repo. No account, no token, no runtime package.",
  openGraph: {
    title: "ParticleUI — Open source UI components",
    description:
      "MIT licensed shadcn-compatible components for React, Vue & Svelte. Install with one command.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ParticleUI — Open source UI components",
    description: "MIT licensed components. Install with one command.",
    images: ["/opengraph-image"],
  },
}

export default function HomePage() {
  return (
    <div className="bg-bg text-text-1 min-h-svh">
      <Nav />
      <Hero />
      <Marquee />
      <Features />
      <Categories />
      <Install />
      <Footer />
    </div>
  )
}

/* ─── Hero ────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="main-content"
      tabIndex={-1}
      aria-label="Hero"
      className="relative flex min-h-svh items-center justify-center overflow-hidden outline-none"
    >
      <HeroCanvas />

      {/* vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, var(--color-bg) 100%)" }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center pt-20">
        {/* headline */}
        <h1
          className="mb-6 leading-[1.05]"
          style={{
            fontWeight: 800,
            fontSize: "clamp(2.75rem, 7vw, 5rem)",
            letterSpacing: "-0.05em",
          }}
        >
          UI components you own.
          <br />
          <span className="text-text-3">Copy, install, done.</span>
        </h1>

        {/* sub */}
        <p
          className="mx-auto mb-10 text-text-2"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            lineHeight: 1.7,
            fontWeight: 300,
            maxWidth: "52ch",
          }}
        >
          shadcn-compatible components for React, Vue &amp; Svelte. Source code
          lands directly in your repo — no runtime package, no account needed.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/components"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-bg transition-all hover:brightness-90 hover:scale-[1.02] active:scale-[0.98]"
          >
            Browse components
            <ArrowRightIcon size={13} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="https://github.com/particleui/particleui"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-1/60 px-7 py-3.5 text-sm font-medium text-text-2 transition-all hover:text-text-1 hover:border-border-hover backdrop-blur-sm"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Star on GitHub
          </Link>
        </div>

        {/* install hint */}
        <p className="mt-8 text-[11px] text-text-4" style={{ letterSpacing: "0.03em" }}>
          <span className="font-mono">npx particleui add glow-button</span>
          <span className="mx-2 opacity-40">·</span>
          always free · no sign-in required
        </p>
      </div>
    </section>
  )
}

/* ─── Features ────────────────────────────────────────────────────────────── */
const FEATURES = [
  {
    icon: TerminalIcon,
    title: "One command to install",
    body: "Run npx particleui add [component] and the source code appears directly in your project. Customize it like normal code — you own it.",
    code: "npx particleui add glow-button",
  },
  {
    icon: CodeIcon,
    title: "No runtime dependency",
    body: "ParticleUI isn't a package you import. It's a collection of components you copy. No bundle size overhead, no version conflicts.",
    code: "// component lives in your repo",
  },
  {
    icon: PuzzlePieceIcon,
    title: "React · Vue · Svelte",
    body: "Every component ships for all three frameworks. shadcn-compatible — drop them straight into projects that already use Radix or shadcn/ui.",
    code: "// tailored to your framework",
  },
]

function Features() {
  return (
    <section className="px-6 py-24 border-t border-border">
      <div className="mx-auto max-w-6xl">
        {/* section label */}
        <p
          className="mb-16 text-center text-[11px] uppercase text-text-4"
          style={{ letterSpacing: "0.14em", fontWeight: 500 }}
        >
          How it works
        </p>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col gap-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-1">
                <f.icon size={16} weight="regular" className="text-text-3" />
              </div>
              <div>
                <h3
                  className="mb-2 text-text-1"
                  style={{ fontSize: "1rem", fontWeight: 700, lineHeight: 1.3, letterSpacing: "-0.02em" }}
                >
                  {f.title}
                </h3>
                <p
                  className="text-text-3"
                  style={{ fontSize: "0.875rem", lineHeight: 1.7, maxWidth: "38ch" }}
                >
                  {f.body}
                </p>
              </div>
              <code
                className="mt-auto rounded-md border border-border bg-surface-1 px-3 py-2 font-mono text-[11px] text-text-3"
                style={{ letterSpacing: "0.01em" }}
              >
                {f.code}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Categories ──────────────────────────────────────────────────────────── */
const CATEGORIES = [
  {
    label: "Particle effects",
    description: "Hero canvases, particle systems, aurora, meteors, and animated backgrounds.",
    href: "/components",
    count: "12+",
  },
  {
    label: "Interactive components",
    description: "Magnetic buttons, tilt cards, spotlight, glow effects, and cursor interactions.",
    href: "/components",
    count: "18+",
  },
  {
    label: "Full-page blocks",
    description: "Hero sections, pricing tables, bento grids, feature rows, and testimonials.",
    href: "/blocks",
    count: "10+",
  },
  {
    label: "Text &amp; typography",
    description: "Gradient text, shimmer, glitch, letter-swap, blur-fade, and animated headings.",
    href: "/components",
    count: "8+",
  },
  {
    label: "Motion primitives",
    description: "Animate-in, scroll-progress, number-flow, morphing text, and list animations.",
    href: "/components",
    count: "10+",
  },
  {
    label: "Themes",
    description: "Dark and light OKLCH palettes. Apply in one command, tweak in globals.css.",
    href: "/themes",
    count: "6+",
  },
]

function Categories() {
  return (
    <section className="px-6 py-24 border-t border-border">
      <div className="mx-auto max-w-6xl">
        {/* heading */}
        <div className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p
              className="mb-3 text-[11px] uppercase text-text-4"
              style={{ letterSpacing: "0.14em", fontWeight: 500 }}
            >
              Component library
            </p>
            <h2
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
              }}
            >
              Everything you need.<br />Nothing you don't.
            </h2>
          </div>
          <Link
            href="/components"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm text-text-3 hover:text-text-1 transition-colors"
          >
            View all components
            <ArrowRightIcon size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="group flex flex-col gap-3 bg-bg p-6 transition-colors hover:bg-surface-1"
            >
              <div className="flex items-start justify-between">
                <h3
                  className="text-text-1 group-hover:text-accent transition-colors"
                  style={{ fontSize: "0.9375rem", fontWeight: 600, lineHeight: 1.3, letterSpacing: "-0.02em" }}
                  dangerouslySetInnerHTML={{ __html: cat.label }}
                />
                <span
                  className="text-text-4 font-mono"
                  style={{ fontSize: "0.75rem" }}
                >
                  {cat.count}
                </span>
              </div>
              <p
                className="text-text-3"
                style={{ fontSize: "0.8125rem", lineHeight: 1.65 }}
                dangerouslySetInnerHTML={{ __html: cat.description }}
              />
              <span className="mt-auto inline-flex items-center gap-1 text-[11px] text-text-4 group-hover:text-text-2 transition-colors">
                Browse
                <ArrowRightIcon size={10} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Install ─────────────────────────────────────────────────────────────── */
const INSTALL_STEPS = [
  { step: "01", cmd: "npx particleui add glow-button", label: "Add a component" },
  { step: "02", cmd: "import { GlowButton } from '@/components/ui/glow-button'", label: "Import it" },
  { step: "03", cmd: "<GlowButton>Get started</GlowButton>", label: "Use it — that's it" },
]

function Install() {
  return (
    <section className="px-6 py-24 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          {/* left */}
          <div>
            <p
              className="mb-4 text-[11px] uppercase text-text-4"
              style={{ letterSpacing: "0.14em", fontWeight: 500 }}
            >
              Get started
            </p>
            <h2
              className="mb-5"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.04em",
              }}
            >
              Up and running
              <br />
              in under a minute.
            </h2>
            <p
              className="mb-8 text-text-3"
              style={{ fontSize: "0.9375rem", lineHeight: 1.7, maxWidth: "44ch" }}
            >
              No boilerplate, no wrapping every component in a provider, no
              style collisions. Source code is yours from the first command.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/docs/getting-started/installation"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-all hover:brightness-90"
              >
                Read the docs
                <ArrowRightIcon size={12} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/components"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-text-2 transition-all hover:text-text-1 hover:border-border-hover"
              >
                Browse components
              </Link>
            </div>
          </div>

          {/* right — code steps */}
          <div className="rounded-xl border border-border bg-surface-1 overflow-hidden">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border">
              <span className="h-2.5 w-2.5 rounded-full bg-surface-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-surface-3" />
              <span className="h-2.5 w-2.5 rounded-full bg-surface-3" />
            </div>
            <div className="p-5 flex flex-col gap-5">
              {INSTALL_STEPS.map((s) => (
                <div key={s.step} className="flex items-start gap-4">
                  <span
                    className="shrink-0 font-mono text-text-4"
                    style={{ fontSize: "0.6875rem", lineHeight: "1.6rem" }}
                  >
                    {s.step}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="mb-1 text-[10px] uppercase text-text-4" style={{ letterSpacing: "0.1em" }}>
                      {s.label}
                    </p>
                    <code
                      className="block overflow-x-auto whitespace-nowrap font-mono text-[12px] text-text-2"
                      style={{ lineHeight: 1.6 }}
                    >
                      {s.cmd}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ──────────────────────────────────────────────────────────────── */
const FOOTER_LINKS = [
  { label: "Components", href: "/components" },
  { label: "Blocks", href: "/blocks" },
  { label: "Themes", href: "/themes" },
  { label: "Docs", href: "/docs" },
  { label: "GitHub", href: "https://github.com/particleui/particleui", external: true },
]

function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-text-2"
          style={{ fontWeight: 300, letterSpacing: "-0.01em" }}
        >
          <SparkleIcon weight="fill" size={13} className="text-accent" />
          ParticleUI
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {FOOTER_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noreferrer" : undefined}
              className="text-[12px] text-text-4 hover:text-text-2 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="text-[11px] text-text-4">
          © {new Date().getFullYear()} ParticleUI
        </p>
      </div>
    </footer>
  )
}
