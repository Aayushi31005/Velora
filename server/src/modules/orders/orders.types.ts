import { z } from "zod";

import { orderIdParamSchema, updateOrderStatusSchema } from "./orders.validation";

export type OrderIdParams = z.infer<typeof orderIdParamSchema>;
export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
