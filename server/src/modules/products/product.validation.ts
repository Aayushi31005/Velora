import { z } from "zod";

const decimalString = z
  .union([z.string(), z.number()])
  .transform((value) => String(value).trim())
  .refine((value) => /^\d+(\.\d{1,2})?$/.test(value), {
    message: "Must be a valid price with up to 2 decimal places",
  });

const positiveInteger = z.coerce.number().int().positive();

export const productIdParamSchema = z.object({
  params: z.object({
    productId: z.string().min(1, "Product id is required"),
  }),
});

export const productSlugParamSchema = z.object({
  params: z.object({
    slug: z.string().min(1, "Product slug is required"),
  }),
});

export const listProductsQuerySchema = z.object({
  query: z.object({
    categoryId: z.string().min(1).optional(),
    categorySlug: z.string().min(1).optional(),
    inStock: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .optional(),
    minPrice: decimalString.optional(),
    maxPrice: decimalString.optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    search: z.string().trim().min(1).optional(),
    sortBy: z.enum(["createdAt", "price", "title"]).default("createdAt"),
    sortOrder: z.enum(["asc", "desc"]).default("desc"),
  }),
});

export const createProductSchema = z.object({
  body: z.object({
    title: z.string().trim().min(2).max(255),
    description: z.string().trim().min(10),
    price: decimalString,
    stock: positiveInteger,
    imageUrl: z.string().trim().url().optional().nullable(),
    categoryId: z.string().min(1, "Category id is required"),
  }),
});

export const updateProductSchema = z.object({
  body: z
    .object({
      title: z.string().trim().min(2).max(255).optional(),
      description: z.string().trim().min(10).optional(),
      price: decimalString.optional(),
      stock: positiveInteger.optional(),
      imageUrl: z.string().trim().url().optional().nullable(),
      categoryId: z.string().min(1).optional(),
    })
    .refine((value) => Object.keys(value).length > 0, {
      message: "Provide at least one field to update",
    }),
  params: z.object({
    productId: z.string().min(1, "Product id is required"),
  }),
});
