import type { RequestHandler } from "express";

import * as categoryService from "./category.service";
import type { CreateCategoryInput } from "./category.types";

export const listCategories: RequestHandler = async (_req, res) => {
  const categories = await categoryService.listCategories();

  return res.status(200).json(categories);
};

export const createCategory: RequestHandler = async (req, res) => {
  const category = await categoryService.createCategory(req.body as CreateCategoryInput["body"]);

  return res.status(201).json(category);
};
