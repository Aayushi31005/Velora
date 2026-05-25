import type { NextFunction, Request, Response, RequestHandler } from "express";

import type { AuthRequest } from "../../middleware/auth.middleware";
import { loginUser, registerUser } from "./auth.services";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    const result = await registerUser(
      name,
      email,
      password
    );

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(
      email,
      password
    );

    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const me: RequestHandler = async (
  req: AuthRequest,
  res: Response
) => {
  res.json({
    user: req.user,
  });
};
