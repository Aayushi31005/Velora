import { useQuery } from "@tanstack/react-query";

import { adminApi } from "../../../../api/admin";

export function useAnalyticsSummary() {
  return useQuery({
    queryKey: ["admin", "analytics"],
    queryFn: adminApi.getAnalyticsSummary,
  });
}
