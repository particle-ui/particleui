import type Stripe from "stripe"

export type PaidPlan = "pro" | "team"

export interface StoredWebhookEvent {
  eventId: string
}

export interface StripeWebhookStore {
  findWebhookEvent(eventId: string): Promise<StoredWebhookEvent | null>
  createWebhookEvent(record: {
    eventId: string
    eventName: string
    payload: string
  }): Promise<void>
  markWebhookEventProcessed(eventId: string): Promise<void>
  markWebhookEventFailed(eventId: string, payload: string): Promise<void>
  provisionUserPurchase(record: {
    userId: string
    plan: PaidPlan
    stripeCustomerId: string | null
    stripeSessionId: string
  }): Promise<void>
  findTeamByStripeSessionId(stripeSessionId: string): Promise<{ id: string } | null>
  createTeamForOwner(record: {
    ownerId: string
    stripeSessionId: string
  }): Promise<{ id: string } | null>
  addTeamOwner(record: {
    teamId: string
    userId: string
  }): Promise<void>
  createToken(userId: string, label: string): Promise<string>
  sendWelcomeEmail(record: {
    to: string
    plan: PaidPlan
    token: string
  }): Promise<void>
  downgradeCustomer(customerId: string): Promise<void>
  setCustomerPlan(customerId: string, plan: PaidPlan): Promise<void>
  setUserPlan(record: {
    userId: string
    plan: PaidPlan
    stripeCustomerId: string | null
  }): Promise<void>
}

export interface SanitizedStripeEvent {
  stripeEventId: string
  eventType: string
  apiVersion: string | null
  livemode: boolean
  stripeCreated: number
  objectType: string | null
  customerId: string | null
  subscriptionId: string | null
  checkoutSessionId: string | null
  chargeId: string | null
  processingError?: string
}

const MAX_PROCESSING_ERROR_LENGTH = 500

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

function stringField(record: Record<string, unknown>, key: string): string | null {
  const value = record[key]
  return typeof value === "string" ? value : null
}

function nestedId(record: Record<string, unknown>, key: string): string | null {
  const value = record[key]
  if (typeof value === "string") return value
  if (isRecord(value)) return stringField(value, "id")
  return null
}

function objectType(value: unknown): string | null {
  return isRecord(value) ? stringField(value, "object") : null
}

function eventObject(event: Stripe.Event): Record<string, unknown> {
  const value: unknown = event.data.object
  return isRecord(value) ? value : {}
}

function truncateProcessingError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error)
  return message
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[redacted-email]")
    .replace(/\b(?:pm|card|src)_[A-Za-z0-9_]+\b/g, "[redacted-payment-method]")
    .slice(0, MAX_PROCESSING_ERROR_LENGTH)
}

export function sanitizeStripeEventForStorage(
  event: Stripe.Event,
  processingError?: unknown
): SanitizedStripeEvent {
  const object = eventObject(event)
  const type = objectType(object)

  const sanitized: SanitizedStripeEvent = {
    stripeEventId: event.id,
    eventType: event.type,
    apiVersion: event.api_version ?? null,
    livemode: event.livemode,
    stripeCreated: event.created,
    objectType: type,
    customerId: nestedId(object, "customer"),
    subscriptionId: type === "subscription" ? stringField(object, "id") : nestedId(object, "subscription"),
    checkoutSessionId: type === "checkout.session" ? stringField(object, "id") : null,
    chargeId: type === "charge" ? stringField(object, "id") : null,
  }

  if (processingError !== undefined) {
    sanitized.processingError = truncateProcessingError(processingError)
  }

  return sanitized
}

export function getStripeEventProcessingFields(event: Stripe.Event): string {
  return JSON.stringify(sanitizeStripeEventForStorage(event))
}

export function getFailedStripeEventProcessingFields(event: Stripe.Event, error: unknown): string {
  return JSON.stringify(sanitizeStripeEventForStorage(event, error))
}

