"use client"

import { useState, useTransition } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import {
  Sparkle,
  ArrowRight,
  Lightning,
  Clock,
  ArrowLeft,
} from "@phosphor-icons/react"
import { generateLayoutAction } from "./actions"
import type { GeneratedLayout } from "@/lib/ai/gateway"

// Block map — static imports so tree-shaking works
const BLOCK_MAP: Record<string, React.ComponentType<Record<string, unknown>>> = {
  "hero-split": dynamic(() =>
    import("@/components/blocks/hero-split").then((m) => ({ default: m.HeroSplit }))
  ),
  "hero-centered": dynamic(() =>
    import("@/components/blocks/hero-centered").then((m) => ({ default: m.HeroCentered }))
  ),
  "feature-grid": dynamic(() =>
    import("@/components/blocks/feature-grid").then((m) => ({ default: m.FeatureGrid }))
  ),
  "feature-alternating": dynamic(() =>
    import("@/components/blocks/feature-alternating").then((m) => ({ default: m.FeatureAlternating }))
  ),
  "stats": dynamic(() =>
    import("@/components/blocks/stats").then((m) => ({ default: m.StatsSection }))
  ),
  "testimonials": dynamic(() =>
    import("@/components/blocks/testimonials").then((m) => ({ default: m.TestimonialsSection }))
  ),
  "pricing": dynamic(() =>
    import("@/components/blocks/pricing").then((m) => ({ default: m.PricingSection }))
  ),
  "faq": dynamic(() =>
    import("@/components/blocks/faq").then((m) => ({ default: m.FaqSection }))
  ),
  "logo-cloud": dynamic(() =>
    import("@/components/blocks/logo-cloud").then((m) => ({ default: m.LogoCloud }))
  ),
  "how-it-works": dynamic(() =>
    import("@/components/blocks/how-it-works").then((m) => ({ default: m.HowItWorks }))
  ),
  "cta-section": dynamic(() =>
    import("@/components/blocks/cta-section").then((m) => ({ default: m.CtaSection }))
  ),
  "newsletter": dynamic(() =>
    import("@/components/blocks/newsletter").then((m) => ({ default: m.NewsletterSection }))
  ),
  "footer": dynamic(() =>
    import("@/components/blocks/footer").then((m) => ({ default: m.Footer }))
  ),
  "auth-sign-in": dynamic(() =>
    import("@/components/blocks/auth-sign-in").then((m) => ({ default: m.AuthSignIn }))
  ),
  "auth-sign-up": dynamic(() =>
    import("@/components/blocks/auth-sign-up").then((m) => ({ default: m.AuthSignUp }))
  ),
  "dashboard-analytics": dynamic(() =>
    import("@/components/blocks/dashboard-analytics").then((m) => ({ default: m.DashboardAnalytics }))
  ),
  "ai-chat": dynamic(() =>
    import("@/components/blocks/ai-chat").then((m) => ({ default: m.AIChat }))
  ),
  "settings-page": dynamic(() =>
    import("@/components/blocks/settings-page").then((m) => ({ default: m.SettingsPage }))
  ),
}

const EXAMPLE_PROMPTS = [
  "SaaS landing page for a project management tool",
  "AI startup page with dark premium design",
  "Auth + dashboard for a developer tool",
  "Marketing blog with newsletter signup",
]

function SkeletonLoader() {
  return (
    <div className="flex flex-col gap-6 p-8 w-full">
      <div className="h-48 rounded-2xl bg-[var(--color-surface-1)] animate-pulse" />
      <div className="h-32 rounded-2xl bg-[var(--color-surface-1)] animate-pulse" />
      <div className="h-40 rounded-2xl bg-[var(--color-surface-1)] animate-pulse" />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
      <div className="w-16 h-16 rounded-2xl bg-[var(--color-surface-1)] flex items-center justify-center">
        <Sparkle size={32} weight="duotone" className="text-[var(--color-accent)]" />
      </div>
      <h2 className="text-xl font-semibold text-[var(--color-text-1)]">
        Describe your page →
      </h2>
      <p className="text-[var(--color-text-2)] max-w-xs text-[15px] leading-relaxed">
        Type what you want to build and ParticleUI will select the right blocks and render a live preview — plus a one-command install snippet.
      </p>
      <div className="flex items-center gap-2 mt-2 text-xs text-[var(--color-text-3)]">
        <Lightning size={14} />
        <span>Powered by Claude Haiku</span>
        <span className="opacity-40">·</span>
        <Clock size={14} />
        <span>~2s generation</span>
      </div>
    </div>
  )
}

