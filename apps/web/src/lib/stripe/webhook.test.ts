import { describe, expect, it, vi } from "vitest"
import type Stripe from "stripe"
import {
  processStripeWebhookEvent,
  sanitizeStripeEventForStorage,
  type PaidPlan,
  type StoredWebhookEvent,
  type StripeWebhookStore,
} from "./webhook"

function stripeEvent(
  type: Stripe.Event.Type,
  object: Record<string, unknown>,
  id = `evt_${type.replaceAll(".", "_")}`
): Stripe.Event {
  return {
    id,
    object: "event",
    api_version: "2026-04-22.dahlia",
    created: 1_779_000_000,
    data: {
      object,
    },
    livemode: false,
    pending_webhooks: 1,
    request: null,
    type,
  } as unknown as Stripe.Event
}

function checkoutSession(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: "cs_test_123",
    object: "checkout.session",
    customer: "cus_123",
    customer_details: {
      email: "buyer@example.com",
      address: {
        line1: "1 Private St",
      },
    },
    metadata: {
      userId: "user_123",
      plan: "pro",
      email: "buyer@example.com",
      internalNote: "do not persist",
    },
    payment_method_types: ["card"],
    ...overrides,
  }
}

function subscription(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    id: "sub_123",
    object: "subscription",
    customer: "cus_123",
    status: "active",
    metadata: {
      userId: "user_123",
      plan: "team",
      privateNote: "do not persist",
    },
    default_payment_method: {
      id: "pm_123",
      card: {
        last4: "4242",
      },
    },
    ...overrides,
  }
}

function createStore(existingEvents: StoredWebhookEvent[] = []): StripeWebhookStore & {
  events: Map<string, { eventName: string; payload: string; processed: boolean }>
  provisionedPurchases: Array<{
    userId: string
    plan: PaidPlan
    stripeCustomerId: string | null
    stripeSessionId: string
  }>
  customerPlans: Array<{ customerId: string; plan: PaidPlan }>
  userPlans: Array<{ userId: string; plan: PaidPlan; stripeCustomerId: string | null }>
  downgradedCustomers: string[]
  createdTokens: Array<{ userId: string; label: string }>
} {
  const events = new Map<string, { eventName: string; payload: string; processed: boolean }>()
  const provisionedPurchases: Array<{
    userId: string
    plan: PaidPlan
    stripeCustomerId: string | null
    stripeSessionId: string
  }> = []
  const customerPlans: Array<{ customerId: string; plan: PaidPlan }> = []
  const userPlans: Array<{ userId: string; plan: PaidPlan; stripeCustomerId: string | null }> = []
  const downgradedCustomers: string[] = []
  const createdTokens: Array<{ userId: string; label: string }> = []

  for (const event of existingEvents) {
    events.set(event.eventId, { eventName: "existing", payload: "{}", processed: true })
  }

  return {
    events,
    provisionedPurchases,
    customerPlans,
    userPlans,
    downgradedCustomers,
    createdTokens,
    async findWebhookEvent(eventId) {
      return events.has(eventId) ? { eventId } : null
    },
    async createWebhookEvent(record) {
      events.set(record.eventId, {
        eventName: record.eventName,
        payload: record.payload,
        processed: false,
      })
    },
    async markWebhookEventProcessed(eventId) {
      const event = events.get(eventId)
      if (event) {
        event.processed = true
      }
    },
    async markWebhookEventFailed(eventId, payload) {
      const event = events.get(eventId)
      if (event) {
        event.payload = payload
        event.processed = false
      }
    },
    async provisionUserPurchase(record) {
      provisionedPurchases.push(record)
    },
    async findTeamByStripeSessionId() {
      return null
    },
    async createTeamForOwner() {
      return { id: "team_123" }
    },
    async addTeamOwner() {},
    async createToken(userId, label) {
      createdTokens.push({ userId, label })
      return "pui_created_token"
    },
    async sendWelcomeEmail() {},
    async downgradeCustomer(customerId) {
      downgradedCustomers.push(customerId)
    },
    async setCustomerPlan(customerId, plan) {
      customerPlans.push({ customerId, plan })
    },
    async setUserPlan(record) {
      userPlans.push(record)
    },
  }
}

