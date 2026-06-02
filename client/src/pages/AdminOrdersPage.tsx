import type { OrderStatus } from "../features/orders/types/order";
import { EmptyState } from "../components/EmptyState";
import { ErrorState } from "../components/ErrorState";
import { OrderStatusBadge } from "../features/orders/components/OrderStatusBadge";
import { useAdminOrders } from "../features/admin/orders/hooks/useAdminOrders";
import { useUpdateOrderStatus } from "../features/admin/orders/hooks/useUpdateOrderStatus";
import { AdminSectionHeader } from "../features/admin/shared/components/AdminSectionHeader";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const statusOptions: OrderStatus[] = ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"];

export function AdminOrdersPage() {
  useDocumentTitle("Admin orders");
  const ordersQuery = useAdminOrders();
  const updateOrderStatus = useUpdateOrderStatus();

  if (ordersQuery.isError) {
    return (
      <ErrorState
        description="Order operations depend on authenticated admin APIs and a configured database."
        title="Unable to load order operations"
      />
    );
  }

  const orders = ordersQuery.data ?? [];

  return (
    <section className="panel stack">
      <AdminSectionHeader
        description="Internal tooling should make fulfillment workflows clear, fast, and safe."
        title="Order operations"
      />
      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id.slice(0, 8)}</td>
                  <td>
                    <div className="admin-customer">
                      <strong>{order.user?.name ?? "Customer"}</strong>
                      <span>{order.user?.email ?? order.userId}</span>
                    </div>
                  </td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>
                    <OrderStatusBadge status={order.status} />
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <select
                      defaultValue={order.status}
                      disabled={updateOrderStatus.isPending}
                      onChange={(event) =>
                        updateOrderStatus.mutate({
                          orderId: order.id,
                          status: event.target.value as OrderStatus,
                        })
                      }
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <EmptyState
                    description="Orders will appear here once customers complete checkout."
                    title="No orders yet"
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
