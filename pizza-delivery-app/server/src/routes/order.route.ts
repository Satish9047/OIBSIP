import { Router } from "express";

import {
  getAllOrderHandler,
  createOrderHandler,
  updateOrderDeliverHandler,
  deleteOrderHandler,
} from "../controllers/order.controller";
import { verifyToken, verifyAdmin } from "../middlewares/jwt.middleware";

const orderRouter = Router();

orderRouter.get("/", verifyAdmin, getAllOrderHandler);
orderRouter.post("/", verifyToken, createOrderHandler);
orderRouter.put("/:id", verifyAdmin, updateOrderDeliverHandler);
orderRouter.delete("/:id", verifyAdmin, deleteOrderHandler);

export { orderRouter };
