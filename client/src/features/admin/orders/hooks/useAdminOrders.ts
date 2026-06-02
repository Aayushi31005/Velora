import { useQuery } from "@tanstack/react-query";

import { ordersApi } from "../../../../api/orders";

export function useAdminOrders() {
  return useQuery({
    queryKey: ["admin", "orders"],
    queryFn: ordersApi.listAll,
  });
}
