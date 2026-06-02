import { Router } from "express";

import { adminOnly } from "../../middleware/admin.middleware";
import { protect } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import * as categoryController from "./category.controller";
import {
  categoryIdParamSchema,
  createCategorySchema,
  updateCategorySchema,
} from "./category.validation";

const categoryRouter = Router();

categoryRouter.get("/", categoryController.listCategories);
categoryRouter.post("/", protect, adminOnly, validate(createCategorySchema), categoryController.createCategory);
categoryRouter.patch(
  "/:categoryId",
  protect,
  adminOnly,
  validate(updateCategorySchema),
  categoryController.updateCategory,
);
categoryRouter.delete(
  "/:categoryId",
  protect,
  adminOnly,
  validate(categoryIdParamSchema),
  categoryController.deleteCategory,
);

export default categoryRouter;
