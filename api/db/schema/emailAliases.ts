import { pgTable, serial, integer, varchar, boolean, timestamp } from "drizzle-orm/pg-core";
import { orderSellers } from "./orderSellers";
import { users } from "./users";

export const emailAliases = pgTable("email_aliases", {
  aliasId: serial("alias_id").primaryKey(),
  alias: varchar("alias", { length: 80 }).notNull().unique(), // local-part only
  orderSellerId: integer("order_seller_id").notNull().references(() => orderSellers.orderSellerId),
  buyerUserId: integer("buyer_user_id").notNull().references(() => users.userId),
  vendorUserId: integer("vendor_user_id").notNull().references(() => users.userId),
  active: boolean("active").notNull().default(true),
  expiresAt: timestamp("expires_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
