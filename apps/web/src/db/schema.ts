import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk user ID
  email: text("email").notNull(),
  plan: text("plan", { enum: ["free", "pro", "team"] }).notNull().default("free"),
  stripeCustomerId: text("stripe_customer_id"),
  stripeSessionId: text("stripe_session_id"),   // Checkout Session ID for receipt lookup
  // legacy Lemon Squeezy fields — kept so existing dev-mode rows don't break
  lsCustomerId: text("ls_customer_id"),
  lsSubscriptionId: text("ls_subscription_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const apiTokens = pgTable("api_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),   // legacy plaintext — kept for backcompat
  tokenHash: text("token_hash").unique(),    // SHA-256 of plaintext — new tokens only
  tokenPrefix: text("token_prefix"),         // first 12 chars for display (e.g. pui_a3f2b1c0)
  label: text("label").notNull().default("Default"),
  revokedAt: timestamp("revoked_at"),
  lastUsedAt: timestamp("last_used_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const webhookEvents = pgTable("webhook_events", {
  id: uuid("id").primaryKey().defaultRandom(),
  eventId: text("event_id").notNull().unique(),
  eventName: text("event_name").notNull(),
  processed: boolean("processed").notNull().default(false),
  payload: text("payload").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const componentInstalls = pgTable("component_installs", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  tokenId: uuid("token_id").references(() => apiTokens.id, { onDelete: "set null" }),
  componentName: text("component_name").notNull(),
  framework: text("framework").notNull().default("react"),
  tier: text("tier").notNull().default("core"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const aiGenerations = pgTable("ai_generations", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  prompt: text("prompt").notNull(),
  outputJson: text("output_json").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const themes = pgTable("themes", {
  id: uuid("id").primaryKey().defaultRandom(),
  slug: text("slug").notNull().unique(),
  userId: text("user_id").references(() => users.id, { onDelete: "set null" }),
  name: text("name").notNull(),
  tokensJson: text("tokens_json").notNull().default("{}"),
  isPublic: boolean("is_public").notNull().default(false),
  forkOf: uuid("fork_of"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
})
