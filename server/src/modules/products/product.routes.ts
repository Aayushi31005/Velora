import { Router } from "express";

import { adminOnly } from "../../middleware/admin.middleware";
import { protect } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import * as productController from "./product.controller";
import {
  createProductSchema,
  listProductsQuerySchema,
  productIdParamSchema,
  productSlugParamSchema,
  updateProductSchema,
} from "./product.validation";

const productRouter = Router();

productRouter.get("/", validate(listProductsQuerySchema), productController.listProducts);
productRouter.get("/slug/:slug", validate(productSlugParamSchema), productController.getProductBySlug);
productRouter.get("/:productId", validate(productIdParamSchema), productController.getProductById);
productRouter.post("/", protect, adminOnly, validate(createProductSchema), productController.createProduct);
productRouter.patch("/:productId", protect, adminOnly, validate(updateProductSchema), productController.updateProduct);
productRouter.delete("/:productId", protect, adminOnly, validate(productIdParamSchema), productController.deleteProduct);

export default productRouter;
