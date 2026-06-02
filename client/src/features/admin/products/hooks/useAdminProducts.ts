import { useQuery } from "@tanstack/react-query";

import { productsApi } from "../../../../api/products";

export function useAdminProducts() {
  return useQuery({
    queryKey: ["admin", "products"],
    queryFn: () => productsApi.list({ limit: 100, sortBy: "createdAt", sortOrder: "desc" }),
  });
}
