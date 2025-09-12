import { pgTable, serial, integer, varchar, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const garages = pgTable("garages", {
  garageId: serial("garage_id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.userId),
  name: varchar("name", { length: 120 }).notNull().default("My Garage"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
