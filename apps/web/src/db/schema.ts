import { pgTable, text, timestamp, boolean, uuid } from "drizzle-orm/pg-core"

export const users = pgTable("users", {
  id: text("id").primaryKey(), // Clerk user ID
  email: text("email").notNull(),
  plan: text("plan", { enum: ["free", "pro"] }).notNull().default("free"),
  lsCustomerId: text("ls_customer_id"),
  lsSubscriptionId: text("ls_subscription_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const apiTokens = pgTable("api_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
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
