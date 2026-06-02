import { useQuery } from "@tanstack/react-query";

import { productsApi, type ProductQuery } from "../../../api/products";

export function useProducts(query: ProductQuery = {}) {
  return useQuery({
    queryKey: ["products", query],
    queryFn: () => productsApi.list(query),
  });
}
