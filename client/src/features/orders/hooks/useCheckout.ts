import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ordersApi } from "../../../api/orders";

export function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ordersApi.checkout,
    onSuccess: (order) => {
      queryClient.setQueryData(["cart"], {
        items: [],
        summary: {
          subtotal: 0,
          itemCount: 0,
        },
      });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.setQueryData(["order", order.id], order);
    },
  });
}
