import { z } from "zod";

import {
  addToCartSchema,
  cartItemParamSchema,
  updateCartItemSchema,
} from "./cart.validation";

export type CartItemParams = z.infer<typeof cartItemParamSchema>;
export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
