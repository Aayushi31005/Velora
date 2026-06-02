import { useQuery } from "@tanstack/react-query";

import { productsApi } from "../../../api/products";

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => productsApi.getBySlug(slug),
    enabled: Boolean(slug),
  });
}
