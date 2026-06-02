import type { RequestHandler } from "express";

import type { AuthRequest } from "../../middleware/auth.middleware";
import * as ordersService from "./orders.service";
import type { OrderIdParams, UpdateOrderStatusInput } from "./orders.types";

const getAuthenticatedUserId = (req: AuthRequest) => req.user?.userId ?? "";

export const checkout: RequestHandler = async (req, res) => {
  const order = await ordersService.checkout(getAuthenticatedUserId(req as AuthRequest));

  return res.status(201).json(order);
};

export const listOrders: RequestHandler = async (req, res) => {
  const orders = await ordersService.listOrders(getAuthenticatedUserId(req as AuthRequest));

  return res.status(200).json(orders);
};

export const listAllOrders: RequestHandler = async (_req, res) => {
  const orders = await ordersService.listAllOrders();

  return res.status(200).json(orders);
};

export const getOrderById: RequestHandler = async (req, res) => {
  const { orderId } = req.params as OrderIdParams["params"];
  const order = await ordersService.getOrderById(getAuthenticatedUserId(req as AuthRequest), orderId);

  return res.status(200).json(order);
};

export const updateOrderStatus: RequestHandler = async (req, res) => {
  const { orderId } = req.params as OrderIdParams["params"];
  const order = await ordersService.updateOrderStatus(
    orderId,
    req.body as UpdateOrderStatusInput["body"],
  );

  return res.status(200).json(order);
};
