import { Router } from "express";

import { protect } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import * as cartController from "./cart.controller";
import {
  addToCartSchema,
  cartItemParamSchema,
  updateCartItemSchema,
} from "./cart.validation";

const cartRouter = Router();

cartRouter.use(protect);

cartRouter.get("/", cartController.getCart);
cartRouter.post("/", validate(addToCartSchema), cartController.addToCart);
cartRouter.patch("/:cartItemId", validate(updateCartItemSchema), cartController.updateCartItem);
cartRouter.delete("/:cartItemId", validate(cartItemParamSchema), cartController.removeCartItem);

export default cartRouter;
