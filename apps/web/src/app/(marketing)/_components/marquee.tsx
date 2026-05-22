"use client"

import Link from "next/link"
import {
  LightningIcon,
  SparkleIcon,
  CursorClickIcon,
  TextAaIcon,
  ShootingStarIcon,
  AtomIcon,
  SquaresFourIcon,
  CardsIcon,
  MagicWandIcon,
  ConfettiIcon,
  BrowsersIcon,
  WaveformIcon,
  StackIcon,
  GlobeIcon,
  GridFourIcon,
  MeteorIcon,
  PaletteIcon,
  StarIcon,
  LayoutIcon,
  WindIcon,
  FlowArrowIcon,
  GradientIcon,
} from "@phosphor-icons/react/dist/ssr"
import type { Icon } from "@phosphor-icons/react"

type Item = { name: string; label: string; Icon: Icon }

const ROW_1: Item[] = [
  { name: "glow-button",        label: "Glow Button",        Icon: LightningIcon      },
  { name: "sparkles-text",      label: "Sparkles Text",      Icon: SparkleIcon        },
  { name: "magnetic-button",    label: "Magnetic Button",    Icon: CursorClickIcon    },
  { name: "gradient-text",      label: "Gradient Text",      Icon: GradientIcon       },
  { name: "meteors",            label: "Meteors",            Icon: MeteorIcon         },
  { name: "particle-hero",      label: "Particle Hero",      Icon: AtomIcon           },
  { name: "bento-grid",         label: "Bento Grid",         Icon: SquaresFourIcon    },
  { name: "tilt-card",          label: "Tilt Card",          Icon: CardsIcon          },
  { name: "border-beam",        label: "Border Beam",        Icon: MagicWandIcon      },
  { name: "confetti-button",    label: "Confetti Button",    Icon: ConfettiIcon       },
  { name: "hero-centered",      label: "Hero Section",       Icon: BrowsersIcon       },
  { name: "number-flow",        label: "Number Flow",        Icon: WaveformIcon       },
]

const ROW_2: Item[] = [
  { name: "floating-dock",      label: "Floating Dock",      Icon: StackIcon          },
  { name: "globe",              label: "Globe",              Icon: GlobeIcon          },
  { name: "shimmer-button",     label: "Shimmer Button",     Icon: StarIcon           },
  { name: "aurora-background",  label: "Aurora Background",  Icon: WindIcon           },
  { name: "spotlight",          label: "Spotlight",          Icon: FlowArrowIcon      },
  { name: "feature-grid",       label: "Feature Grid",       Icon: GridFourIcon       },
  { name: "animate-in",         label: "Animate In",         Icon: LayoutIcon         },
  { name: "themes",             label: "Themes",             Icon: PaletteIcon        },
  { name: "beam",               label: "Beam",               Icon: LightningIcon      },
  { name: "glow-card",          label: "Glow Card",          Icon: CardsIcon          },
  { name: "word-rotate",        label: "Word Rotate",        Icon: TextAaIcon         },
  { name: "shoot-stars",        label: "Shooting Stars",     Icon: ShootingStarIcon   },
]

export function Marquee() {
  return (
    <section
      aria-label="Component library"
      className="group relative w-full overflow-hidden border-y border-white/[0.06] bg-surface-1/30 py-10"
    >
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-bg to-transparent" />

      {/* Section label */}
      <div className="relative z-20 mb-6 flex items-center justify-center gap-3">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/[0.1]" />
        <div className="flex items-center gap-2.5 rounded-full border border-white/[0.07] bg-white/[0.03] px-4 py-1.5">
          <SparkleIcon size={10} weight="fill" className="text-accent" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-text-3">
            100+ components · React · Vue · Svelte
          </span>
        </div>
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/[0.1]" />
      </div>

      {/* Row 1 — left */}
      <div className="flex mb-3">
        <Track items={ROW_1} direction="left" duration={45} />
        <Track items={ROW_1} direction="left" duration={45} aria-hidden />
      </div>

      {/* Row 2 — right */}
      <div className="flex">
        <Track items={ROW_2} direction="right" duration={55} />
        <Track items={ROW_2} direction="right" duration={55} aria-hidden />
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
      className="flex shrink-0 items-center gap-3 pr-3 group-hover:[animation-play-state:paused]"
      style={{ animation: `marquee-${direction} ${duration}s linear infinite` }}
    >
      {items.map((item) => (
        <Chip key={item.name} item={item} />
      ))}
    </div>
  )
}

function Chip({ item }: { item: Item }) {
  return (
    <Link
      href={`/components/${item.name}`}
      className="group/chip flex shrink-0 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3.5 py-2 whitespace-nowrap transition-all duration-150 hover:border-white/[0.14] hover:bg-white/[0.05] hover:scale-[1.03]"
    >
      <item.Icon
        size={13}
        weight="duotone"
        className="shrink-0 text-text-4 transition-colors duration-150 group-hover/chip:text-accent"
      />
      <span className="font-mono text-[12px] leading-none text-text-3 transition-colors duration-150 group-hover/chip:text-text-2">
        {item.label}
      </span>
    </Link>
  )
}
