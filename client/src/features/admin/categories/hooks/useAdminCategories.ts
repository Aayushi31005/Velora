import { useQuery } from "@tanstack/react-query";

import { categoriesApi } from "../../../../api/categories";

export function useAdminCategories() {
  return useQuery({
    queryKey: ["admin", "categories"],
    queryFn: categoriesApi.list,
  });
}
