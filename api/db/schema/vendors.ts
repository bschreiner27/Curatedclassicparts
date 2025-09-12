import { pgTable, serial, integer, varchar, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const vendors = pgTable("vendors", {
  vendorId: serial("vendor_id").primaryKey(),
  userId: integer("user_id").notNull().unique().references(() => users.userId),
  storeName: varchar("store_name", { length: 140 }).notNull().unique(),
  storeDescription: text("store_description"),
  storeLogoUrl: text("store_logo_url"),
  isApproved: boolean("is_approved").notNull().default(false),
  isActive: boolean("is_active").notNull().default(false),
  stripeAccountId: varchar("stripe_account_id", { length: 120 }),
  onboardingStatus: varchar("onboarding_status", { length: 40 }),
  tosAcceptedAt: timestamp("tos_accepted_at", { withTimezone: true }),
  taxPolicyAcceptedAt: timestamp("tax_policy_accepted_at", { withTimezone: true }),
  shipFromCity: varchar("ship_from_city", { length: 120 }),
  shipFromRegion: varchar("ship_from_region", { length: 120 }),
  shipFromPostal: varchar("ship_from_postal", { length: 30 }),
  shipFromCountry: varchar("ship_from_country", { length: 2 }),
  referrerCode: varchar("referrer_code", { length: 32 }),
  referrerCodeAssignedAt: timestamp("referrer_code_assigned_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
