export type OrderStatus = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export interface OrderItem {
  id: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  orderItems: OrderItem[];
  user?: {
    id: string;
    name: string;
    email: string;
  };
}
