import Link from "next/link"
import { CheckCircle, Sparkle, ArrowRight } from "@phosphor-icons/react/dist/ssr"
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
      "Noise Texture",
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
    <main className="min-h-svh bg-[#090909] text-white py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(0,212,255,0.25)] bg-[rgba(0,212,255,0.08)] px-3 py-1 text-xs text-[#00d4ff]">
            <Sparkle weight="fill" size={12} />
            No subscriptions · Lifetime updates
          </div>
          <h1 className="text-5xl font-bold mb-4">Simple pricing</h1>
          <p className="text-[#666] text-lg">
            One-time purchase. Own it forever.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-8 flex flex-col ${
                plan.highlight
                  ? "border-[rgba(0,212,255,0.3)] bg-[#111]"
                  : "border-white/[0.07] bg-[#0e0e0e]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-[#00d4ff] px-3 py-1 text-[10px] font-semibold text-black tracking-wide uppercase">
                    Popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className="text-sm text-[#555] font-medium mb-1">{plan.name}</p>
                <div className="flex items-end gap-1.5 mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-[#555] text-sm mb-1.5">{plan.period}</span>
                </div>
                <p className="text-sm text-[#555]">{plan.description}</p>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle
                      size={16}
                      weight="fill"
                      className={`mt-0.5 shrink-0 ${plan.highlight ? "text-[#00d4ff]" : "text-[#444]"}`}
                    />
                    <span className="text-[#aaa]">{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`flex items-center justify-center gap-2 w-full rounded-md py-2.5 text-sm font-medium transition-all ${
                  plan.highlight
                    ? "bg-white text-black hover:bg-[#eee]"
                    : "border border-white/10 text-[#888] hover:border-white/20 hover:text-white"
                }`}
              >
                {plan.cta}
                <ArrowRight size={14} weight="bold" />
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-[#444]">
          All prices in USD. VAT may apply. 14-day refund policy.
        </p>
      </div>
    </main>
  )
}
