import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import * as orderServices from "../services/order.service";
import { ApiResponse } from "../utils/apiResponse";

export const getAllOrderHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await orderServices.getAllOrderService();
    res.json(new ApiResponse(200, "Order fetched successful", data));
  }
);

export const createOrderHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await orderServices.createOrderService(req.body);
    res.json(new ApiResponse(201, "Order created successful", data));
  }
);

export const updateOrderHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await orderServices.updateOrderService(
      req.params.id,
      req.body
    );
    res.json(new ApiResponse(200, "Order updated successful"));
  }
);

export const deleteOrderHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await orderServices.deleteOrderService(req.params.id);
    res.json(new ApiResponse(200, "Order deleted successful"));
  }
);