function parsePlan(value: unknown): PaidPlan {
  return value === "team" ? "team" : "pro"
}

function metadataValue(object: Record<string, unknown>, key: string): string | null {
  const metadata = object.metadata
  if (!isRecord(metadata)) return null
  return stringField(metadata, key)
}

function emailFromCheckoutSession(session: Stripe.Checkout.Session): string {
  return session.metadata?.email ?? session.customer_details?.email ?? ""
}

function customerIdFromObject(object: Record<string, unknown>): string | null {
  return nestedId(object, "customer")
}

function isPaidSubscriptionStatus(status: string | null): boolean {
  return status === "active" || status === "trialing"
}

function shouldDisableSubscriptionStatus(status: string | null): boolean {
  return status === "canceled" || status === "unpaid" || status === "past_due" || status === "incomplete_expired"
}

async function handleCheckoutCompleted(
  store: StripeWebhookStore,
  session: Stripe.Checkout.Session
): Promise<void> {
  const userId = session.metadata?.userId
  const plan = parsePlan(session.metadata?.plan)
  const email = emailFromCheckoutSession(session)
  const stripeCustomerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id ?? null

  if (!userId) {
    throw new Error("checkout.session.completed missing userId in metadata")
  }

  await store.provisionUserPurchase({
    userId,
    plan,
    stripeCustomerId,
    stripeSessionId: session.id,
  })

  if (plan === "team") {
    const existingTeam = await store.findTeamByStripeSessionId(session.id)
    if (!existingTeam) {
      const newTeam = await store.createTeamForOwner({ ownerId: userId, stripeSessionId: session.id })
      if (newTeam) {
        await store.addTeamOwner({ teamId: newTeam.id, userId })
      }
    }
  }

  const token = await store.createToken(
    userId,
    plan === "team" ? "Team auto-issued token" : "Auto-issued on purchase"
  )

  if (email) {
    await store.sendWelcomeEmail({ to: email, plan, token })
  }
}

async function handleRefund(store: StripeWebhookStore, charge: Stripe.Charge): Promise<void> {
  const customerId = typeof charge.customer === "string" ? charge.customer : charge.customer?.id
  if (!customerId || !charge.refunded) return

  await store.downgradeCustomer(customerId)
}

async function handleSubscriptionEvent(store: StripeWebhookStore, subscription: Stripe.Subscription) {
  const object = subscription as unknown as Record<string, unknown>
  const customerId = customerIdFromObject(object)
  const status = typeof subscription.status === "string" ? subscription.status : null

  if (shouldDisableSubscriptionStatus(status)) {
    if (customerId) {
      await store.downgradeCustomer(customerId)
    }
    return
  }

  if (!isPaidSubscriptionStatus(status)) return

  const plan = parsePlan(metadataValue(object, "plan"))
  const userId = metadataValue(object, "userId")

  if (userId) {
    await store.setUserPlan({ userId, plan, stripeCustomerId: customerId })
  } else if (customerId) {
    await store.setCustomerPlan(customerId, plan)
  }
}

export async function processStripeWebhookEvent(
  store: StripeWebhookStore,
  event: Stripe.Event
): Promise<{ skipped: boolean }> {
  const existing = await store.findWebhookEvent(event.id)
  if (existing) return { skipped: true }

  await store.createWebhookEvent({
    eventId: event.id,
    eventName: event.type,
    payload: getStripeEventProcessingFields(event),
  })

  try {
    if (event.type === "checkout.session.completed") {
      await handleCheckoutCompleted(store, event.data.object as Stripe.Checkout.Session)
    } else if (event.type === "charge.refunded") {
      await handleRefund(store, event.data.object as Stripe.Charge)
    } else if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      await handleSubscriptionEvent(store, event.data.object as Stripe.Subscription)
    }

    await store.markWebhookEventProcessed(event.id)
  } catch (error) {
    await store.markWebhookEventFailed(event.id, getFailedStripeEventProcessingFields(event, error))
  }

  return { skipped: false }
}
