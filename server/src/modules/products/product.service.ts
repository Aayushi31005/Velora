import type { Prisma } from "@prisma/client";

import { hasDatabaseUrl } from "../../config/env";
import { prisma } from "../../config/prisma";
import { HttpError } from "../../middleware/error.middleware";
import { createUniqueSlug } from "../../utils/slug";
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

const ensureDatabaseConfigured = () => {
  if (!hasDatabaseUrl()) {
    throw new HttpError(500, "Missing required environment variable: DATABASE_URL");
  }
};

const ensureCategoryExists = async (categoryId: string) => {
  ensureDatabaseConfigured();

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { id: true },
  });

  if (!category) {
    throw new HttpError(404, "Category not found");
  }
};

const ensureProductExists = async (productId: string) => {
  ensureDatabaseConfigured();

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true },
  });

  if (!product) {
    throw new HttpError(404, "Product not found");
  }
};

const createProductSlug = async (title: string, excludeProductId?: string) =>
  createUniqueSlug(title, async (slug) => {
    const product = await prisma.product.findFirst({
      where: {
        slug,
        ...(excludeProductId
          ? {
              NOT: {
                id: excludeProductId,
              },
            }
          : {}),
      },
      select: { id: true },
    });

    return Boolean(product);
  });

export const listProducts = async (query: ListProductsQuery["query"]) => {
  ensureDatabaseConfigured();
  const {
    categoryId,
    categorySlug,
    inStock,
    maxPrice,
    minPrice,
    search,
  } = query;
  const page = query.page ?? 1;
  const limit = query.limit ?? 10;
  const sortBy = query.sortBy ?? "createdAt";
  const sortOrder = query.sortOrder ?? "desc";

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
      orderBy: sortBy
      ? {
        [sortBy]: sortOrder,
        }
      : {
        createdAt: "desc",
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
  ensureDatabaseConfigured();

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
  ensureDatabaseConfigured();

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
  ensureDatabaseConfigured();
  await ensureCategoryExists(payload.categoryId);
  const slug = await createProductSlug(payload.title);

  return prisma.product.create({
    data: {
      ...payload,
      slug,
    },
    select: productSelect,
  });
};

export const updateProduct = async (
  productId: string,
  payload: UpdateProductInput["body"],
) => {
  ensureDatabaseConfigured();
  await ensureProductExists(productId);

  if (payload.categoryId) {
    await ensureCategoryExists(payload.categoryId);
  }

  const slug = payload.title
    ? await createProductSlug(payload.title, productId)
    : undefined;

  return prisma.product.update({
    where: { id: productId },
    data: {
      ...payload,
      ...(slug ? { slug } : {}),
    },
    select: productSelect,
  });
};

export const deleteProduct = async (productId: string) => {
  ensureDatabaseConfigured();
  await ensureProductExists(productId);

  await prisma.product.delete({
    where: { id: productId },
  });

  return {
    message: "Product deleted successfully",
  };
};
