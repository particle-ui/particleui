"use client"

import { Sparkle } from "@phosphor-icons/react/dist/ssr"
import { cn } from "@/lib/utils"

type Item = { name: string; label: string; tier: "pro" | "free"; cat: "core" | "particle" | "block" }

const ROW_1: Item[] = [
  { name: "particle-hero",      label: "Particle Hero",      tier: "pro",  cat: "particle" },
  { name: "glow-button",        label: "Glow Button",        tier: "free", cat: "core"     },
  { name: "magnetic-button",    label: "Magnetic Button",    tier: "free", cat: "particle" },
  { name: "aurora-background",  label: "Aurora Background",  tier: "pro",  cat: "particle" },
  { name: "border-beam",        label: "Border Beam",        tier: "free", cat: "particle" },
  { name: "spotlight",          label: "Spotlight",          tier: "free", cat: "particle" },
  { name: "shimmer-button",     label: "Shimmer Button",     tier: "free", cat: "particle" },
  { name: "tilt-card",          label: "Tilt Card",          tier: "free", cat: "core"     },
  { name: "cursor-trail",       label: "Cursor Trail",       tier: "pro",  cat: "particle" },
  { name: "orbit-animation",    label: "Orbit Animation",    tier: "pro",  cat: "particle" },
  { name: "glow-card",          label: "Glow Card",          tier: "free", cat: "core"     },
  { name: "meteors",            label: "Meteors",            tier: "free", cat: "particle" },
]

const ROW_2: Item[] = [
  { name: "hero-centered",      label: "Hero Section",       tier: "free", cat: "block"    },
  { name: "bento-grid",         label: "Bento Grid",         tier: "pro",  cat: "block"    },
  { name: "beam",               label: "Beam",               tier: "free", cat: "particle" },
  { name: "gradient-text",      label: "Gradient Text",      tier: "free", cat: "core"     },
  { name: "pricing",            label: "Pricing Section",    tier: "free", cat: "block"    },
  { name: "spotlight-hero",     label: "Spotlight Hero",     tier: "pro",  cat: "block"    },
  { name: "ripple",             label: "Ripple",             tier: "free", cat: "particle" },
  { name: "marquee",            label: "Marquee",            tier: "free", cat: "particle" },
  { name: "globe",              label: "Globe",              tier: "pro",  cat: "particle" },
  { name: "word-rotate",        label: "Word Rotate",        tier: "free", cat: "core"     },
  { name: "floating-dock",      label: "Floating Dock",      tier: "free", cat: "core"     },
  { name: "auth-sign-in",       label: "Auth Flow",          tier: "free", cat: "block"    },
]

const CAT_DOT: Record<Item["cat"], string> = {
  core:     "bg-text-3",
  particle: "bg-accent",
  block:    "bg-success-text",
}

export function Marquee() {
  return (
    <section aria-label="Component library" className="relative w-full overflow-hidden border-y border-white/[0.06] bg-surface-1/30 py-10">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-bg to-transparent" />

      {/* Section label */}
      <div className="relative z-20 mb-6 flex items-center justify-center gap-3">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/[0.1]" />
        <div className="flex items-center gap-2.5 rounded-full border border-white/[0.07] bg-white/[0.03] px-4 py-1.5">
          <Sparkle size={10} weight="fill" className="text-accent" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-3">
            100+ components · React · Vue · Svelte
          </span>
        </div>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/[0.1]" />
      </div>

      {/* Row 1 — left → right */}
      <div className="flex mb-3">
        <Track items={ROW_1} direction="left" duration={40} />
        <Track items={ROW_1} direction="left" duration={40} aria-hidden />
      </div>

      {/* Row 2 — right → left */}
      <div className="flex">
        <Track items={ROW_2} direction="right" duration={50} />
        <Track items={ROW_2} direction="right" duration={50} aria-hidden />
      </div>

      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}

function Track({
  items,
  direction,
  duration,
  "aria-hidden": hidden,
}: {
  items: Item[]
  direction: "left" | "right"
  duration: number
  "aria-hidden"?: boolean | true
}) {
  return (
    <div
      aria-hidden={hidden}
      className="flex shrink-0 items-center gap-3 pr-3"
      style={{
        animation: `marquee-${direction} ${duration}s linear infinite`,
      }}
    >
      {items.map((item) => (
        <Pill key={item.name} item={item} />
      ))}
    </div>
  )
}

function Pill({ item }: { item: Item }) {
  const isPro = item.tier === "pro"
  return (
    <div
      className={cn(
        "group relative flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2 whitespace-nowrap transition-colors duration-150",
        isPro
          ? "border border-accent/20 bg-accent/[0.04] hover:border-accent/35 hover:bg-accent/[0.07]"
          : "border border-white/[0.07] bg-white/[0.025] hover:border-white/[0.12] hover:bg-white/[0.045]"
      )}
    >
      {/* Category dot */}
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", CAT_DOT[item.cat])} />

      {/* Name */}
      <span className={cn(
        "font-mono text-[12px] leading-none",
        isPro ? "text-text-2" : "text-text-3"
      )}>
        {item.label}
      </span>

      {/* Pro badge */}
      {isPro && (
        <span className="flex items-center gap-1 rounded-full border border-accent/25 bg-accent/10 px-1.5 py-0.5">
          <Sparkle size={7} weight="fill" className="text-accent" />
          <span className="text-[9px] font-bold uppercase tracking-wider text-accent/80">Pro</span>
        </span>
      )}
    </div>
  )
}
