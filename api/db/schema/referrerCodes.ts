import { pgTable, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const referrerCodes = pgTable("referrer_codes", {
  code: varchar("code", { length: 32 }).primaryKey(),
  label: varchar("label", { length: 120 }).notNull(),
  notes: text("notes"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  createdBy: varchar("created_by", { length: 36 }),
});
