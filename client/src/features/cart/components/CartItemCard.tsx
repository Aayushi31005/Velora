import { Link } from "react-router-dom";

import { useRemoveCartItem } from "../hooks/useRemoveCartItem";
import { useUpdateCartItem } from "../hooks/useUpdateCartItem";
import type { CartItem } from "../types/cart";
import { QuantitySelector } from "./QuantitySelector";

interface CartItemCardProps {
  item: CartItem;
}

export function CartItemCard({ item }: CartItemCardProps) {
  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveCartItem();

  const isMutating = updateCartItem.isPending || removeCartItem.isPending;

  return (
    <article className="cart-item-card">
      <div className="cart-item-card__content">
        <div>
          <span className="metric-label">{item.product.category.name}</span>
          <h3>{item.product.title}</h3>
          <p>
            <Link to={`/products/${item.product.slug}`}>View product</Link>
          </p>
        </div>
        <strong>${item.lineTotal.toFixed(2)}</strong>
      </div>
      <div className="cart-item-card__actions">
        <QuantitySelector
          disabled={isMutating}
          max={item.product.stock}
          onChange={(quantity) => updateCartItem.mutate({ cartItemId: item.id, quantity })}
          value={item.quantity}
        />
        <button className="button-ghost" onClick={() => removeCartItem.mutate(item.id)} type="button">
          Remove
        </button>
      </div>
    </article>
  );
}
