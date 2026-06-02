import { useMutation, useQueryClient } from "@tanstack/react-query";

import { categoriesApi, type CategoryPayload } from "../../../../api/categories";

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ categoryId, payload }: { categoryId: string; payload: CategoryPayload }) =>
      categoriesApi.update(categoryId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
    },
  });
}
