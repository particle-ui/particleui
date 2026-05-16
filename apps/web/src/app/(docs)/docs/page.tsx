import Link from "next/link"
import {
  Sparkle,
  Palette,
  Code,
  Robot,
  ShieldCheck,
  ArrowRight,
  Cube,
  Lightning,
  Rows,
} from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { Steps, Step } from "@/components/docs/steps"
import { PrevNext } from "@/components/docs/prev-next"

export const metadata: Metadata = {
  title: "Introduction",
  description: "Get started with ParticleUI — 100+ components for React, Vue, and Svelte.",
}

export default function DocsIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Eyebrow */}
      <div className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        Getting Started
      </div>

      {/* Hero */}
      <h1 id="introduction" className="mb-5 text-[2.5rem] font-semibold tracking-[-0.02em] leading-[1.15] text-text-1">
        Build faster with ParticleUI
      </h1>
      <p className="mb-8 text-text-2 leading-[1.75] text-[1.0625rem]">
        A premium component registry for React, Vue, and Svelte. 100+ components install
        directly into your codebase via the ParticleUI CLI — you own the source, style it
        however you want, ship it to production.
      </p>

      {/* Install command */}
      <div className="mb-12">
        <CodeBlock code="npx particleui-cli add glow-button" filename="Terminal" />
      </div>

      <hr className="border-border mb-12" />

      {/* Quick start steps */}
      <section className="mb-12">
        <h2 id="quick-start" className="mb-2 text-xl font-semibold tracking-[-0.01em] text-text-1">
          Quick start
        </h2>
        <p className="mb-6 text-[15px] text-text-2 leading-[1.75]">
          Up and running in under two minutes.
        </p>

        <Steps>
          <Step title="Set up your project">
            <p className="mb-3">
              Run the interactive init — it detects your framework and sets up your config:
            </p>
            <CodeBlock code="npx particleui-cli init" />
          </Step>
          <Step title="Configure the registry">
            <p className="mb-3">
              Open <code>particleui.json</code> (or <code>components.json</code>) and add{" "}
              <code>@particleui</code> under <code>registries</code>:
            </p>
            <CodeBlock
              filename="components.json"
              code={`{
  "registries": {
    "@particleui": {
      "url": "https://particleui.dev/r/react/{name}.json",
      "headers": {
        "Authorization": "Bearer \${PARTICLEUI_TOKEN}"
      }
    }
  }
}`}
            />
          </Step>
          <Step title="Install your first component">
            <p className="mb-3">
              Run the CLI with any component name:
            </p>
            <CodeBlock code="npx particleui-cli add glow-button" />
            <p className="mt-3">
              The component source lands in <code>src/components/ui/glow-button.tsx</code>.
              You own it — edit it freely.
            </p>
          </Step>
        </Steps>
      </section>

      <hr className="border-border mb-12" />

      {/* What you get */}
      <section className="mb-12">
        <h2 id="what-you-get" className="mb-2 text-xl font-semibold tracking-[-0.01em] text-text-1">
          What&apos;s included
        </h2>
        <p className="mb-6 text-[15px] text-text-2 leading-[1.75]">
          Three tiers of components, from foundational primitives to full-page blocks.
        </p>

        <div className="grid sm:grid-cols-3 gap-3">
          {[
            {
              icon: Cube,
              label: "Core Primitives",
              count: 45,
              desc: "Buttons, inputs, modals, tables — every building block you need.",
              href: "/docs/components/button",
            },
            {
              icon: Sparkle,
              label: "Particle Effects",
              count: 20,
              desc: "Glows, beams, meteors, tilt, marquee, shimmer — motion that delights.",
              href: "/docs/components/glow-button",
            },
            {
              icon: Rows,
              label: "Full-page Blocks",
              count: 26,
              desc: "Hero, pricing, auth, dashboards, FAQ, testimonials — ready to ship.",
              href: "/docs/components/hero-centered",
            },
          ].map(({ icon: Icon, label, count, desc, href }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-3 rounded-xl border border-border bg-surface-1 p-5 hover:border-border-hover hover:bg-surface-2 transition-all duration-150"
            >
              <div className="flex items-center justify-between">
                <Icon size={18} className="text-accent" />
                <span className="text-[1.75rem] font-bold tracking-[-0.04em] text-text-1">
                  {count}
                </span>
              </div>
              <div>
                <p className="font-semibold text-[15px] mb-1 text-text-1 group-hover:text-accent transition-colors">
                  {label}
                </p>
                <p className="text-xs text-text-2 leading-[1.55]">{desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <hr className="border-border mb-12" />

      {/* Feature highlights */}
      <section className="mb-12">
        <h2 id="features" className="mb-2 text-xl font-semibold tracking-[-0.01em] text-text-1">
          Why ParticleUI
        </h2>
        <p className="mb-6 text-[15px] text-text-2 leading-[1.75]">
          Everything you need, nothing you don&apos;t.
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            {
              icon: Code,
              title: "Own CLI",
              desc: "npx particleui-cli add button. Auto-detects React, Vue, and Svelte. No extra config.",
            },
            {
              icon: Palette,
              title: "OKLCH design tokens",
              desc: "Perceptual color scales with semantic tokens. Dark mode works everywhere, first class.",
            },
            {
              icon: ArrowRight,
              title: "React · Vue · Svelte",
              desc: "Same components, three frameworks. Switch the registry URL and you're done.",
            },
            {
              icon: Robot,
              title: "MCP Server",
              desc: "Claude can search and install components in any conversation. AI-native DX.",
            },
            {
              icon: ShieldCheck,
              title: "WCAG AA accessible",
              desc: "All color pairs checked against WCAG 2.1 AA. Focus rings, ARIA roles, keyboard nav.",
            },
            {
              icon: Lightning,
              title: "MIT licensed",
              desc: "Free components are MIT. Pro components require a license. You always own the source.",
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
                <p className="font-semibold text-[15px] mb-1 text-text-1">{title}</p>
                <p className="text-xs text-text-2 leading-[1.6]">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <PrevNext />
    </div>
  )
}
