# ADR 0005 — One-time payment, not subscription

**Status:** Accepted  
**Date:** 2026-05-16

## Context

Pro license pricing needed a payment model. Two canonical options: subscription (monthly/yearly) or one-time perpetual license.

## Decision

One-time purchase. $149 Pro, $299 Team. Lifetime updates included. 14-day refund policy.

## Alternatives considered

**Subscription** ($9/month or $79/year):
- Higher lifetime revenue per customer if retained
- Predictable MRR — better for planning
- Natural off-ramp if customer stops using the product
- Requires renewal enforcement logic (downgrade on cancellation)
- Higher support burden (failed payments, pause requests, cancellations)
- Developer-tools buyers resist subscriptions for code libraries — creates friction

**One-time (chosen):**
- Lower total revenue ceiling per customer
- Zero renewal infrastructure
- Fits the "shadcn model" — components are copied, not consumed as a service
- Matches competitive landscape (e.g. Tailwind UI, Radix Themes Pro)
- Simpler webhook logic: only `checkout.session.completed` and `charge.refunded` matter

## Reasons

1. **Buyer psychology** — developers strongly prefer owning tools outright. "No subscriptions" is a conversion advantage.
2. **Fits the distribution model** — components are source-copied into the user's project. The user has the code regardless of subscription status. A subscription that could cut access after the fact would conflict with the "you own it" value proposition.
3. **Infrastructure simplicity** — no subscription renewal webhooks, no dunning, no pause/resume. The only events that matter are "paid" and "refunded".
4. **Competitive positioning** — shadcn/ui is free; Tailwind UI is one-time. One-time aligns with that market expectation.

## Trade-offs accepted

- **Revenue ceiling** — a customer who pays once contributes ~$149, not $149 × years. MRR grows only with new customers.
- **No natural upsell loop** — no subscription renewal moment to introduce new tiers or features.
- **Refund risk** — the 14-day window means a customer could download everything and refund. Accepted because the audience (developers) has low fraud incidence and goodwill has long-term value.

## Consequences

- Stripe Checkout: `mode: "payment"` (not `"subscription"`).
- Stripe subscription-related webhooks (`invoice.*`, `customer.subscription.*`) are not needed and should not be subscribed to.
- Plan downgrade only triggered by `charge.refunded` (full refund).
