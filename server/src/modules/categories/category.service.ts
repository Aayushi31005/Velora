import { hasDatabaseUrl } from "../../config/env";
import { prisma } from "../../config/prisma";
import { HttpError } from "../../middleware/error.middleware";
import { createUniqueSlug } from "../../utils/slug";
import type { CreateCategoryInput } from "./category.types";

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
