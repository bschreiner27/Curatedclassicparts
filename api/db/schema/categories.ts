import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  categoryId: serial("category_id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  slug: varchar("slug", { length: 140 }).notNull(),
  parentCategoryId: integer("parent_category_id"),
});
