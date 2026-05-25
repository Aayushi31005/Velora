import { z } from "zod";

import { createCategorySchema } from "./category.validation";

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
