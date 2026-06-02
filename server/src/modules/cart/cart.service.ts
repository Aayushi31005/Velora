import { hasDatabaseUrl } from "../../config/env";
import { prisma } from "../../config/prisma";
import { HttpError } from "../../middleware/error.middleware";
import type { AddToCartInput, UpdateCartItemInput } from "./cart.types";

const cartItemSelect = {
  id: true,
  quantity: true,
  createdAt: true,
  product: {
    select: {
      id: true,
      title: true,
      slug: true,
      price: true,
      stock: true,
      imageUrl: true,
      category: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  },
};

const ensureDatabaseConfigured = () => {
  if (!hasDatabaseUrl()) {
    throw new HttpError(500, "Missing required environment variable: DATABASE_URL");
  }
};

const toCartResponse = (
  items: Array<{
    id: string;
    quantity: number;
    createdAt: Date;
    product: {
      id: string;
      title: string;
      slug: string;
      price: unknown;
      stock: number;
      imageUrl: string | null;
      category: {
        id: string;
        name: string;
        slug: string;
      };
    };
  }>,
) => {
  const normalizedItems = items.map((item) => {
    const unitPrice = Number(item.product.price);
    const lineTotal = unitPrice * item.quantity;

    return {
      id: item.id,
      quantity: item.quantity,
      createdAt: item.createdAt,
      lineTotal,
      product: {
        ...item.product,
        price: unitPrice,
      },
    };
  });

  const summary = normalizedItems.reduce(
    (accumulator, item) => ({
      itemCount: accumulator.itemCount + item.quantity,
      subtotal: accumulator.subtotal + item.lineTotal,
    }),
    {
      subtotal: 0,
      itemCount: 0,
    },
  );

  return {
    items: normalizedItems,
    summary,
  };
};

const getUserCartItems = async (userId: string) =>
  prisma.cartItem.findMany({
    where: { userId },
    select: cartItemSelect,
    orderBy: {
      createdAt: "desc",
    },
  });

const getProductForCart = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: {
      id: true,
      stock: true,
    },
  });

  if (!product) {
    throw new HttpError(404, "Product not found");
  }

  return product;
};

const ensureStockAvailable = (availableStock: number, requestedQuantity: number) => {
  if (availableStock <= 0) {
    throw new HttpError(409, "Product is out of stock");
  }

  if (requestedQuantity > availableStock) {
    throw new HttpError(409, "Requested quantity exceeds available stock");
  }
};

const getOwnedCartItem = async (userId: string, cartItemId: string) => {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
    select: {
      id: true,
      userId: true,
      productId: true,
    },
  });

  if (!cartItem || cartItem.userId !== userId) {
    throw new HttpError(404, "Cart item not found");
  }

  return cartItem;
};

export const getCart = async (userId: string) => {
  ensureDatabaseConfigured();
  const items = await getUserCartItems(userId);

  return toCartResponse(items);
};

export const addToCart = async (userId: string, payload: AddToCartInput["body"]) => {
  ensureDatabaseConfigured();

  const product = await getProductForCart(payload.productId);
  ensureStockAvailable(product.stock, payload.quantity);

  const existingCartItem = await prisma.cartItem.findUnique({
    where: {
      userId_productId: {
        userId,
        productId: payload.productId,
      },
    },
    select: {
      id: true,
      quantity: true,
    },
  });

  if (existingCartItem) {
    const nextQuantity = existingCartItem.quantity + payload.quantity;
    ensureStockAvailable(product.stock, nextQuantity);

    await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: {
        quantity: nextQuantity,
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        userId,
        productId: payload.productId,
        quantity: payload.quantity,
      },
    });
  }

  return getCart(userId);
};

export const updateCartItem = async (
  userId: string,
  cartItemId: string,
  payload: UpdateCartItemInput["body"],
) => {
  ensureDatabaseConfigured();

  const cartItem = await getOwnedCartItem(userId, cartItemId);
  const product = await getProductForCart(cartItem.productId);
  ensureStockAvailable(product.stock, payload.quantity);

  await prisma.cartItem.update({
    where: { id: cartItemId },
    data: {
      quantity: payload.quantity,
    },
  });

  return getCart(userId);
};

export const removeCartItem = async (userId: string, cartItemId: string) => {
  ensureDatabaseConfigured();

  await getOwnedCartItem(userId, cartItemId);

  await prisma.cartItem.delete({
    where: { id: cartItemId },
  });

  return getCart(userId);
};
