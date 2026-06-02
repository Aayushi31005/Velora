import { api } from "./client";

import type { Order } from "../features/orders/types/order";

export const ordersApi = {
  checkout: async () => {
    const { data } = await api.post<Order>("/orders/checkout");
    return data;
  },
  list: async () => {
    const { data } = await api.get<Order[]>("/orders");
    return data;
  },
  listAll: async () => {
    const { data } = await api.get<Order[]>("/orders/admin/all");
    return data;
  },
  getById: async (orderId: string) => {
    const { data } = await api.get<Order>(`/orders/${orderId}`);
    return data;
  },
  updateStatus: async (orderId: string, status: Order["status"]) => {
    const { data } = await api.patch<Order>(`/orders/${orderId}/status`, { status });
    return data;
  },
};
