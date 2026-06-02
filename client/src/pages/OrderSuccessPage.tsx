import { Link, useParams } from "react-router-dom";

import { ErrorState } from "../components/ErrorState";
import { OrderStatusBadge } from "../features/orders/components/OrderStatusBadge";
import { useOrder } from "../features/orders/hooks/useOrder";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function OrderSuccessPage() {
  const { orderId = "" } = useParams();
  const orderQuery = useOrder(orderId);

  useDocumentTitle("Order success");

  if (orderQuery.isPending) {
    return <div className="panel">Finalizing your order summary...</div>;
  }

  if (orderQuery.isError || !orderQuery.data) {
    return (
      <ErrorState
        description="The order was submitted, but the success summary could not be loaded."
        title="Order confirmation unavailable"
      />
    );
  }

  const order = orderQuery.data;

  return (
    <section className="panel stack">
      <span className="section-heading__eyebrow">Checkout complete</span>
      <h1>Order confirmed.</h1>
      <p>
        Order <strong>#{order.id.slice(0, 8)}</strong> has been created and your cart has been
        cleared inside the same transaction.
      </p>
      <div className="detail-grid">
        <div>
          <span className="metric-label">Status</span>
          <div className="metric-value">
            <OrderStatusBadge status={order.status} />
          </div>
        </div>
        <div>
          <span className="metric-label">Items</span>
          <strong className="metric-value">{order.orderItems.length}</strong>
        </div>
        <div>
          <span className="metric-label">Total</span>
          <strong className="metric-value">${order.totalAmount.toFixed(2)}</strong>
        </div>
      </div>
      <div className="hero-panel__actions">
        <Link className="button-primary" to={`/orders/${order.id}`}>
          View order details
        </Link>
        <Link className="button-ghost" to="/products">
          Continue shopping
        </Link>
      </div>
    </section>
  );
}
