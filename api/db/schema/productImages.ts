import { pgTable, serial, integer, text, boolean, smallint } from "drizzle-orm/pg-core";
import { products } from "./products";

export const productImages = pgTable("product_images", {
  imageId: serial("image_id").primaryKey(),
  productId: integer("product_id").notNull().references(() => products.productId),
  imageUrl: text("image_url").notNull(),
  isPrimary: boolean("is_primary").notNull().default(false),
  position: smallint("position").default(0),
});
