import { pgTable, integer, primaryKey } from "drizzle-orm/pg-core";
import { users } from "./users";
import { roles } from "./roles";

export const userRoles = pgTable("user_roles", {
  userId: integer("user_id").notNull().references(() => users.userId),
  roleId: integer("role_id").notNull().references(() => roles.roleId),
}, (t) => ({ pk: primaryKey({ columns: [t.userId, t.roleId] }) }));
