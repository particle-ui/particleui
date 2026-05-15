"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GradientText } from "@/components/ui/gradient-text"
import { Typewriter } from "@/components/ui/typewriter"
import { Beam } from "@/components/ui/beam"
import { Meteors } from "@/components/ui/meteors"
import { ArrowRight, Sparkles } from "lucide-react"

interface HeroCenteredProps {
  badge?: string
  headlinePre?: string
  headlineGradient?: string
  headlinePost?: string
  subwords?: string[]
  description?: string
  primaryCta?: string
  primaryHref?: string
  secondaryCta?: string
  secondaryHref?: string
  meteors?: boolean
}

function HeroCentered({
  badge = "Now in public beta",
  headlinePre = "Build UIs that",
  headlineGradient = "ship faster",
  headlinePost = "than your ideas.",
  subwords = ["Design systems.", "Component libraries.", "Production apps.", "Landing pages."],
  description = "ParticleUI gives you 60+ free, open-source components with a design language engineers actually want to use. Dark-first, Radix-powered, copy-paste ready.",
  primaryCta = "Browse components",
  primaryHref = "/docs/components/button",
  secondaryCta = "View on GitHub",
  secondaryHref = "https://github.com",
  meteors: showMeteors = true,
}: HeroCenteredProps) {
  return (
    <section className="relative flex flex-col items-center justify-center gap-6 px-4 py-28 text-center overflow-hidden">
      {showMeteors && <Meteors count={12} />}

      <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
        <Badge variant="outline" className="gap-1.5 text-[var(--color-accent)] border-[var(--color-accent-border)]">
          <Sparkles size={12} />
          {badge}
        </Badge>

        <h1 className="text-5xl font-bold tracking-tight leading-[1.1] sm:text-6xl">
          {headlinePre}{" "}
          <GradientText variant="electric">{headlineGradient}</GradientText>{" "}
          {headlinePost}
        </h1>

        <p className="text-lg text-[var(--color-text-2)] max-w-xl">
          <Typewriter words={subwords} className="text-[var(--color-accent-text)]" />{" "}
          {description}
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg">
            <a href={primaryHref}>
              {primaryCta}
              <ArrowRight size={16} className="ml-1" />
            </a>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href={secondaryHref}>{secondaryCta}</a>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <Beam colorFrom="var(--color-accent)" duration={4} />
      </div>
    </section>
  )
}

export { HeroCentered }