describe("Stripe webhook storage sanitization", () => {
  it("stores minimal event metadata without raw Stripe objects", () => {
    const event = stripeEvent("checkout.session.completed", checkoutSession())
    const sanitized = sanitizeStripeEventForStorage(event)
    const serialized = JSON.stringify(sanitized)

    expect(sanitized).toEqual({
      stripeEventId: event.id,
      eventType: "checkout.session.completed",
      apiVersion: "2026-04-22.dahlia",
      livemode: false,
      stripeCreated: 1_779_000_000,
      objectType: "checkout.session",
      customerId: "cus_123",
      subscriptionId: null,
      checkoutSessionId: "cs_test_123",
      chargeId: null,
    })
    expect(serialized).not.toContain("buyer@example.com")
    expect(serialized).not.toContain("1 Private St")
    expect(serialized).not.toContain("payment_method")
    expect(serialized).not.toContain("internalNote")
  })

  it("records unknown event types minimally and marks them processed", async () => {
    const store = createStore()
    const event = stripeEvent("account.updated", {
      id: "acct_123",
      object: "account",
      metadata: {
        privateNote: "do not persist",
      },
    })

    await expect(processStripeWebhookEvent(store, event)).resolves.toEqual({ skipped: false })

    const stored = store.events.get(event.id)
    expect(stored?.processed).toBe(true)
    expect(stored?.eventName).toBe("account.updated")
    expect(stored?.payload).not.toContain("privateNote")
  })
})

describe("Stripe payment provisioning", () => {
  it("provisions checkout.session.completed for the correct user and plan", async () => {
    const store = createStore()
    const event = stripeEvent("checkout.session.completed", checkoutSession())

    await processStripeWebhookEvent(store, event)

    expect(store.provisionedPurchases).toEqual([
      {
        userId: "user_123",
        plan: "pro",
        stripeCustomerId: "cus_123",
        stripeSessionId: "cs_test_123",
      },
    ])
    expect(store.createdTokens).toEqual([
      { userId: "user_123", label: "Auto-issued on purchase" },
    ])
    expect(store.events.get(event.id)?.payload).not.toContain("buyer@example.com")
  })

  it("does not provision duplicate tokens or purchases when an event is replayed", async () => {
    const store = createStore()
    const event = stripeEvent("checkout.session.completed", checkoutSession())

    await processStripeWebhookEvent(store, event)
    await expect(processStripeWebhookEvent(store, event)).resolves.toEqual({ skipped: true })

    expect(store.provisionedPurchases).toHaveLength(1)
    expect(store.createdTokens).toHaveLength(1)
  })

  it("updates a paid subscription to the plan in sanitized metadata", async () => {
    const store = createStore()
    const event = stripeEvent("customer.subscription.updated", subscription())

    await processStripeWebhookEvent(store, event)

    expect(store.userPlans).toEqual([
      { userId: "user_123", plan: "team", stripeCustomerId: "cus_123" },
    ])
    expect(store.events.get(event.id)?.payload).not.toContain("pm_123")
    expect(store.events.get(event.id)?.payload).not.toContain("4242")
  })

  it("downgrades delinquent subscriptions so Pro access is disabled", async () => {
    const store = createStore()
    const event = stripeEvent("customer.subscription.updated", subscription({ status: "past_due" }))

    await processStripeWebhookEvent(store, event)

    expect(store.downgradedCustomers).toEqual(["cus_123"])
    expect(store.userPlans).toEqual([])
  })

  it("downgrades cancelled subscriptions", async () => {
    const store = createStore()
    const event = stripeEvent("customer.subscription.deleted", subscription({ status: "canceled" }))

    await processStripeWebhookEvent(store, event)

    expect(store.downgradedCustomers).toEqual(["cus_123"])
  })

  it("downgrades fully refunded charges", async () => {
    const store = createStore()
    const event = stripeEvent("charge.refunded", {
      id: "ch_123",
      object: "charge",
      customer: "cus_123",
      refunded: true,
      billing_details: {
        address: {
          line1: "1 Private St",
        },
      },
    })

    await processStripeWebhookEvent(store, event)

    expect(store.downgradedCustomers).toEqual(["cus_123"])
    expect(store.events.get(event.id)?.payload).not.toContain("1 Private St")
  })

  it("records processing errors safely without storing raw event bodies", async () => {
    const store = createStore()
    store.createToken = vi.fn(async () => {
      throw new Error("email=buyer@example.com payment_method=pm_123 ".repeat(20))
    })
    const event = stripeEvent("checkout.session.completed", checkoutSession())

    await processStripeWebhookEvent(store, event)

    const payload = store.events.get(event.id)?.payload ?? ""
    expect(store.events.get(event.id)?.processed).toBe(false)
    expect(payload.length).toBeLessThan(900)
    expect(payload).toContain("processingError")
    expect(payload).not.toContain("customer_details")
    expect(payload).not.toContain("1 Private St")
  })
})
