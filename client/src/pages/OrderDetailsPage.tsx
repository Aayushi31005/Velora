import { Link, useParams } from "react-router-dom";

import { ErrorState } from "../components/ErrorState";
import { SectionHeading } from "../components/SectionHeading";
import { OrderItemList } from "../features/orders/components/OrderItemList";
import { OrderStatusBadge } from "../features/orders/components/OrderStatusBadge";
import { useOrder } from "../features/orders/hooks/useOrder";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function OrderDetailsPage() {
  const { orderId = "" } = useParams();
  const orderQuery = useOrder(orderId);

  useDocumentTitle(orderId ? `Order ${orderId.slice(0, 8)}` : "Order");

  if (orderQuery.isPending) {
    return <div className="panel">Loading order details...</div>;
  }

  if (orderQuery.isError || !orderQuery.data) {
    return (
      <ErrorState
        description="This order is unavailable right now, or the backend order history still needs a configured database."
        title="Unable to load order"
      />
    );
  }

  const order = orderQuery.data;

  return (
    <div className="stack">
      <section className="panel">
        <SectionHeading eyebrow={`Order #${order.id.slice(0, 8)}`} title="Order details">
          Immutable order snapshots keep pricing and item history correct even after products change.
        </SectionHeading>
        <div className="detail-grid">
          <div>
            <span className="metric-label">Status</span>
            <div className="metric-value">
              <OrderStatusBadge status={order.status} />
            </div>
          </div>
          <div>
            <span className="metric-label">Placed on</span>
            <strong className="metric-value">{new Date(order.createdAt).toLocaleString()}</strong>
          </div>
          <div>
            <span className="metric-label">Total</span>
            <strong className="metric-value">${order.totalAmount.toFixed(2)}</strong>
          </div>
        </div>
      </section>

      <section className="panel stack">
        <div className="cart-drawer__header">
          <h2>Order items</h2>
          <Link className="button-ghost" to="/orders">
            Back to history
          </Link>
        </div>
        <OrderItemList items={order.orderItems} />
      </section>
    </div>
  );
}
