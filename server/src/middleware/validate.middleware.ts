import type { NextFunction, Request, Response } from "express";
import type { ZodError, ZodTypeAny } from "zod";

export const validate =
  (schema: ZodTypeAny) => (req: Request, _res: Response, next: NextFunction) => {
    const payload = {
      body: req.body ?? {},
      params: req.params ?? {},
      query: req.query ?? {},
    };

    const result = schema.safeParse(payload) as
      | {
          success: true;
          data: {
            body?: unknown;
            params?: unknown;
            query?: unknown;
          };
        }
      | {
          success: false;
          error: ZodError;
        };

    if (!result.success) {
      return next({
        statusCode: 400,
        message: "Validation failed",
        issues: result.error.issues,
      });
    }

    if ("body" in result.data) {
      req.body = result.data.body as typeof req.body;
    }

    if ("params" in result.data) {
      req.params = result.data.params as typeof req.params;
    }

    if ("query" in result.data) {
      req.query = result.data.query as typeof req.query;
    }

    next();
  };
