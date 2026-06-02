import { Link } from "react-router-dom";

import { OrderStatusBadge } from "./OrderStatusBadge";
import type { Order } from "../types/order";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <article className="order-card">
      <div className="order-card__header">
        <div>
          <span className="metric-label">Order #{order.id.slice(0, 8)}</span>
          <h3>{new Date(order.createdAt).toLocaleDateString()}</h3>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>
      <p>{order.orderItems.length} line items</p>
      <div className="order-card__footer">
        <strong>${order.totalAmount.toFixed(2)}</strong>
        <Link to={`/orders/${order.id}`}>View order</Link>
      </div>
    </article>
  );
}