function BlockLabel({ name }: { name: string }) {
  return (
    <span className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--color-text-2)] text-xs px-2 py-0.5 rounded-md font-mono pointer-events-none">
      {name}
    </span>
  )
}

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("")
  const [layout, setLayout] = useState<GeneratedLayout | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isPending, startTransition] = useTransition()

  function handleGenerate() {
    if (!prompt.trim() || isPending) return
    setError(null)

    startTransition(async () => {
      const result = await generateLayoutAction(prompt.trim())
      if ("error" in result && result.error) {
        if (result.error === "rate_limited") {
          setError(`You've used ${result.used}/${result.limit} free generations. Upgrade to Pro for unlimited.`)
        } else {
          setError("Something went wrong. Please try again.")
        }
      } else if (result.layout) {
        setLayout(result.layout)
      }
    })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleGenerate()
    }
  }

  const installCmd = layout
    ? "npx particleui-cli add " + layout.blocks.map((b) => b.component).join(" ")
    : ""

  function handleCopy() {
    if (!installCmd) return
    navigator.clipboard.writeText(installCmd).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-bg">
      {/* Top bar */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-border)] bg-surface-1 shrink-0">
        <Link href="/" className="flex items-center gap-2 text-sm font-bold text-text-1 hover:text-accent transition-colors">
          <Sparkle size={14} weight="fill" className="text-accent" />
          ParticleUI
        </Link>
        <Link href="/components" className="flex items-center gap-1.5 text-xs text-text-3 hover:text-text-1 transition-colors">
          <ArrowLeft size={12} />
          Back to components
        </Link>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
      {/* Left panel */}
      <aside
        className="w-full md:w-[380px] md:min-w-[380px] flex flex-col border-b md:border-b-0 md:border-r border-[var(--color-border)] bg-surface-1"
      >
        {/* Header */}
        <div className="p-6 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2 mb-2">
            <Sparkle size={22} weight="fill" className="text-[var(--color-accent)]" />
            <h1 className="text-xl font-bold text-[var(--color-text-1)]">UI Generator</h1>
          </div>
          <p className="text-[15px] text-[var(--color-text-2)]">
            Describe a page, get the components
          </p>
        </div>

        {/* Form */}
        <div className="p-6 flex flex-col gap-4 flex-1">
          <textarea
            rows={8}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. A SaaS landing page for a project management tool targeting remote teams. Premium, dark design."
            className="w-full resize-none rounded-xl border border-[var(--color-border)] p-3 text-sm text-[var(--color-text-1)] placeholder:text-[var(--color-text-3)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] transition"
            style={{ background: "var(--color-surface-2)" }}
          />

          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isPending}
            className="flex items-center justify-center gap-2 rounded-xl py-3.5 px-5 font-semibold text-sm w-full transition disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "var(--color-accent)",
              color: "var(--color-bg)",
            }}
          >
            {isPending ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  />
                </svg>
                Generating…
              </>
            ) : (
              <>
                Generate
                <ArrowRight size={16} weight="bold" />
              </>
            )}
          </button>

          {/* Error state */}
          {error && (
            <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg p-3">
              {error}
            </p>
          )}

          {/* Example prompts */}
          <div>
            <p className="text-xs text-[var(--color-text-3)] mb-2 uppercase tracking-wider font-medium">
              Examples
            </p>
            <div className="flex flex-wrap gap-2">
              {EXAMPLE_PROMPTS.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setPrompt(ex)}
                  className="text-xs px-3 py-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-2)] hover:text-[var(--color-text-1)] hover:border-[var(--color-accent)] transition text-left"
                  style={{ background: "var(--color-surface-2)" }}
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {/* Install command */}
          {layout && (
            <div className="mt-2">
              <p className="text-xs text-[var(--color-text-3)] mb-2 uppercase tracking-wider font-medium">
                Install all
              </p>
              <div
                className="rounded-xl border border-[var(--color-border)] p-3 flex items-start gap-2"
                style={{ background: "var(--color-surface-2)" }}
              >
                <code className="text-xs text-[var(--color-text-1)] font-mono flex-1 break-all leading-relaxed">
                  {installCmd}
                </code>
                <button
                  onClick={handleCopy}
                  className="shrink-0 text-xs px-2 py-1 rounded-md border border-[var(--color-border)] text-[var(--color-text-2)] hover:text-[var(--color-accent)] transition"
                  style={{ background: "var(--color-surface-1)" }}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Right panel */}
      <main
        className="flex-1 overflow-y-auto bg-bg"
      >
        {isPending ? (
          <SkeletonLoader />
        ) : layout ? (
          <div className="flex flex-col">
            {layout.blocks.map((block) => {
              const BlockComponent = BLOCK_MAP[block.component]
              if (!BlockComponent) return null
              return (
                <section
                  key={block.component}
                  className="relative group"
                >
                  <BlockLabel name={block.component} />
                  <BlockComponent />
                </section>
              )
            })}
          </div>
        ) : (
          <EmptyState />
        )}
      </main>
      </div>
    </div>
  )
}
