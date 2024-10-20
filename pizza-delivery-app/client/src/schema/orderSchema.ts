import { z } from "zod";

export const orderSchema = z.object({
  pizzaBaseId: z.string(),
  pizzaSauceId: z.string(),
  pizzaCheeseId: z.string(),
  pizzaVeggiesIds: z.array(z.string()),
  pizzaNonVegIds: z.array(z.string()),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});
