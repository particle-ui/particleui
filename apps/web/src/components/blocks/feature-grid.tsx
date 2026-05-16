"use client"

import * as React from "react"
import { GlowCard } from "@/components/ui/glow-card"
import { GradientText } from "@/components/ui/gradient-text"
import { Badge } from "@/components/ui/badge"
import { Zap, Lock, Palette, Package, Code2, Layers } from "lucide-react"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  gradient?: "electric" | "aurora" | "fire" | "candy" | "gold"
  large?: boolean
}

interface FeatureGridProps {
  badge?: string
  heading?: string
  headingGradient?: string
  description?: string
  features?: Feature[]
}

const defaultFeatures: Feature[] = [
  {
    icon: <Zap size={24} />,
    title: "Electric by default",
    description: "Every component ships with our OKLCH electric-cyan design language. Looks incredible out of the box — no theming required.",
    gradient: "electric",
    large: true,
  },
  {
    icon: <Lock size={24} />,
    title: "Accessible to the core",
    description: "Built on Radix UI. Every component is keyboard navigable, screen-reader friendly, and ARIA-compliant.",
    gradient: "aurora",
  },
  {
    icon: <Palette size={24} />,
    title: "Fully themeable",
    description: "Swap the entire design language by changing 4 CSS variables. Dark mode is the default, light mode is supported.",
    gradient: "gold",
  },
  {
    icon: <Package size={24} />,
    title: "Copy-paste ready",
    description: "Installs via the ParticleUI CLI. You own the code — no runtime dependency, no version lock-in.",
    gradient: "candy",
  },
  {
    icon: <Code2 size={24} />,
    title: "TypeScript first",
    description: "Every component has full TypeScript types, variant type exports, and JSDoc on every prop.",
    gradient: "fire",
  },
  {
    icon: <Layers size={24} />,
    title: "Particle layer",
    description: "12 animated particle components that drop in as visual upgrades to your core primitives.",
    gradient: "electric",
    large: true,
  },
]

function FeatureGrid({
  badge = "Why ParticleUI",
  heading = "Everything a component library",
  headingGradient = "should be.",
  description = "We've thought through every detail so you can focus on shipping your product.",
  features = defaultFeatures,
}: FeatureGridProps) {
  return (
    <section className="flex flex-col items-center gap-12 px-4 py-24">
      <div className="flex flex-col items-center gap-4 text-center max-w-xl">
        {badge && (
          <Badge variant="outline" className="border-[var(--color-accent-border)] text-[var(--color-accent-text)]">
            {badge}
          </Badge>
        )}
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {heading}{" "}
          <GradientText variant="electric">{headingGradient}</GradientText>
        </h2>
        <p className="text-[var(--color-text-2)]">{description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl auto-rows-fr">
        {features.map((f, i) => (
          <GlowCard
            key={i}
            className={["p-6 flex flex-col gap-4", f.large ? "sm:col-span-2 lg:col-span-1" : ""].filter(Boolean).join(" ")}
          >
            <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-dim)] border border-[var(--color-accent-border)] flex items-center justify-center text-[var(--color-accent)]">
              {f.icon}
            </div>
            <div className="flex flex-col gap-1.5">
              <GradientText variant={f.gradient ?? "electric"} className="text-base font-semibold">
                {f.title}
              </GradientText>
              <p className="text-sm text-[var(--color-text-3)] leading-relaxed">{f.description}</p>
            </div>
          </GlowCard>
        ))}
      </div>
    </section>
  )
}

export { FeatureGrid }
export type { Feature }
