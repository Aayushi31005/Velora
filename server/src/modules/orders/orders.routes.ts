import { Router } from "express";

import { adminOnly } from "../../middleware/admin.middleware";
import { protect } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import * as ordersController from "./orders.controller";
import { orderIdParamSchema, updateOrderStatusSchema } from "./orders.validation";

const ordersRouter = Router();

ordersRouter.use(protect);

ordersRouter.post("/checkout", ordersController.checkout);
ordersRouter.get("/", ordersController.listOrders);
ordersRouter.get("/admin/all", adminOnly, ordersController.listAllOrders);
ordersRouter.get("/:orderId", validate(orderIdParamSchema), ordersController.getOrderById);
ordersRouter.patch(
  "/:orderId/status",
  adminOnly,
  validate(updateOrderStatusSchema),
  ordersController.updateOrderStatus,
);

export default ordersRouter;
