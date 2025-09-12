import { pgTable, serial, integer, varchar, smallint, timestamp, text } from "drizzle-orm/pg-core";
import { garages } from "./garages";

export const garageVehicles = pgTable("garage_vehicles", {
  garageVehicleId: serial("garage_vehicle_id").primaryKey(),
  garageId: integer("garage_id").notNull().references(() => garages.garageId),
  make: varchar("make", { length: 120 }).notNull(),
  model: varchar("model", { length: 160 }).notNull(),
  yearFrom: smallint("year_from"),
  yearTo: smallint("year_to"),
  trim: varchar("trim", { length: 120 }),
  engine: varchar("engine", { length: 120 }),
  notes: text("notes"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
