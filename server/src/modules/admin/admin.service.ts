import { hasDatabaseUrl } from "../../config/env";
import { prisma } from "../../config/prisma";
import { HttpError } from "../../middleware/error.middleware";

const ensureDatabaseConfigured = () => {
  if (!hasDatabaseUrl()) {
    throw new HttpError(500, "Missing required environment variable: DATABASE_URL");
  }
};

export const getAnalyticsSummary = async () => {
  ensureDatabaseConfigured();

  const [productCount, orderCount, lowStockCount, revenueResult] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.product.count({
      where: {
        stock: {
          lt: 5,
        },
      },
    }),
    prisma.order.aggregate({
      _sum: {
        totalAmount: true,
      },
    }),
  ]);

  return {
    totalProducts: productCount,
    totalOrders: orderCount,
    lowStockCount,
    revenue: Number(revenueResult._sum.totalAmount ?? 0),
  };
};
