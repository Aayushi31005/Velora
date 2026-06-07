import type { RequestHandler } from "express";

import * as productService from "./product.service";
import type {
  CreateProductInput,
  ListProductsQuery,
  ProductIdParams,
  UpdateProductInput,
} from "./product.types";

export const listProducts: RequestHandler = async (req, res) => {
  const query =
    (res.locals.validatedQuery as
      | ListProductsQuery["query"]
      | undefined) ??
    (req.query as unknown as ListProductsQuery["query"]);
  const products = await productService.listProducts(query);

  return res.status(200).json(products);
};

export const getProductById: RequestHandler = async (req, res) => {
  const product = await productService.getProductById(
    (req.params as ProductIdParams["params"]).productId,
  );

  return res.status(200).json(product);
};

export const getProductBySlug: RequestHandler = async (req, res) => {
  const product = await productService.getProductBySlug(req.params.slug as unknown as string);

  return res.status(200).json(product);
};

export const createProduct: RequestHandler = async (req, res) => {
  const product = await productService.createProduct(req.body as CreateProductInput["body"]);

  return res.status(201).json(product);
};

export const updateProduct: RequestHandler = async (req, res) => {
  const { productId } = req.params as ProductIdParams["params"];
  const product = await productService.updateProduct(
    productId,
    req.body as UpdateProductInput["body"],
  );

  return res.status(200).json(product);
};

export const deleteProduct: RequestHandler = async (req, res) => {
  const result = await productService.deleteProduct(
    (req.params as ProductIdParams["params"]).productId,
  );

  return res.status(200).json(result);
};
