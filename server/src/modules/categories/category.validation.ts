import { z } from "zod";

export const createCategorySchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100),
  }),
});

export const updateCategorySchema = z.object({
  params: z.object({
    categoryId: z.string().min(1, "Category id is required"),
  }),
  body: z.object({
    name: z.string().trim().min(2).max(100),
  }),
});

export const categoryIdParamSchema = z.object({
  params: z.object({
    categoryId: z.string().min(1, "Category id is required"),
  }),
});
