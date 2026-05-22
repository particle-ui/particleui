import Link from "next/link"
import {
  SparkleIcon,
  PaletteIcon,
  CodeIcon,
  RobotIcon,
  ShieldCheckIcon,
  CubeIcon,
  RowsIcon,
  SpinnerIcon,
  ArrowRightIcon,
  LightningIcon,
} from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { Steps, Step } from "@/components/docs/steps"
import { PrevNext } from "@/components/docs/prev-next"

export const metadata: Metadata = {
  title: "Introduction",
  description: "Get started with ParticleUI — shadcn-compatible UI components you install as source code.",
}

export default function DocsIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Eyebrow */}
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
        Getting Started
      </p>

      {/* Hero heading — bold, compressed */}
      <h1
        id="introduction"
        className="mb-5 leading-[1.05] text-text-1"
        style={{
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 800,
          letterSpacing: "-0.04em",
        }}
      >
        UI components you own
        <br />
        as source code.
      </h1>

      <p className="mb-8 text-text-2 leading-[1.75] max-w-[58ch]" style={{ fontSize: "1.0625rem" }}>
        Install React, Vue, or Svelte components directly into your codebase with one command.
        Inspect the source, customize freely — no runtime package, no account needed.
      </p>

      {/* Install command */}
      <div className="mb-12">
        <CodeBlock code="npx particleui add button" filename="Terminal" />
      </div>

      <hr className="border-border mb-12" />

      {/* Quick start */}
      <section className="mb-12">
        <h2
          id="quick-start"
          className="mb-2 text-text-1"
          style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          Quick start
        </h2>
        <p className="mb-6 text-text-2 leading-[1.75] max-w-[55ch]" style={{ fontSize: "0.9375rem" }}>
          Up and running in under 60 seconds. No account, no token, no setup.
        </p>

        <Steps>
          <Step title="Start with any React app">
            <p className="mb-3">
              Use an existing project or start fresh. The CLI auto-detects your framework and writes
              source into <code>src/components/ui</code>.
            </p>
          </Step>
          <Step title="Add a component">
            <p className="mb-3">Run the install command:</p>
            <CodeBlock code="npx particleui add button" />
            <p className="mt-3">
              Source code lands at <code>src/components/ui/button.tsx</code> — it&apos;s yours.
            </p>
          </Step>
          <Step title="Import and ship">
            <CodeBlock code={`import { Button } from "@/components/ui/button"\n\nexport function Demo() {\n  return <Button>Ship it</Button>\n}`} />
          </Step>
        </Steps>
      </section>

      <hr className="border-border mb-12" />

      {/* What's included */}
      <section className="mb-12">
        <h2
          id="whats-included"
          className="mb-2 text-text-1"
          style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          What&apos;s included
        </h2>
        <p className="mb-6 text-text-2 leading-[1.75] max-w-[55ch]" style={{ fontSize: "0.9375rem" }}>
          From foundational primitives to full-page blocks — all free.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            {
              icon: CubeIcon,
              label: "Core",
              count: "45+",
              desc: "Buttons, inputs, modals, tables.",
              href: "/docs/components/button",
            },
            {
              icon: SparkleIcon,
              label: "Particles",
              count: "35+",
              desc: "Glows, beams, meteors, shimmer.",
              href: "/docs/components/glow-button",
            },
            {
              icon: RowsIcon,
              label: "Blocks",
              count: "26+",
              desc: "Hero, pricing, auth, dashboards.",
              href: "/docs/components/hero-centered",
            },
            {
              icon: SpinnerIcon,
              label: "Loaders",
              count: "25+",
              desc: "Spinners, dot-matrix grids, rings, bars.",
              href: "/docs/components/spinner",
            },
          ].map(({ icon: Icon, label, count, desc, href }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-surface-1 p-4 hover:border-border-hover hover:bg-surface-2 transition-all duration-150"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-accent-border bg-accent-dim">
                  <Icon size={13} className="text-accent" />
                </div>
                <span
                  className="text-text-1"
                  style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.04em" }}
                >
                  {count}
                </span>
              </div>
              <div>
                <p className="font-semibold text-[13px] mb-1 text-text-1 group-hover:text-accent transition-colors">
                  {label}
                </p>
                <p className="text-[11px] text-text-3 leading-[1.55]">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <hr className="border-border mb-12" />

      {/* Why ParticleUI */}
      <section className="mb-12">
        <h2
          id="why"
          className="mb-2 text-text-1"
          style={{ fontSize: "1.25rem", fontWeight: 700, letterSpacing: "-0.02em" }}
        >
          Why ParticleUI
        </h2>
        <p className="mb-6 text-text-2 leading-[1.75] max-w-[55ch]" style={{ fontSize: "0.9375rem" }}>
          Everything you need, nothing you don&apos;t.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            {
              icon: CodeIcon,
              title: "Own CLI",
              desc: "npx particleui add button. Auto-detects React, Vue, and Svelte. No extra config.",
            },
            {
              icon: PaletteIcon,
              title: "OKLCH design tokens",
              desc: "Perceptual color scales with semantic tokens. Dark mode works everywhere, first class.",
            },
            {
              icon: ArrowRightIcon,
              title: "React · Vue · Svelte",
              desc: "Same components, three frameworks. Switch the registry URL and you're done.",
            },
            {
              icon: RobotIcon,
              title: "MCP Server",
              desc: "Claude can search and install components in any conversation. AI-native DX.",
            },
            {
              icon: ShieldCheckIcon,
              title: "WCAG AA accessible",
              desc: "All color pairs checked against WCAG 2.1 AA. Focus rings, ARIA roles, keyboard nav.",
            },
            {
              icon: LightningIcon,
              title: "Free forever",
              desc: "Every component is free. Use in personal and commercial projects with no restrictions.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 rounded-xl border border-border bg-surface-1 p-5"
            >
              <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent-border bg-accent-dim">
                <Icon size={14} className="text-accent" />
              </div>
              <div>
                <p style={{ fontSize: "0.9375rem", fontWeight: 600, letterSpacing: "-0.01em" }} className="mb-1 text-text-1">
                  {title}
                </p>
                <p className="text-[12px] text-text-2 leading-[1.65]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PrevNext />
    </div>
  )
}
