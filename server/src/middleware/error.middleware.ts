import type { NextFunction, Request, Response } from "express";

export class HttpError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const notFoundHandler = (_req: Request, _res: Response, next: NextFunction) => {
  next(new HttpError(404, "Route not found"));
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    "message" in error
  ) {
    const statusCode = Number(error.statusCode) || 500;
    const message = String(error.message);
    const issues = "issues" in error ? error.issues : undefined;

    return res.status(statusCode).json({
      message,
      ...(issues ? { issues } : {}),
    });
  }

  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  console.error(error);

  return res.status(500).json({
    message: "Internal server error",
  });
};
