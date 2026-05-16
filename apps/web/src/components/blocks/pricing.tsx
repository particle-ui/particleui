"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { CheckCircle, X } from "lucide-react"

interface PricingTier {
  name: string
  badge?: string
  monthlyPrice: number
  annualPrice: number
  description: string
  features: { text: string; included: boolean }[]
  cta: string
  ctaHref: string
  featured?: boolean
}

interface PricingSectionProps {
  heading?: string
  description?: string
  tiers?: PricingTier[]
}

const defaultTiers: PricingTier[] = [
  {
    name: "Free",
    monthlyPrice: 0,
    annualPrice: 0,
    description: "Everything you need to build great products.",
    features: [
      { text: "60+ open-source components", included: true },
      { text: "Particle animation layer", included: true },
      { text: "particleui-cli included", included: true },
      { text: "MIT license", included: true },
      { text: "Pro blocks", included: false },
      { text: "Theme generator", included: false },
    ],
    cta: "Get started free",
    ctaHref: "/docs/getting-started/installation",
  },
  {
    name: "Pro",
    badge: "Most popular",
    monthlyPrice: 29,
    annualPrice: 19,
    description: "Blocks, themes, and tools for ambitious teams.",
    featured: true,
    features: [
      { text: "Everything in Free", included: true },
      { text: "30+ Pro blocks", included: true },
      { text: "Dashboard templates", included: true },
      { text: "Theme generator", included: true },
      { text: "Figma design system", included: true },
      { text: "Priority support", included: false },
    ],
    cta: "Start Pro trial",
    ctaHref: "/pricing",
  },
  {
    name: "Enterprise",
    monthlyPrice: 99,
    annualPrice: 79,
    description: "Custom contracts, SLAs, and dedicated support.",
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Custom themes", included: true },
      { text: "Private registry", included: true },
      { text: "SSO & access controls", included: true },
      { text: "Priority support", included: true },
      { text: "Dedicated Slack channel", included: true },
    ],
    cta: "Contact sales",
    ctaHref: "/contact",
  },
]

function PricingSection({
  heading = "Simple, transparent pricing",
  description = "Start free. Upgrade when you need more.",
  tiers = defaultTiers,
}: PricingSectionProps) {
  const [annual, setAnnual] = React.useState(false)

  return (
    <section className="flex flex-col items-center gap-10 px-4 py-24">
      <div className="flex flex-col items-center gap-4 text-center max-w-xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{heading}</h2>
        <p className="text-[var(--color-text-2)]">{description}</p>

        <div className="flex items-center gap-3 mt-2">
          <Label htmlFor="billing-toggle" className="text-[var(--color-text-2)]">Monthly</Label>
          <Switch
            id="billing-toggle"
            checked={annual}
            onCheckedChange={setAnnual}
          />
          <Label htmlFor="billing-toggle" className="text-[var(--color-text-2)]">
            Annual{" "}
            <span className="ml-1 text-[var(--color-accent)] text-xs font-semibold">Save 35%</span>
          </Label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 w-full max-w-5xl">
        {tiers.map((tier) => (
          <Card
            key={tier.name}
            className={[
              "flex flex-col",
              tier.featured
                ? "border-[var(--color-accent-border)] shadow-[0_0_40px_-4px_oklch(78%_0.17_200_/_0.25)] relative"
                : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {tier.badge && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-[var(--color-accent)] text-[var(--color-bg)] border-0 px-3">
                  {tier.badge}
                </Badge>
              </div>
            )}
            <CardHeader className="gap-2">
              <CardTitle className="text-lg">{tier.name}</CardTitle>
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold tabular-nums">
                  ${annual ? tier.annualPrice : tier.monthlyPrice}
                </span>
                {tier.monthlyPrice > 0 && (
                  <span className="text-[var(--color-text-3)] mb-1">/mo</span>
                )}
              </div>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2.5 flex-1">
              {tier.features.map((f) => (
                <div key={f.text} className="flex items-center gap-2.5 text-sm">
                  {f.included ? (
                    <CheckCircle size={15} className="shrink-0 text-[var(--color-accent)]" />
                  ) : (
                    <X size={15} className="shrink-0 text-[var(--color-text-4)]" />
                  )}
                  <span className={f.included ? "text-[var(--color-text-2)]" : "text-[var(--color-text-4)]"}>
                    {f.text}
                  </span>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button
                asChild
                variant={tier.featured ? "default" : "outline"}
                className="w-full"
              >
                <a href={tier.ctaHref}>{tier.cta}</a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

export { PricingSection }
export type { PricingTier }
