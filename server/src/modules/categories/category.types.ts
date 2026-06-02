import { z } from "zod";

import {
  categoryIdParamSchema,
  createCategorySchema,
  updateCategorySchema,
} from "./category.validation";

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CategoryIdParams = z.infer<typeof categoryIdParamSchema>;
