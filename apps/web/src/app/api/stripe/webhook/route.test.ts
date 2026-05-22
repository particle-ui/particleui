import { afterEach, describe, expect, it, vi } from "vitest"
import type { NextRequest } from "next/server"
import type Stripe from "stripe"

const OLD_ENV = process.env

function request(signature: string | null): Request {
  return new Request("https://particleui.dev/api/stripe/webhook", {
    method: "POST",
    headers: signature ? { "stripe-signature": signature } : {},
    body: "{\"id\":\"evt_test\"}",
  })
}

function event(): Stripe.Event {
  return {
    id: "evt_test",
    object: "event",
    api_version: "2026-04-22.dahlia",
    created: 1_779_000_000,
    data: {
      object: {
        id: "evt_object",
        object: "charge",
      },
    },
    livemode: false,
    pending_webhooks: 1,
    request: null,
    type: "charge.refunded",
  } as unknown as Stripe.Event
}

async function importRoute({
  constructEvent,
  processStripeWebhookEvent,
}: {
  constructEvent: ReturnType<typeof vi.fn>
  processStripeWebhookEvent: ReturnType<typeof vi.fn>
}) {
  vi.resetModules()
  process.env = {
    ...OLD_ENV,
    STRIPE_SECRET_KEY: "sk_test_123",
    STRIPE_WEBHOOK_SECRET: "whsec_test",
  }

  vi.doMock("@/lib/stripe", () => ({
    stripe: {
      webhooks: {
        constructEvent,
      },
    },
  }))
  vi.doMock("@/db", () => ({ db: {} }))
  vi.doMock("@/lib/stripe/webhook", () => ({
    processStripeWebhookEvent,
  }))
  vi.doMock("@/lib/auth/token", () => ({
    createToken: vi.fn(),
  }))
  vi.doMock("@/lib/email", () => ({
    sendProWelcomeEmail: vi.fn(),
  }))

  return import("./route")
}

afterEach(() => {
  vi.resetModules()
  vi.restoreAllMocks()
  vi.doUnmock("@/lib/stripe")
  vi.doUnmock("@/db")
  vi.doUnmock("@/lib/stripe/webhook")
  vi.doUnmock("@/lib/auth/token")
  vi.doUnmock("@/lib/email")
  process.env = OLD_ENV
})

describe("Stripe webhook route signature verification", () => {
  it("rejects requests without a Stripe signature", async () => {
    const constructEvent = vi.fn()
    const processStripeWebhookEvent = vi.fn()
    const route = await importRoute({ constructEvent, processStripeWebhookEvent })

    const response = await route.POST(request(null) as unknown as NextRequest)

    expect(response.status).toBe(400)
    expect(constructEvent).not.toHaveBeenCalled()
    expect(processStripeWebhookEvent).not.toHaveBeenCalled()
  })

  it("rejects invalid Stripe signatures", async () => {
    const constructEvent = vi.fn(() => {
      throw new Error("invalid signature")
    })
    const processStripeWebhookEvent = vi.fn()
    const route = await importRoute({ constructEvent, processStripeWebhookEvent })

    const response = await route.POST(request("bad_sig") as unknown as NextRequest)

    expect(response.status).toBe(400)
    expect(constructEvent).toHaveBeenCalledWith("{\"id\":\"evt_test\"}", "bad_sig", "whsec_test")
    expect(processStripeWebhookEvent).not.toHaveBeenCalled()
  })

  it("processes events only after a valid Stripe signature is verified", async () => {
    const verifiedEvent = event()
    const constructEvent = vi.fn(() => verifiedEvent)
    const processStripeWebhookEvent = vi.fn(async () => ({ skipped: false }))
    const route = await importRoute({ constructEvent, processStripeWebhookEvent })

    const response = await route.POST(request("good_sig") as unknown as NextRequest)
    const body = await response.json()

    expect(response.status).toBe(200)
    expect(body).toEqual({ ok: true, skipped: false })
    expect(constructEvent).toHaveBeenCalledWith("{\"id\":\"evt_test\"}", "good_sig", "whsec_test")
    expect(processStripeWebhookEvent).toHaveBeenCalledWith(expect.anything(), verifiedEvent)
  })
})
