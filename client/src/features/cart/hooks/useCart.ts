import { useQuery } from "@tanstack/react-query";

import { cartApi } from "../../../api/cart";
import { useAuthStore } from "../../../store/authStore";
import { getEmptyCart } from "../utils/cartState";

export function useCart() {
  const token = useAuthStore((state) => state.token);

  return useQuery({
    queryKey: ["cart"],
    queryFn: cartApi.getCart,
    enabled: Boolean(token),
    initialData: getEmptyCart(),
  });
}
