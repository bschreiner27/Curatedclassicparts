import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  roleId: serial("role_id").primaryKey(),
  roleName: varchar("role_name", { length: 50 }).notNull(), // Buyer, Vendor, Admin
});
