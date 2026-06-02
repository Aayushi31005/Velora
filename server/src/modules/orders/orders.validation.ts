import { z } from "zod";

export const orderIdParamSchema = z.object({
  params: z.object({
    orderId: z.string().min(1, "Order id is required"),
  }),
});

export const updateOrderStatusSchema = z.object({
  params: z.object({
    orderId: z.string().min(1, "Order id is required"),
  }),
  body: z.object({
    status: z.enum(["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"]),
  }),
});
