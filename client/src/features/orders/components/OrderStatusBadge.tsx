import type { OrderStatus } from "../types/order";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const statusClassMap: Record<OrderStatus, string> = {
  PENDING: "order-status order-status--pending",
  PAID: "order-status order-status--paid",
  SHIPPED: "order-status order-status--shipped",
  DELIVERED: "order-status order-status--delivered",
  CANCELLED: "order-status order-status--cancelled",
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return <span className={statusClassMap[status]}>{status.toLowerCase()}</span>;
}
