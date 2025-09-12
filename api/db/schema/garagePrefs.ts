import { pgTable, serial, integer, boolean, varchar } from "drizzle-orm/pg-core";
import { garages } from "./garages";

export const garagePrefs = pgTable("garage_prefs", {
  id: serial("id").primaryKey(),
  garageId: integer("garage_id").notNull().references(() => garages.garageId),
  notifyEmail: boolean("notify_email").notNull().default(true),
  frequency: varchar("frequency", { length: 20 }).notNull().default("immediate"), // immediate|daily|weekly
});
