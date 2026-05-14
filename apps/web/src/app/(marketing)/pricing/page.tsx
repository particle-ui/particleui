import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = { title: "Pricing" }

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "All free components. Great for prototyping.",
    features: [
      "Glow Button",
      "Gradient Card",
      "Electric Badge",
      "Community support",
      "MIT licensed source",
    ],
    cta: "Get started",
    href: "/sign-up",
    highlight: false,
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
    cta: "Buy lifetime access",
    href: "/sign-up?plan=pro",
    highlight: true,
  },
  {
    name: "Team",
    price: "$299",
    period: "one-time",
    description: "Up to 5 developers. Same lifetime deal.",
    features: [
      "Everything in Pro",
      "5 API tokens",
      "Team dashboard",
      "Invoice / receipt",
    ],
    cta: "Buy team license",
    href: "/sign-up?plan=team",
    highlight: false,
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-svh bg-particle-950 text-white py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Simple pricing</h1>
          <p className="text-particle-400 text-lg">
            One-time purchase. No subscriptions. Lifetime updates.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-8 flex flex-col ${
                plan.highlight
                  ? "border-electric-500/60 bg-particle-900/80 shadow-[0_0_40px_oklch(68%_0.27_205_/_0.15)]"
                  : "border-particle-800 bg-particle-900/30"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-electric-500 px-3 py-1 text-xs font-medium text-white">
                    Most popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-1">{plan.name}</h2>
                <div className="flex items-end gap-1.5 mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-particle-400 text-sm mb-1">{plan.period}</span>
                </div>
                <p className="text-sm text-particle-400">{plan.description}</p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className="text-electric-400 mt-0.5 shrink-0">✓</span>
                    <span className="text-particle-300">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`block w-full rounded-md py-2.5 text-center text-sm font-medium transition-all ${
                  plan.highlight
                    ? "bg-electric-500 text-white hover:bg-electric-400 shadow-[0_0_16px_oklch(68%_0.27_205_/_0.3)]"
                    : "border border-particle-700 text-particle-300 hover:bg-particle-800 hover:text-white"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-particle-600">
          All prices in USD. VAT may apply. 14-day refund policy.
        </p>
      </div>
    </main>
  )
}
