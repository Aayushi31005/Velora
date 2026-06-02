import { z } from "zod";

const quantitySchema = z.coerce.number().int().positive().max(99);

export const cartItemParamSchema = z.object({
  params: z.object({
    cartItemId: z.string().min(1, "Cart item id is required"),
  }),
});

export const addToCartSchema = z.object({
  body: z.object({
    productId: z.string().min(1, "Product id is required"),
    quantity: quantitySchema.default(1),
  }),
});

export const updateCartItemSchema = z.object({
  params: z.object({
    cartItemId: z.string().min(1, "Cart item id is required"),
  }),
  body: z.object({
    quantity: quantitySchema,
  }),
});
