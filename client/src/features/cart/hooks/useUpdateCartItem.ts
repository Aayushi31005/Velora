import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cartApi } from "../../../api/cart";
import type { CartResponse } from "../types/cart";
import { createOptimisticCartAfterUpdate } from "../utils/cartState";

interface UpdateCartItemVariables {
  cartItemId: string;
  quantity: number;
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cartItemId, quantity }: UpdateCartItemVariables) =>
      cartApi.updateCartItem(cartItemId, { quantity }),
    onMutate: async ({ cartItemId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<CartResponse>(["cart"]);
      const optimisticCart = createOptimisticCartAfterUpdate(previousCart, cartItemId, quantity);

      queryClient.setQueryData(["cart"], optimisticCart);

      return { previousCart };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
