import Link from "next/link"
import { Check, Sparkle } from "@phosphor-icons/react/dist/ssr"
import type { Metadata } from "next"
import { Nav } from "../_components/nav"

export const metadata: Metadata = { title: "Pricing" }

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "All free components. Great for prototyping.",
    features: [
      "60+ free components, MIT licensed",
      "Radix UI primitives under the hood",
      "shadcn CLI compatible",
      "React · Vue · Svelte",
      "OKLCH design tokens",
      "Community support",
    ],
    cta: "Get started",
    href: "/sign-up",
    highlight: false,
    note: null,
  },
  {
    name: "Pro",
    price: "$149",
    period: "one-time",
    description: "All components, now and future. Lifetime access.",
    features: [
      "Everything in Free",
      "Particle Hero + all Pro components",
      "Full page blocks & templates",
      "Bundled Claude skills",
      "ParticleUI MCP server",
      "Vue & Svelte registries",
      "Priority support",
      "Lifetime updates",
    ],
    cta: "Get Pro access",
    href: "/dashboard/plan",
    highlight: true,
    note: null,
  },
  {
    name: "Team",
    price: "$299",
    period: "one-time",
    description: "Up to 5 developers. One purchase, shared forever.",
    features: [
      "Everything in Pro",
      "5 shared API tokens",
      "Team billing — one invoice",
      "Up to 5 developer seats",
    ],
    cta: "Get team license",
    href: "/dashboard/plan",
    highlight: false,
    note: "$60/seat — better than Pro per developer",
  },
]

const FAQ = [
  { q: "Is this really a one-time purchase?", a: "Yes. Pay once, use forever. No monthly fees, no renewal notices. Future components and updates are included." },
  { q: "Can I use Pro on multiple projects?", a: "Yes. One Pro license covers unlimited personal and commercial projects. The Team license covers up to 5 developers at one company." },
  { q: "What's the refund policy?", a: "14-day no-questions-asked refund. Email us within 14 days of purchase and you'll get a full refund." },
  { q: "What happens if ParticleUI shuts down?", a: "You already have the code — components are copied into your project at install time. Even if we disappear tomorrow, your codebase keeps working." },
  { q: "Do components work with an existing shadcn/ui project?", a: "Yes. ParticleUI is built on the same shadcn registry format. Install individual components alongside your existing ones — there's no conflict." },
  { q: "Is TypeScript required?", a: "No, but all components are written in TypeScript and ship with full type definitions. They work in JavaScript projects too." },
]

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="min-h-svh bg-bg text-text-1 pt-24 pb-20 px-6">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface-1 px-3.5 py-1.5 text-xs text-text-3">
              <Sparkle weight="fill" size={12} className="text-accent" />
              No subscriptions · Lifetime updates
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent mb-3">
              Pricing
            </p>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-[-0.05em] mb-4">
              Simple pricing
            </h1>
            <p className="text-lg text-text-3">One-time purchase. Own it forever.</p>
          </div>

          {/* Plans grid */}
          <div className="grid md:grid-cols-3 gap-5">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 flex flex-col overflow-hidden ${
                  plan.highlight
                    ? "bg-surface-1 border-accent-border"
                    : "bg-surface-1 border-border"
                }`}
              >
                {/* Accent glow overlay for Pro */}
                {plan.highlight && (
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-10"
                    style={{ background: "radial-gradient(circle, var(--color-accent), transparent)" }}
                  />
                )}

                {/* Popular badge */}
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-accent text-bg px-3 py-1 text-[10px] font-semibold tracking-wide uppercase">
                      Popular
                    </span>
                  </div>
                )}

                {/* Plan info */}
                <div className="mb-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-4 mb-2">
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1.5 mb-1">
                    <span className="text-4xl font-bold text-text-1">{plan.price}</span>
                    <span className="text-sm text-text-4 mb-1.5">{plan.period}</span>
                  </div>
                  {plan.note && (
                    <p className="text-xs text-text-4 mt-1">{plan.note}</p>
                  )}
                  <p className="text-sm text-text-3 mt-2">{plan.description}</p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check
                        size={14}
                        weight="bold"
                        className={`mt-0.5 shrink-0 ${plan.highlight ? "text-accent" : "text-text-4"}`}
                      />
                      <span className="text-text-2">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={plan.href}
                  className={`flex items-center justify-center gap-2 w-full rounded-xl py-3 text-sm font-medium transition-all ${
                    plan.highlight
                      ? "bg-accent text-bg hover:opacity-90"
                      : "border border-border text-text-3 hover:text-text-1 hover:border-border-hover"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p className="text-sm text-text-4 text-center mt-8">
            All prices in USD. VAT may apply. 14-day refund policy.
          </p>

          {/* FAQ */}
          <div className="mt-24 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold tracking-[-0.04em] text-center mb-10">Frequently asked questions</h2>
            <div className="divide-y divide-border">
              {FAQ.map(({q, a}) => (
                <div key={q} className="py-6">
                  <p className="font-semibold text-text-1 mb-2">{q}</p>
                  <p className="text-sm text-text-3 leading-[1.75]">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
