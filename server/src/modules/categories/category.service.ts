import { hasDatabaseUrl } from "../../config/env";
import { prisma } from "../../config/prisma";
import { HttpError } from "../../middleware/error.middleware";
import { createUniqueSlug } from "../../utils/slug";
import type { CreateCategoryInput, UpdateCategoryInput } from "./category.types";

const categorySelect = {
  id: true,
  name: true,
  slug: true,
  createdAt: true,
};

const ensureDatabaseConfigured = () => {
  if (!hasDatabaseUrl()) {
    throw new HttpError(500, "Missing required environment variable: DATABASE_URL");
  }
};

export const listCategories = async () => {
  ensureDatabaseConfigured();

  return prisma.category.findMany({
    select: categorySelect,
    orderBy: {
      name: "asc",
    },
  });
};

export const createCategory = async (payload: CreateCategoryInput["body"]) => {
  ensureDatabaseConfigured();

  const existingCategory = await prisma.category.findUnique({
    where: { name: payload.name },
    select: { id: true },
  });

  if (existingCategory) {
    throw new HttpError(409, "Category already exists");
  }

  const slug = await createUniqueSlug(payload.name, async (candidate) => {
    const category = await prisma.category.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    return Boolean(category);
  });

  return prisma.category.create({
    data: {
      name: payload.name,
      slug,
    },
    select: categorySelect,
  });
};

export const updateCategory = async (
  categoryId: string,
  payload: UpdateCategoryInput["body"],
) => {
  ensureDatabaseConfigured();

  const existingCategory = await prisma.category.findUnique({
    where: { id: categoryId },
    select: { id: true, name: true },
  });

  if (!existingCategory) {
    throw new HttpError(404, "Category not found");
  }

  const conflictingCategory = await prisma.category.findFirst({
    where: {
      name: payload.name,
      NOT: {
        id: categoryId,
      },
    },
    select: { id: true },
  });

  if (conflictingCategory) {
    throw new HttpError(409, "Category already exists");
  }

  const slug =
    payload.name !== existingCategory.name
      ? await createUniqueSlug(payload.name, async (candidate) => {
          const category = await prisma.category.findFirst({
            where: {
              slug: candidate,
              NOT: {
                id: categoryId,
              },
            },
            select: { id: true },
          });

          return Boolean(category);
        })
      : undefined;

  return prisma.category.update({
    where: { id: categoryId },
    data: {
      name: payload.name,
      ...(slug ? { slug } : {}),
    },
    select: categorySelect,
  });
};

export const deleteCategory = async (categoryId: string) => {
  ensureDatabaseConfigured();

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    select: {
      id: true,
      _count: {
        select: {
          products: true,
        },
      },
    },
  });

  if (!category) {
    throw new HttpError(404, "Category not found");
  }

  if (category._count.products > 0) {
    throw new HttpError(409, "Cannot delete a category that still has products");
  }

  await prisma.category.delete({
    where: { id: categoryId },
  });

  return {
    message: "Category deleted successfully",
  };
};
