import { pgTable, serial, integer } from "drizzle-orm/pg-core";
import { orders } from "./orders";
import { products } from "./products";

export const orderItems = pgTable("order_items", {
  orderItemId: serial("order_item_id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.orderId),
  orderSellerId: integer("order_seller_id"), // set after split; FK in app layer
  productId: integer("product_id").notNull().references(() => products.productId),
  quantity: integer("quantity").notNull(),
  unitPriceCents: integer("unit_price_cents").notNull(),
});
