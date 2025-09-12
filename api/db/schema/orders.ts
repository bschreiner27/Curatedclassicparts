import { pgTable, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const orders = pgTable("orders", {
  orderId: serial("order_id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.userId),
  status: varchar("status", { length: 30 }).notNull().default("cart"),
  currency: varchar("currency", { length: 3 }).notNull().default("USD"),
  itemsTotalCents: integer("items_total_cents").notNull().default(0),
  shippingTotalCents: integer("shipping_total_cents").notNull().default(0),
  taxTotalCents: integer("tax_total_cents").notNull().default(0),
  discountTotalCents: integer("discount_total_cents").notNull().default(0),
  grandTotalCents: integer("grand_total_cents").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
