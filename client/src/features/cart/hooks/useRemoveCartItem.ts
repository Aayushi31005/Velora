import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cartApi } from "../../../api/cart";
import type { CartResponse } from "../types/cart";
import { createOptimisticCartAfterRemove } from "../utils/cartState";

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cartItemId: string) => cartApi.removeCartItem(cartItemId),
    onMutate: async (cartItemId) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<CartResponse>(["cart"]);
      const optimisticCart = createOptimisticCartAfterRemove(previousCart, cartItemId);

      queryClient.setQueryData(["cart"], optimisticCart);

      return { previousCart };
    },
    onError: (_error, _cartItemId, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
