"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { GradientText } from "@/components/ui/gradient-text"
import { Meteors } from "@/components/ui/meteors"
import { ArrowRight } from "lucide-react"

interface CtaSectionProps {
  heading?: string
  headingGradient?: string
  description?: string
  primaryCta?: string
  primaryHref?: string
  secondaryCta?: string
  secondaryHref?: string
  meteors?: boolean
}

function CtaSection({
  heading = "Start building today.",
  headingGradient = "Free, forever.",
  description = "60+ components. No credit card. MIT license. Copy the code and own it.",
  primaryCta = "Browse components",
  primaryHref = "/docs/components/button",
  secondaryCta = "View on GitHub",
  secondaryHref = "https://github.com",
  meteors: showMeteors = true,
}: CtaSectionProps) {
  return (
    <section className="relative flex flex-col items-center justify-center gap-6 px-4 py-28 text-center overflow-hidden border-y border-[var(--color-border)]">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_100%,oklch(78%_0.17_200_/_0.08)_0%,transparent_70%)]"
      />
      {showMeteors && <Meteors count={10} />}

      <div className="relative z-10 flex flex-col items-center gap-5 max-w-2xl">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {heading}{" "}
          <GradientText variant="electric">{headingGradient}</GradientText>
        </h2>
        <p className="text-lg text-[var(--color-text-2)] max-w-md">{description}</p>

        <div className="flex flex-wrap gap-3 justify-center">
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
    </section>
  )
}

export { CtaSection }
