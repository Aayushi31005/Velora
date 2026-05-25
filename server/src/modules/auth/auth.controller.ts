import type { Request, Response } from "express";

import type { AuthRequest } from "../../middleware/auth.middleware";
import { loginUser, registerUser } from "./auth.services";

const getAuthErrorStatus = (message: string, fallbackStatus: number) =>
  message.startsWith("Missing required environment var")
    ? 500
    : fallbackStatus;

export const register = async (
  req: Request,
  res: Response
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
    const message = (error as Error).message;

    res.status(getAuthErrorStatus(message, 400)).json({
      message,
    });
  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const result = await loginUser(
      email,
      password
    );

    res.json(result);
  } catch (error) {
    const message = (error as Error).message;

    res.status(getAuthErrorStatus(message, 401)).json({
      message,
    });
  }
};

export const me = async (
  req: AuthRequest,
  res: Response
) => {
  res.json({
    user: req.user,
  });
};
