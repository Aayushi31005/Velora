import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { OrderCard } from "../features/orders/components/OrderCard";
import { useOrders } from "../features/orders/hooks/useOrders";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function OrdersPage() {
  useDocumentTitle("Orders");
  const ordersQuery = useOrders();

  if (ordersQuery.isPending) {
    return <div className="panel">Loading order history...</div>;
  }

  if (ordersQuery.isError) {
    return (
      <ErrorState
        description="Order history could not be loaded. This usually means the backend database is not configured yet."
        title="Unable to load orders"
      />
    );
  }

  const orders = ordersQuery.data ?? [];

  if (orders.length === 0) {
    return (
      <EmptyState
        description="Once you complete checkout, your order history will appear here with status tracking and immutable snapshots."
        title="No orders yet"
      />
    );
  }

  return (
    <div className="stack">
      <section className="panel">
        <h2>Order history</h2>
        <p>Each order preserves product title, price, quantity, and status at the moment of purchase.</p>
      </section>
      <div className="order-list">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
