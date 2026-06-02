import { api } from "./client";

export interface AnalyticsSummary {
  totalProducts: number;
  totalOrders: number;
  lowStockCount: number;
  revenue: number;
}

export const adminApi = {
  getAnalyticsSummary: async () => {
    const { data } = await api.get<AnalyticsSummary>("/admin/analytics");
    return data;
  },
};
