"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GlowCard } from "@/components/ui/glow-card"
import { GradientText } from "@/components/ui/gradient-text"
import { Beam } from "@/components/ui/beam"
import { ArrowRight, CheckCircle } from "lucide-react"

interface HeroSplitProps {
  badge?: string
  headline?: string
  headlineGradient?: string
  description?: string
  bullets?: string[]
  primaryCta?: string
  primaryHref?: string
  secondaryCta?: string
  secondaryHref?: string
}

const defaultBullets = [
  "60+ free, MIT-licensed components",
  "Radix UI primitives under the hood",
  "One command install via particleui-cli",
]

function HeroSplit({
  badge = "Open Source · MIT License",
  headline = "The component library that",
  headlineGradient = "ships with you.",
  description = "Stop fighting your design system. ParticleUI components are so well-crafted you'll forget they're a library.",
  bullets = defaultBullets,
  primaryCta = "Get started free",
  primaryHref = "/docs/getting-started/installation",
  secondaryCta = "See all components",
  secondaryHref = "/docs/components/button",
}: HeroSplitProps) {
  return (
    <section className="relative grid grid-cols-1 gap-12 px-4 py-24 lg:grid-cols-2 lg:items-center max-w-6xl mx-auto overflow-hidden">
      {/* Left */}
      <div className="flex flex-col gap-6">
        <Badge variant="outline" className="w-fit border-[var(--color-accent-border)] text-[var(--color-accent-text)]">
          {badge}
        </Badge>

        <h1 className="text-4xl font-bold tracking-tight leading-[1.1] sm:text-5xl">
          {headline}{" "}
          <GradientText variant="electric">{headlineGradient}</GradientText>
        </h1>

        <p className="text-[var(--color-text-2)] max-w-md leading-relaxed">{description}</p>

        <ul className="flex flex-col gap-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-2 text-sm text-[var(--color-text-2)]">
              <CheckCircle size={15} className="shrink-0 text-[var(--color-accent)]" />
              {b}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg">
            <a href={primaryHref}>
              {primaryCta}
              <ArrowRight size={16} className="ml-1" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href={secondaryHref}>{secondaryCta}</a>
          </Button>
        </div>
      </div>

      {/* Right — mock code preview */}
      <GlowCard className="overflow-hidden">
        <div className="p-4 border-b border-[var(--color-border)] flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[oklch(68%_0.22_25)]" />
          <span className="w-3 h-3 rounded-full bg-[oklch(78%_0.2_90)]" />
          <span className="w-3 h-3 rounded-full bg-[oklch(72%_0.2_140)]" />
          <span className="ml-2 text-xs text-[var(--color-text-3)]">page.tsx</span>
        </div>
        <pre className="p-5 text-xs leading-relaxed text-[var(--color-text-2)] overflow-x-auto font-mono">
          <code>{`import { Button } from "@/components/ui/button"
import { GlowCard } from "@/components/ui/glow-card"
import { GradientText } from "@/components/ui/gradient-text"

export default function Page() {
  return (
    <GlowCard className="p-8">
      <GradientText variant="aurora" className="text-3xl font-bold">
        Hello, world.
      </GradientText>
      <Button className="mt-4">
        Get started
      </Button>
    </GlowCard>
  )
}`}</code>
        </pre>
        <div className="px-5 pb-5">
          <Beam colorFrom="var(--color-accent)" duration={3} />
        </div>
      </GlowCard>
    </section>
  )
}

export { HeroSplit }
