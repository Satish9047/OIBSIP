import { z } from "zod";

export const orderSchema = z.object({
  pizzaBaseId: z.string(),
  pizzaSauceId: z.string(),
  pizzaCheeseId: z.string(),
  pizzaVeggiesIds: z.string(),
  pizzaNonVegIds: z.string(),
  quantity: z.string().min(1, "Quantity must be at least 1"),
});
