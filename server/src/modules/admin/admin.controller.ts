import type { RequestHandler } from "express";

import * as adminService from "./admin.service";

export const getAnalyticsSummary: RequestHandler = async (_req, res) => {
  const summary = await adminService.getAnalyticsSummary();

  return res.status(200).json(summary);
};
