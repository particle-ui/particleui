# ADR 0006 — API token delivered via email at purchase time

**Status:** Accepted  
**Date:** 2026-05-16

## Context

After a successful Stripe Checkout, the system auto-generates an API token and must deliver it to the customer. Options: show on a post-purchase page, email it, or both.

## Decision

Auto-generate the token in the `checkout.session.completed` webhook and send it to the customer's email via Resend. Also show it in `/dashboard/tokens`.

## Alternatives considered

**Post-purchase success page shows token directly:**
- Requires the webhook to have fired before the redirect lands
- Stripe webhooks are asynchronous — the page might render before the token exists
- Would require polling or a delay, which is bad UX
- Success page is fragile: if user closes tab immediately, they lose the token

**No email — only dashboard:**
- User must log in immediately after checkout to see token
- If they're redirected and the webhook hasn't fired yet, the token isn't there
- Risk: user loses the token if they never check the dashboard

**Email the token (chosen):**
- Webhook fires independently of the redirect — timing doesn't matter
- Email is delivered even if the user closes the tab
- Industry standard for CLI API tokens (npm, GitHub, Vercel all email or show-once on page)
- Resend delivers within seconds; delay between purchase and email is imperceptible

## Reasons

1. **Reliability** — email delivery is independent of the page redirect race condition.
2. **Recovery** — if the user loses their token, they can check email (or regenerate in the dashboard).
3. **Precedent** — all major CLI token providers show token once on creation and optionally email it.

## Trade-offs accepted

- **Security** — sending tokens over email exposes them to anyone with email access. Mitigated by: tokens are revocable at any time from the dashboard; tokens authorize registry access only (no account control); token format `pui_*` is recognizable and scannable by secret-scanning tools.
- **Resend dependency** — email failure doesn't block license provisioning (try/catch in webhook), but the customer won't have their token. Fall-back: tokens are always visible in `/dashboard/tokens`.

## Consequences

- `RESEND_API_KEY` required in production.
- Email send failure is non-fatal: logged, does not fail the webhook response.
- Token shown in `/dashboard/tokens` as the primary recovery path.
- Welcome email includes setup instructions (`.env`, `components.json` snippet, install command).
