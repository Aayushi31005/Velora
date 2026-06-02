import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ordersApi } from "../../../../api/orders";
import type { Order } from "../../../orders/types/order";

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: Order["status"] }) =>
      ordersApi.updateStatus(orderId, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.orderId] });
    },
  });
}
