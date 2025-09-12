import { pgTable, serial, integer, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
import { orders } from "./orders";

export const payments = pgTable("payments", {
  paymentId: serial("payment_id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.orderId),
  provider: varchar("provider", { length: 30 }).notNull().default("stripe"),
  paymentIntentId: varchar("payment_intent_id", { length: 120 }),
  chargeId: varchar("charge_id", { length: 120 }),
  transferGroup: varchar("transfer_group", { length: 120 }),
  amountCents: integer("amount_cents").notNull(),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  status: varchar("status", { length: 40 }).notNull(),
  raw: jsonb("raw"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
