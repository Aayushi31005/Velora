import { Router } from "express";

import { protect } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import * as authController from "./auth.controller";
import { loginSchema, registerSchema } from "./auth.validation";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), authController.register);
authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.get("/me", protect, authController.me);

export default authRouter;
