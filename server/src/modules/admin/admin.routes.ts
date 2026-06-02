import { Router } from "express";

import { adminOnly } from "../../middleware/admin.middleware";
import { protect } from "../../middleware/auth.middleware";
import * as adminController from "./admin.controller";

const adminRouter = Router();

adminRouter.use(protect, adminOnly);

adminRouter.get("/analytics", adminController.getAnalyticsSummary);

export default adminRouter;
