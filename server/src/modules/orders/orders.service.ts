import { hasDatabaseUrl } from "../../config/env";
import { prisma } from "../../config/prisma";
import { HttpError } from "../../middleware/error.middleware";
import type { UpdateOrderStatusInput } from "./orders.types";

const orderSelect = {
  id: true,
  userId: true,
  totalAmount: true,
  status: true,
  createdAt: true,
  orderItems: {
    select: {
      id: true,
      productId: true,
      productTitle: true,
      productPrice: true,
      quantity: true,
    },
  },
};

const adminOrderSelect = {
  ...orderSelect,
  user: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
};

const ensureDatabaseConfigured = () => {
  if (!hasDatabaseUrl()) {
    throw new HttpError(500, "Missing required environment variable: DATABASE_URL");
  }
};

const normalizeOrder = <T extends {
  totalAmount: unknown;
  orderItems: Array<{
    productPrice: unknown;
  }>;
}>(order: T) => ({
  ...order,
  totalAmount: Number(order.totalAmount),
  orderItems: order.orderItems.map((item) => ({
    ...item,
    productPrice: Number(item.productPrice),
  })),
});

const normalizeAdminOrder = <T extends {
  totalAmount: unknown;
  orderItems: Array<{
    productPrice: unknown;
  }>;
  user: {
    id: string;
    name: string;
    email: string;
  };
}>(order: T) => ({
  ...normalizeOrder(order),
  user: order.user,
});

const getOwnedOrder = async (userId: string, orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: orderSelect,
  });

  if (!order || order.userId !== userId) {
    throw new HttpError(404, "Order not found");
  }

  return normalizeOrder(order);
};

export const checkout = async (userId: string) => {
  ensureDatabaseConfigured();

  const order = await prisma.$transaction(async (tx) => {
    const cartItems = await tx.cartItem.findMany({
      where: { userId },
      select: {
        id: true,
        quantity: true,
        product: {
          select: {
            id: true,
            title: true,
            price: true,
            stock: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (cartItems.length === 0) {
      throw new HttpError(409, "Cart is empty");
    }

    for (const cartItem of cartItems) {
      if (cartItem.product.stock < cartItem.quantity) {
        throw new HttpError(409, `Insufficient stock for ${cartItem.product.title}`);
      }
    }

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + Number(item.product.price) * item.quantity,
      0,
    );

    const orderRecord = await tx.order.create({
      data: {
        userId,
        totalAmount,
        orderItems: {
          create: cartItems.map((item) => ({
            productId: item.product.id,
            productTitle: item.product.title,
            productPrice: item.product.price,
            quantity: item.quantity,
          })),
        },
      },
      select: orderSelect,
    });

    for (const cartItem of cartItems) {
      await tx.product.update({
        where: { id: cartItem.product.id },
        data: {
          stock: {
            decrement: cartItem.quantity,
          },
        },
      });
    }

    await tx.cartItem.deleteMany({
      where: { userId },
    });

    return orderRecord;
  });

  return normalizeOrder(order);
};

export const listOrders = async (userId: string) => {
  ensureDatabaseConfigured();

  const orders = await prisma.order.findMany({
    where: { userId },
    select: orderSelect,
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders.map(normalizeOrder);
};

export const listAllOrders = async () => {
  ensureDatabaseConfigured();

  const orders = await prisma.order.findMany({
    select: adminOrderSelect,
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders.map(normalizeAdminOrder);
};

export const getOrderById = async (userId: string, orderId: string) => {
  ensureDatabaseConfigured();
  return getOwnedOrder(userId, orderId);
};

export const updateOrderStatus = async (
  orderId: string,
  payload: UpdateOrderStatusInput["body"],
) => {
  ensureDatabaseConfigured();

  const existingOrder = await prisma.order.findUnique({
    where: { id: orderId },
    select: { id: true },
  });

  if (!existingOrder) {
    throw new HttpError(404, "Order not found");
  }

  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: payload.status,
    },
    select: orderSelect,
  });

  return normalizeOrder(order);
};
