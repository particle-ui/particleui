# ADR 0004 — Stripe over Lemon Squeezy for payment processing

**Status:** Accepted  
**Date:** 2026-05-16

## Context

ParticleUI Pro requires a payment processor to handle the one-time license purchase ($149 Pro / $299 Team). Lemon Squeezy was the original choice (webhook handler stub existed). Stripe was the alternate.

## Decision

Replace Lemon Squeezy with Stripe.

## Alternatives considered

| | Lemon Squeezy | Stripe |
|---|---|---|
| Tax handling | Automatic (LS acts as merchant of record) | Manual (requires Stripe Tax or own compliance) |
| Setup friction | Low — simple links, no SDK needed | Higher — SDK + webhook signature verification |
| Webhook reliability | Good | Excellent (retry, dashboard replay) |
| Billing Portal | Basic | Full (receipts, invoices, payment methods) |
| API maturity | Newer | Very mature, extensive SDK |
| Custom checkout | No — hosted only | Yes — Stripe Elements or hosted |
| Refund control | Via LS dashboard | Programmatic + dashboard |

## Reasons

1. **Explicit user direction** — the product owner specified Stripe.
2. **Webhook replay** — Stripe's webhook dashboard allows manual event replay during development and incident recovery. The LS stub had no equivalent, making production debugging harder.
3. **Billing Portal** — Stripe's portal lets customers download PDF receipts and invoices directly, which reduces support load. LS had no equivalent at the time of this decision.
4. **Programmatic refunds** — the `charge.refunded` webhook allows automatic plan downgrade on full refund. Implementing 14-day refund policy enforcement becomes auditable.
5. **No production data** — the LS integration was stub-only with no real transactions, so switching has zero migration cost.

## Trade-offs accepted

- **Tax liability** — Stripe is not a merchant of record. ParticleUI must handle VAT/sales tax compliance directly or enable Stripe Tax. LS would have handled this automatically.
- **More code** — the Stripe integration is ~3× more code than the LS stub due to webhook signature verification, checkout session creation, and billing portal session management.

## Consequences

- `LEMONSQUEEZY_*` env vars deprecated. New: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRO_PRICE_ID`, `STRIPE_TEAM_PRICE_ID`, `RESEND_API_KEY`.
- `ls_customer_id` / `ls_subscription_id` columns kept on `users` table for backward compat with dev-mode rows; new Stripe data goes to `stripe_customer_id` / `stripe_session_id`.
- Webhook endpoint: `POST /api/stripe/webhook` (public route, verifies signature before processing).
