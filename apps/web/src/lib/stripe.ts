import Stripe from "stripe"

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY is not set")
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-04-22.dahlia",
      typescript: true,
    })
  }
  return _stripe
}

// Convenience alias for callers that already check env at startup
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return Reflect.get(getStripe(), prop)
  },
})

export const PLANS = {
  pro: {
    priceId: process.env.STRIPE_PRO_PRICE_ID!,
    name: "Pro",
    amount: 14900, // $149 in cents
  },
  team: {
    priceId: process.env.STRIPE_TEAM_PRICE_ID!,
    name: "Team",
    amount: 29900, // $299 in cents
  },
} as const

export type PlanKey = keyof typeof PLANS
