import { Link } from "react-router-dom";

import { useAuthStore } from "../../../store/authStore";
import { useCart } from "../hooks/useCart";
import { useCartUiStore } from "../store/cartUiStore";
import { CartItemCard } from "./CartItemCard";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "./EmptyCart";

export function CartDrawer() {
  const token = useAuthStore((state) => state.token);
  const { data: cart, isPending } = useCart();
  const { closeCart, isCartOpen } = useCartUiStore();

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="cart-drawer">
      <button aria-label="Close cart" className="cart-drawer__backdrop" onClick={closeCart} type="button" />
      <aside className="cart-drawer__panel">
        <div className="cart-drawer__header">
          <div>
            <span className="section-heading__eyebrow">Cart</span>
            <h2>Persistent shopping session</h2>
          </div>
          <button className="button-ghost" onClick={closeCart} type="button">
            Close
          </button>
        </div>

        {!token ? (
          <div className="empty-cart">
            <h3>Sign in to use your cart</h3>
            <p>Your cart is tied to your account so it can persist across sessions and devices.</p>
            <Link className="button-primary" to="/login">
              Go to login
            </Link>
          </div>
        ) : isPending ? (
          <div className="cart-skeleton-list">
            <div className="cart-skeleton" />
            <div className="cart-skeleton" />
            <div className="cart-skeleton" />
          </div>
        ) : cart && cart.items.length > 0 ? (
          <>
            <div className="cart-drawer__items">
              {cart.items.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>
            <CartSummary summary={cart.summary} />
            <div className="cart-drawer__footer">
              <Link className="button-ghost" onClick={closeCart} to="/cart">
                Open full cart
              </Link>
              <Link className="button-primary" onClick={closeCart} to="/checkout">
                Continue to checkout
              </Link>
            </div>
          </>
        ) : (
          <EmptyCart />
        )}
      </aside>
    </div>
  );
}
