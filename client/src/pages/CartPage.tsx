import { Link } from "react-router-dom";

import { CartItemCard } from "../features/cart/components/CartItemCard";
import { CartSummary } from "../features/cart/components/CartSummary";
import { EmptyCart } from "../features/cart/components/EmptyCart";
import { useCart } from "../features/cart/hooks/useCart";
import { useAuthStore } from "../store/authStore";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function CartPage() {
  useDocumentTitle("Cart");
  const token = useAuthStore((state) => state.token);
  const { data: cart, isPending } = useCart();

  if (!token) {
    return (
      <div className="panel stack">
        <h2>Sign in to view your cart</h2>
        <p>Your cart is account-based and syncs with the backend.</p>
        <div>
          <Link className="button-primary" to="/login">
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="panel">
        <div className="cart-skeleton-list">
          <div className="cart-skeleton" />
          <div className="cart-skeleton" />
        </div>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="stack">
      <section className="panel">
        <h2>Your cart</h2>
        <p>React Query owns cart data; this page and the drawer stay synchronized automatically.</p>
      </section>
      <section className="cart-page-grid">
        <div className="cart-list">
          {cart.items.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>
        <CartSummary summary={cart.summary} />
      </section>
    </div>
  );
}
