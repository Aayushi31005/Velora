import type { OrderItem } from "../types/order";

interface OrderItemListProps {
  items: OrderItem[];
}

export function OrderItemList({ items }: OrderItemListProps) {
  return (
    <div className="order-item-list">
      {items.map((item) => (
        <article key={item.id} className="order-item-card">
          <div>
            <h3>{item.productTitle}</h3>
            <p>
              Quantity: {item.quantity} x ${item.productPrice.toFixed(2)}
            </p>
          </div>
          <strong>${(item.productPrice * item.quantity).toFixed(2)}</strong>
        </article>
      ))}
    </div>
  );
}
