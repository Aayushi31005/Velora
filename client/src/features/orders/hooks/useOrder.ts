import { useQuery } from "@tanstack/react-query";

import { ordersApi } from "../../../api/orders";
import { useAuthStore } from "../../../store/authStore";

export function useOrder(orderId: string) {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => ordersApi.getById(orderId),
    enabled: Boolean(token && orderId),
  });
}
