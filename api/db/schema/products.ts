import { pgTable, serial, integer, varchar, text, boolean, timestamp, smallint } from "drizzle-orm/pg-core";
import { vendors } from "./vendors";
import { categories } from "./categories";

export const products = pgTable("products", {
  productId: serial("product_id").primaryKey(),
  vendorId: integer("vendor_id").notNull().references(() => vendors.vendorId),
  name: varchar("name", { length: 200 }).notNull(),
  description: text("description"),
  categoryId: integer("category_id").references(() => categories.categoryId),
  sku: varchar("sku", { length: 120 }).notNull(), // unique per vendor at app layer
  unitPriceCents: integer("unit_price_cents").notNull(),
  stockQuantity: integer("stock_quantity").notNull().default(0),
  isAvailable: boolean("is_available").notNull().default(true),
  status: varchar("status", { length: 30 }).notNull().default("pending_review"),
  // Seller-provided fit fields (MVP; optional)
  makeText: varchar("make_text", { length: 120 }),
  modelText: varchar("model_text", { length: 160 }),
  yearFrom: smallint("year_from"),
  yearTo: smallint("year_to"),
  additionalFits: text("additional_fits"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
