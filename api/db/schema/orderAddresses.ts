import { pgTable, serial, integer, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { orders } from "./orders";

export const orderAddresses = pgTable("order_addresses", {
  addressId: serial("address_id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.orderId),
  type: varchar("type", { length: 20 }).notNull(), // shipping|billing
  recipientName: varchar("recipient_name", { length: 140 }),
  phone: varchar("phone", { length: 40 }),
  line1: varchar("line1", { length: 160 }),
  line2: varchar("line2", { length: 160 }),
  city: varchar("city", { length: 120 }),
  region: varchar("region", { length: 120 }),
  postalCode: varchar("postal_code", { length: 30 }),
  country: varchar("country", { length: 2 }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
