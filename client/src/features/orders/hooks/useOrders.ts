import { useQuery } from "@tanstack/react-query";

import { ordersApi } from "../../../api/orders";
import { useAuthStore } from "../../../store/authStore";

export function useOrders() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["orders"],
    queryFn: ordersApi.list,
    enabled: Boolean(token),
  });
}
