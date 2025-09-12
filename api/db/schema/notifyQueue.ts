import { pgTable, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { products } from "./products";

export const notifyQueue = pgTable("notify_queue", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.userId),
  productId: integer("product_id").notNull().references(() => products.productId),
  reason: varchar("reason", { length: 40 }).notNull().default("garage_match"),
  scheduledFor: timestamp("scheduled_for", { withTimezone: true }).defaultNow().notNull(),
  sentAt: timestamp("sent_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
