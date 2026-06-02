import { api } from "./client";

import type {
  AddToCartPayload,
  CartResponse,
  UpdateCartItemPayload,
} from "../features/cart/types/cart";

export const cartApi = {
  getCart: async () => {
    const { data } = await api.get<CartResponse>("/cart");
    return data;
  },
  addToCart: async (payload: AddToCartPayload) => {
    const { data } = await api.post<CartResponse>("/cart", payload);
    return data;
  },
  updateCartItem: async (cartItemId: string, payload: UpdateCartItemPayload) => {
    const { data } = await api.patch<CartResponse>(`/cart/${cartItemId}`, payload);
    return data;
  },
  removeCartItem: async (cartItemId: string) => {
    const { data } = await api.delete<CartResponse>(`/cart/${cartItemId}`);
    return data;
  },
};
