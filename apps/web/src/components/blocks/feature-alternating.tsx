"use client"

import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { GlowCard } from "@/components/ui/glow-card"
import { GradientText } from "@/components/ui/gradient-text"
import { Beam } from "@/components/ui/beam"

interface AlternatingFeature {
  badge: string
  title: string
  titleGradient?: string
  description: string
  visual?: React.ReactNode
}

interface FeatureAlternatingProps {
  heading?: string
  description?: string
  features?: AlternatingFeature[]
}

const CodeBlock = ({ children }: { children: string }) => (
  <GlowCard className="overflow-hidden">
    <div className="p-3 border-b border-[var(--color-border)] flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full bg-[oklch(68%_0.22_25)]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[oklch(78%_0.2_90)]" />
      <span className="w-2.5 h-2.5 rounded-full bg-[oklch(72%_0.2_140)]" />
    </div>
    <pre className="p-4 text-xs font-mono text-[var(--color-text-2)] leading-relaxed overflow-auto"><code>{children}</code></pre>
    <div className="px-4 pb-3"><Beam colorFrom="var(--color-accent)" duration={4} /></div>
  </GlowCard>
)

const defaultFeatures: AlternatingFeature[] = [
  {
    badge: "Installation",
    title: "One command.",
    titleGradient: "Zero friction.",
    description: "Run the ParticleUI CLI to install any component directly into your project. You get the source — no black box, no version churn.",
    visual: (
      <CodeBlock>{`# Add a single component
npx particleui-cli add button

# Or add multiple at once
npx particleui-cli add glow-card marquee beam`}</CodeBlock>
    ),
  },
  {
    badge: "Customization",
    title: "Tokens, not magic.",
    titleGradient: "You control everything.",
    description: "ParticleUI runs on 4 OKLCH CSS variables. Change the accent color in globals.css and every component updates. No Tailwind config surgery.",
    visual: (
      <CodeBlock>{`:root {
  --color-accent: oklch(78% 0.17 200);   /* electric cyan  */
  --color-bg: oklch(5% 0.004 265);       /* near-black     */
  --color-surface-1: oklch(8% 0.004 265); /* card bg        */
  --color-text-1: oklch(97% 0 0);        /* headings       */
}`}</CodeBlock>
    ),
  },
  {
    badge: "Animation",
    title: "Particle layer.",
    titleGradient: "Wow-factor included.",
    description: "12 animated components that work as drop-in replacements for their core counterparts. Swap Button for ConfettiButton. Input for GlowInput. No refactoring.",
    visual: (
      <CodeBlock>{`// Before
import { Button } from "@/components/ui/button"
<Button>Submit</Button>

// After — zero prop changes
import { ConfettiButton } from "@/components/ui/confetti-button"
<ConfettiButton>Submit</ConfettiButton>`}</CodeBlock>
    ),
  },
]

function FeatureAlternating({
  heading = "How it works",
  description = "Fast to install. Easy to customize. Impossible to regret.",
  features = defaultFeatures,
}: FeatureAlternatingProps) {
  return (
    <section className="flex flex-col items-center gap-16 px-4 py-24 max-w-5xl mx-auto">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="text-[var(--color-text-2)] max-w-md">{description}</p>
      </div>

      <div className="flex flex-col gap-20 w-full">
        {features.map((f, i) => (
          <div
            key={i}
            className={[
              "grid grid-cols-1 lg:grid-cols-2 gap-10 items-center",
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className="flex flex-col gap-4">
              <Badge variant="outline" className="w-fit border-[var(--color-accent-border)] text-[var(--color-accent-text)]">
                {f.badge}
              </Badge>
              <h3 className="text-2xl font-bold tracking-tight">
                {f.title}{" "}
                {f.titleGradient && (
                  <GradientText variant="electric">{f.titleGradient}</GradientText>
                )}
              </h3>
              <p className="text-[var(--color-text-2)] leading-relaxed">{f.description}</p>
            </div>
            <div>{f.visual}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export { FeatureAlternating }
