import { pgTable, serial, integer, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { orderSellers } from "./orderSellers";

export const shipments = pgTable("shipments", {
  shipmentId: serial("shipment_id").primaryKey(),
  orderSellerId: integer("order_seller_id").notNull().references(() => orderSellers.orderSellerId),
  carrier: varchar("carrier", { length: 80 }),
  service: varchar("service", { length: 80 }),
  labelId: varchar("label_id", { length: 120 }),
  labelUrl: text("label_url"),
  trackingNumber: varchar("tracking_number", { length: 120 }),
  trackingUrl: text("tracking_url"),
  insuranceCents: integer("insurance_cents").default(0),
  status: varchar("status", { length: 40 }).notNull().default("purchased"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
