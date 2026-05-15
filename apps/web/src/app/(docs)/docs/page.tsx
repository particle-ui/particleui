import Link from "next/link"
import { ArrowRight, Terminal, BookOpen } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Introduction — ParticleUI Docs" }

export default function DocsIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-text-4">
        Getting Started
      </div>
      <h1 className="mb-4 text-4xl font-bold tracking-[-0.03em] text-text-1">Introduction</h1>
      <p className="mb-8 text-text-3 leading-relaxed text-lg">
        ParticleUI is a premium component registry for shadcn/ui projects. Components install
        directly into your codebase — you own the source and can edit everything.
      </p>

      <div className="mb-10 grid sm:grid-cols-2 gap-3">
        {[
          {
            icon: Terminal,
            title: "Quick start",
            desc: "Add the registry and install your first component.",
            href: "/docs/getting-started/installation",
          },
          {
            icon: BookOpen,
            title: "Browse components",
            desc: "See all 13 components with live previews.",
            href: "/docs/components/glow-button",
          },
        ].map(({ icon: Icon, title, desc, href }) => (
          <Link
            key={href}
            href={href}
            className="group flex items-start gap-4 rounded-xl border border-border bg-surface-1 p-5 hover:border-border-hover hover:bg-surface-2 transition-all duration-150"
          >
            <Icon size={18} className="text-accent mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-sm mb-1 text-text-2 group-hover:text-text-1 transition-colors">{title}</p>
              <p className="text-xs text-text-4">{desc}</p>
            </div>
            <ArrowRight size={14} className="ml-auto mt-0.5 text-text-4 group-hover:text-text-3 transition-colors shrink-0" />
          </Link>
        ))}
      </div>

      <hr className="border-border mb-8" />

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-text-1">How it works</h2>
        <p className="text-sm text-text-3 leading-relaxed mb-4">
          ParticleUI is a third-party registry compatible with the shadcn/ui CLI. When you
          run <code className="text-text-2 bg-white/[0.05] rounded px-1.5 py-0.5">npx shadcn add @particleui/foo</code>,
          the CLI fetches the component JSON from our registry, validates it, and writes the
          source files directly into your project.
        </p>
        <p className="text-sm text-text-3 leading-relaxed">
          Nothing is imported from an npm package at runtime. The component source is yours.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-text-1">Free vs Pro</h2>
        <div className="divide-y divide-border rounded-xl border border-border overflow-hidden text-sm">
          {[
            ["Free", "No token needed. Install and use immediately."],
            ["Pro", "Requires PARTICLEUI_TOKEN. Get a token from your dashboard after purchase."],
          ].map(([tier, desc]) => (
            <div key={tier as string} className="flex items-start gap-4 bg-surface-1 px-5 py-4">
              <span
                className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ${
                  tier === "Pro"
                    ? "border border-accent-border bg-accent-dim text-accent"
                    : "border border-border bg-white/[0.03] text-text-4"
                }`}
              >
                {tier}
              </span>
              <p className="text-text-3">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold tracking-tight text-text-1">Claude skills</h2>
        <p className="text-sm text-text-3 leading-relaxed mb-3">
          Every Pro component ships with a bundled Claude skill. When you install the component,
          a <code className="text-text-2 bg-white/[0.05] rounded px-1.5 py-0.5">SKILL.md</code> file
          is written to <code className="text-text-2 bg-white/[0.05] rounded px-1.5 py-0.5">~/.claude/skills/&lt;name&gt;/</code>.
        </p>
        <p className="text-sm text-text-3 leading-relaxed">
          This gives Claude Code full context on every prop, use case, and customisation
          pattern — so AI-assisted development just works.
        </p>
      </section>
    </div>
  )
}
