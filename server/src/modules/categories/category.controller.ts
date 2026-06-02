import type { RequestHandler } from "express";

import * as categoryService from "./category.service";
import type { CategoryIdParams, CreateCategoryInput, UpdateCategoryInput } from "./category.types";

export const listCategories: RequestHandler = async (_req, res) => {
  const categories = await categoryService.listCategories();

  return res.status(200).json(categories);
};

export const createCategory: RequestHandler = async (req, res) => {
  const category = await categoryService.createCategory(req.body as CreateCategoryInput["body"]);

  return res.status(201).json(category);
};

export const updateCategory: RequestHandler = async (req, res) => {
  const { categoryId } = req.params as CategoryIdParams["params"];
  const category = await categoryService.updateCategory(
    categoryId,
    req.body as UpdateCategoryInput["body"],
  );

  return res.status(200).json(category);
};

export const deleteCategory: RequestHandler = async (req, res) => {
  const { categoryId } = req.params as CategoryIdParams["params"];
  const result = await categoryService.deleteCategory(categoryId);

  return res.status(200).json(result);
};
