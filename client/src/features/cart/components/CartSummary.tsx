import type { CartSummary as CartSummaryType } from "../types/cart";

interface CartSummaryProps {
  summary: CartSummaryType;
}

export function CartSummary({ summary }: CartSummaryProps) {
  return (
    <section className="cart-summary">
      <div>
        <span className="metric-label">Items</span>
        <strong className="metric-value">{summary.itemCount}</strong>
      </div>
      <div>
        <span className="metric-label">Subtotal</span>
        <strong className="metric-value">${summary.subtotal.toFixed(2)}</strong>
      </div>
    </section>
  );
}
