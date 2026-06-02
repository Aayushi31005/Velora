import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cartApi } from "../../../api/cart";
import type { Product } from "../../products/types/product";
import type { CartResponse } from "../types/cart";
import { createOptimisticCartAfterAdd } from "../utils/cartState";

interface AddToCartVariables {
  product: Product;
  quantity?: number;
}

export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ product, quantity = 1 }: AddToCartVariables) =>
      cartApi.addToCart({
        productId: product.id,
        quantity,
      }),
    onMutate: async ({ product, quantity = 1 }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      const previousCart = queryClient.getQueryData<CartResponse>(["cart"]);
      const optimisticCart = createOptimisticCartAfterAdd(previousCart, product, quantity);

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
