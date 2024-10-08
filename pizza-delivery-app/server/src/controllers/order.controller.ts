import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import * as orderServices from "../services/order.service";
import { ApiResponse } from "../utils/apiResponse";
import { JwtPayload } from "jsonwebtoken";
import { JwtUser } from "../interface/app.interface";

export const getAllOrderHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await orderServices.getAllOrderService();
    res.json(new ApiResponse(200, "Order fetched successful", data));
  }
);

export const createOrderHandler = asyncHandler(
  async (req: Request & { user?: JwtUser }, res: Response) => {
    if (!req.user) {
      throw new ApiResponse(401, "Unauthorized");
    }
    const user = req.user;
    const data = await orderServices.createOrderService(user, req.body);
    res.json(new ApiResponse(201, "Order created successful", data));
  }
);

export const updateOrderDeliverHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await orderServices.updateOrderDeliverService(
      req.params.id,
      req.body
    );
    res.json(new ApiResponse(200, "Order updated successful", data));
  }
);

export const deleteOrderHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await orderServices.deleteOrderService(req.params.id);
    res.json(new ApiResponse(200, "Order deleted successful", data));
  }
);
