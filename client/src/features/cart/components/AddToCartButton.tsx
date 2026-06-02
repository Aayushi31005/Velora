import { useNavigate } from "react-router-dom";

import type { Product } from "../../products/types/product";
import { useAddToCart } from "../hooks/useAddToCart";
import { useCartUiStore } from "../store/cartUiStore";
import { useAuthStore } from "../../../store/authStore";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const openCart = useCartUiStore((state) => state.openCart);
  const addToCart = useAddToCart();

  return (
    <button
      className="button-primary"
      disabled={product.stock <= 0 || addToCart.isPending}
      onClick={() => {
        if (!token) {
          navigate("/login");
          return;
        }

        addToCart.mutate(
          { product, quantity: 1 },
          {
            onSuccess: () => openCart(),
          },
        );
      }}
      type="button"
    >
      {product.stock <= 0 ? "Out of stock" : addToCart.isPending ? "Adding..." : "Add to cart"}
    </button>
  );
}
