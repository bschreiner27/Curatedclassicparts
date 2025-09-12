import { pgTable, serial, integer, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { emailAliases } from "./emailAliases";

export const emailEvents = pgTable("email_events", {
  id: serial("id").primaryKey(),
  aliasId: integer("alias_id").notNull().references(() => emailAliases.aliasId),
  direction: varchar("direction", { length: 12 }).notNull(), // inbound|outbound
  fromAddr: varchar("from_addr", { length: 200 }).notNull(),
  toAddr: varchar("to_addr", { length: 200 }).notNull(),
  subject: varchar("subject", { length: 300 }),
  text: text("text"),
  html: text("html"),
  providerMessageId: varchar("provider_message_id", { length: 180 }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
