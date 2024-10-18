import { Router } from "express";

import {
  getAllOrderHandler,
  createOrderHandler,
  updateOrderDeliverHandler,
  deleteOrderHandler,
  getOrderByUserHandler,
} from "../controllers/order.controller";
import { verifyToken, verifyAdmin } from "../middlewares/jwt.middleware";

const orderRouter = Router();

orderRouter.get("/", verifyAdmin, getAllOrderHandler);
orderRouter.get("/user", verifyToken, getOrderByUserHandler);
orderRouter.post("/", verifyToken, createOrderHandler);
orderRouter.put("/:id", verifyAdmin, updateOrderDeliverHandler);
orderRouter.delete("/:id", verifyAdmin, deleteOrderHandler);

export { orderRouter };
