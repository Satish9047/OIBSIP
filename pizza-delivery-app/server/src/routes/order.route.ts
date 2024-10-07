import { Router } from "express";

import {
  getAllOrderHandler,
  createOrderHandler,
  updateOrderHandler,
  deleteOrderHandler,
} from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.get("/", getAllOrderHandler);
orderRouter.post("/", createOrderHandler);
orderRouter.put("/:id", updateOrderHandler);
orderRouter.delete("/:id", deleteOrderHandler);

export { orderRouter };
