import { pgTable, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core";
import { orders } from "./orders";
import { vendors } from "./vendors";

export const orderSellers = pgTable("order_sellers", {
  orderSellerId: serial("order_seller_id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.orderId),
  vendorId: integer("vendor_id").notNull().references(() => vendors.vendorId),
  status: varchar("status", { length: 30 }).notNull().default("pending"),
  subtotalCents: integer("subtotal_cents").notNull(),
  shippingCents: integer("shipping_cents").notNull().default(0),
  taxCents: integer("tax_cents").notNull().default(0),
  commissionRateBps: integer("commission_rate_bps").notNull(),
  commissionCents: integer("commission_cents").notNull(),
  payoutStatus: varchar("payout_status", { length: 30 }).notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
