"use client"

import * as React from "react"
import { Users, Cube, Star, Certificate } from "@phosphor-icons/react"
import { GlowCard } from "@/components/ui/glow-card"
import { Counter } from "@/components/ui/counter"
import { Beam } from "@/components/ui/beam"

interface Stat {
  value: number
  suffix?: string
  prefix?: string
  label: string
  icon: React.ReactNode
}

interface StatsSectionProps {
  heading?: string
  description?: string
  stats?: Stat[]
}

const defaultStats: Stat[] = [
  {
    value: 50,
    suffix: "K+",
    label: "Developers",
    icon: <Users size={28} weight="duotone" className="text-[var(--color-accent)]" />,
  },
  {
    value: 60,
    suffix: "+",
    label: "Components",
    icon: <Cube size={28} weight="duotone" className="text-[var(--color-accent)]" />,
  },
  {
    value: 4.9,
    label: "Stars",
    icon: <Star size={28} weight="duotone" className="text-[var(--color-accent)]" />,
  },
  {
    value: 100,
    suffix: "%",
    label: "MIT Licensed",
    icon: <Certificate size={28} weight="duotone" className="text-[var(--color-accent)]" />,
  },
]

function StatsSection({
  heading = "Built for scale. Loved at every stage.",
  description = "From solo projects to enterprise products, ParticleUI scales with your team.",
  stats = defaultStats,
}: StatsSectionProps) {
  return (
    <section className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold tracking-tight text-[var(--color-text-1)]">
            {heading}
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-2)] max-w-xl mx-auto">
            {description}
          </p>
        </div>

        {/* Stats card */}
        <GlowCard className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-1)] overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-y divide-[var(--color-border)] sm:grid-cols-4 sm:divide-y-0">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 px-8 py-10 text-center"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--color-accent-border)] bg-[var(--color-accent-dim)]">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold tabular-nums text-[var(--color-text-1)]">
                  {stat.prefix}
                  <Counter
                    to={stat.value}
                    
                    className="inline"
                  />
                  {stat.suffix}
                </div>
                <p className="text-sm text-[var(--color-text-3)] font-medium">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Beam at bottom */}
          <div className="relative h-px">
            <Beam colorFrom="var(--color-accent)" duration={5} />
          </div>
        </GlowCard>
      </div>
    </section>
  )
}

export { StatsSection }
