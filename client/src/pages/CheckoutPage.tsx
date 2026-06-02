import { useNavigate } from "react-router-dom";

import { CartSummary } from "../features/cart/components/CartSummary";
import { useCart } from "../features/cart/hooks/useCart";
import { useCheckout } from "../features/orders/hooks/useCheckout";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function CheckoutPage() {
  useDocumentTitle("Checkout");
  const navigate = useNavigate();
  const cartQuery = useCart();
  const checkoutMutation = useCheckout();

  if (cartQuery.isPending) {
    return <div className="panel">Loading your cart for checkout...</div>;
  }

  const cart = cartQuery.data;

  if (!cart || cart.items.length === 0) {
    return (
      <section className="panel stack">
        <h2>Your cart is empty</h2>
        <p>Add products before starting the checkout workflow.</p>
      </section>
    );
  }

  return (
    <div className="stack">
      <section className="panel stack">
        <h2>Checkout review</h2>
        <p>
          This order will validate inventory, create immutable order items, decrement stock, and
          clear your cart in one transaction.
        </p>
        <CartSummary summary={cart.summary} />
      </section>
      <section className="panel stack">
        <h3>Ready to place your order?</h3>
        {checkoutMutation.error instanceof Error ? (
          <p className="form-error">{checkoutMutation.error.message}</p>
        ) : null}
        <button
          className="button-primary"
          disabled={checkoutMutation.isPending}
          onClick={() => {
            checkoutMutation.mutate(undefined, {
              onSuccess: (order) => navigate(`/orders/${order.id}/success`),
            });
          }}
          type="button"
        >
          {checkoutMutation.isPending ? "Processing checkout..." : "Place order"}
        </button>
      </section>
    </div>
  );
}
