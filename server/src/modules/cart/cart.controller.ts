import type { RequestHandler } from "express";

import type { AuthRequest } from "../../middleware/auth.middleware";
import * as cartService from "./cart.service";
import type { AddToCartInput, CartItemParams, UpdateCartItemInput } from "./cart.types";

const getAuthenticatedUserId = (req: AuthRequest) => req.user?.userId ?? "";

export const getCart: RequestHandler = async (req, res) => {
  const cart = await cartService.getCart(getAuthenticatedUserId(req as AuthRequest));

  return res.status(200).json(cart);
};

export const addToCart: RequestHandler = async (req, res) => {
  const cart = await cartService.addToCart(
    getAuthenticatedUserId(req as AuthRequest),
    req.body as AddToCartInput["body"],
  );

  return res.status(200).json(cart);
};

export const updateCartItem: RequestHandler = async (req, res) => {
  const { cartItemId } = req.params as CartItemParams["params"];
  const cart = await cartService.updateCartItem(
    getAuthenticatedUserId(req as AuthRequest),
    cartItemId,
    req.body as UpdateCartItemInput["body"],
  );

  return res.status(200).json(cart);
};

export const removeCartItem: RequestHandler = async (req, res) => {
  const { cartItemId } = req.params as CartItemParams["params"];
  const cart = await cartService.removeCartItem(getAuthenticatedUserId(req as AuthRequest), cartItemId);

  return res.status(200).json(cart);
};
