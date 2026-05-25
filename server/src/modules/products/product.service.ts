import type { Prisma } from "@prisma/client";

import { prisma } from "../../config/prisma";
import { HttpError } from "../../middleware/error.middleware";
import type {
  CreateProductInput,
  ListProductsQuery,
  UpdateProductInput,
} from "./product.types";

const productSelect = {
  id: true,
  title: true,
  slug: true,
  description: true,
  price: true,
  stock: true,
  imageUrl: true,
  categoryId: true,
  category: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
  createdAt: true,
  updatedAt: true,
};

const ensureCategoryExists = async (categoryId: string) => {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { id: true },
  });

  if (!category) {
    throw new HttpError(404, "Category not found");
  }
};

const ensureProductExists = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true },
  });

  if (!product) {
    throw new HttpError(404, "Product not found");
  }
};

export const listProducts = async (query: ListProductsQuery["query"]) => {
  const { categoryId, categorySlug, inStock, limit, maxPrice, minPrice, page, search, sortBy, sortOrder } =
    query;

  const where: Prisma.ProductWhereInput = {
    ...(categoryId ? { categoryId } : {}),
    ...(categorySlug
      ? {
          category: {
            slug: categorySlug,
          },
        }
      : {}),
    ...(typeof inStock === "boolean"
      ? {
          stock: inStock ? { gt: 0 } : { lte: 0 },
        }
      : {}),
    ...(minPrice || maxPrice
      ? {
          price: {
            ...(minPrice ? { gte: minPrice } : {}),
            ...(maxPrice ? { lte: maxPrice } : {}),
          },
        }
      : {}),
    ...(search
      ? {
          OR: [
            { title: { contains: search, mode: "insensitive" as const } },
            { description: { contains: search, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };

  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where,
      select: productSelect,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    items,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
  };
};

export const getProductById = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: productSelect,
  });

  if (!product) {
    throw new HttpError(404, "Product not found");
  }

  return product;
};

export const getProductBySlug = async (slug: string) => {
  const product = await prisma.product.findUnique({
    where: { slug },
    select: productSelect,
  });

  if (!product) {
    throw new HttpError(404, "Product not found");
  }

  return product;
};

export const createProduct = async (payload: CreateProductInput["body"]) => {
  await ensureCategoryExists(payload.categoryId);

  return prisma.product.create({
    data: {
      ...payload,
    },
    select: productSelect,
  });
};

export const updateProduct = async (
  productId: string,
  payload: UpdateProductInput["body"],
) => {
  await ensureProductExists(productId);

  if (payload.categoryId) {
    await ensureCategoryExists(payload.categoryId);
  }

  return prisma.product.update({
    where: { id: productId },
    data: {
      ...payload,
    },
    select: productSelect,
  });
};

export const deleteProduct = async (productId: string) => {
  await ensureProductExists(productId);

  await prisma.product.delete({
    where: { id: productId },
  });

  return {
    message: "Product deleted successfully",
  };
};
