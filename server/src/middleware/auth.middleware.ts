import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { getJwtSecret } from "../config/env";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: string;
  };
}

export const protect = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      getJwtSecret()
    ) as {
      userId: string;
      role: string;
    };

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
