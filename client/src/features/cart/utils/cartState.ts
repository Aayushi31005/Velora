import type { Product } from "../../products/types/product";
import type { CartItem, CartResponse } from "../types/cart";

export const getEmptyCart = (): CartResponse => ({
  items: [],
  summary: {
    subtotal: 0,
    itemCount: 0,
  },
});

const buildCartItemFromProduct = (product: Product, quantity: number): CartItem => {
  const price = Number(product.price);

  return {
    id: `optimistic-${product.id}`,
    quantity,
    createdAt: new Date().toISOString(),
    lineTotal: price * quantity,
    product: {
      id: product.id,
      title: product.title,
      slug: product.slug,
      price,
      stock: product.stock,
      imageUrl: product.imageUrl,
      category: product.category,
    },
  };
};

export const createOptimisticCartAfterAdd = (
  currentCart: CartResponse | undefined,
  product: Product,
  quantity: number,
) => {
  const baseCart = currentCart ?? getEmptyCart();
  const existingItem = baseCart.items.find((item) => item.product.id === product.id);

  let items: CartItem[];

  if (existingItem) {
    items = baseCart.items.map((item) =>
      item.product.id === product.id
        ? {
            ...item,
            quantity: item.quantity + quantity,
            lineTotal: Number(item.product.price) * (item.quantity + quantity),
          }
        : item,
    );
  } else {
    items = [buildCartItemFromProduct(product, quantity), ...baseCart.items];
  }

  return {
    items,
    summary: {
      itemCount: baseCart.summary.itemCount + quantity,
      subtotal: baseCart.summary.subtotal + Number(product.price) * quantity,
    },
  };
};

export const createOptimisticCartAfterUpdate = (
  currentCart: CartResponse | undefined,
  cartItemId: string,
  quantity: number,
) => {
  const baseCart = currentCart ?? getEmptyCart();
  const item = baseCart.items.find((entry) => entry.id === cartItemId);

  if (!item) {
    return baseCart;
  }

  const nextItems = baseCart.items.map((entry) =>
    entry.id === cartItemId
      ? {
          ...entry,
          quantity,
          lineTotal: Number(entry.product.price) * quantity,
        }
      : entry,
  );

  const itemCount = nextItems.reduce((sum, entry) => sum + entry.quantity, 0);
  const subtotal = nextItems.reduce((sum, entry) => sum + entry.lineTotal, 0);

  return {
    items: nextItems,
    summary: {
      itemCount,
      subtotal,
    },
  };
};

export const createOptimisticCartAfterRemove = (
  currentCart: CartResponse | undefined,
  cartItemId: string,
) => {
  const baseCart = currentCart ?? getEmptyCart();
  const nextItems = baseCart.items.filter((item) => item.id !== cartItemId);

  return {
    items: nextItems,
    summary: {
      itemCount: nextItems.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: nextItems.reduce((sum, item) => sum + item.lineTotal, 0),
    },
  };
};
