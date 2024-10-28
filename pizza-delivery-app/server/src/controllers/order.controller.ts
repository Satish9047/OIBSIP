import { Request, Response } from "express";
import { verifyPayPalPayment, checkIfNewTransaction } from "../utils/paypal";

import { asyncHandler } from "../utils/asyncHandler";
import * as orderServices from "../services/order.service";
import { ApiError, ApiResponse } from "../utils/apiResponse";
import { JwtUser } from "../interface/app.interface";
import { OrderPizza } from "../models/order.model";

/**
 * @desc          Get all order
 * @route         GET /api/v1/order
 * @access        Admin
 */
export const getAllOrderHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await orderServices.getAllOrderService();
    res.json(new ApiResponse(200, "Order fetched successful", data));
  }
);

/**
 * @desc          Get order by user
 * @route         GET /api/v1/order/user
 * @access        User
 */
export const getOrderByUserHandler = asyncHandler(
  async (req: Request & { user?: JwtUser }, res: Response) => {
    if (!req.user) {
      throw new ApiResponse(401, "Unauthorized");
    }
    const user = req.user;
    const data = await orderServices.getOrderByUserService(user);
    res.json(new ApiResponse(200, "Order fetched successful", data));
  }
);

/**
 * @desc          Create Pizza Order
 * @route         POST /api/v1/order
 * @access        User
 */
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

/**
 * @desc          Update order by id
 * @route         PUT /api/v1/order/:id
 * @access        Admin
 */
export const updateOrderDeliverHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await orderServices.updateOrderDeliverService(
      req.params.id,
      req.body
    );
    res.json(new ApiResponse(200, "Order updated successful", data));
  }
);

/**
 * @desc          Delete order by id
 * @route         DELETE /api/v1/order/:id
 * @access        Admin
 */
export const deleteOrderHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await orderServices.deleteOrderService(req.params.id);
    res.json(new ApiResponse(200, "Order deleted successful", data));
  }
);

/**
 * @desc          Update Order to paid
 * @route         PUT /api/v1/order/:id/pay
 * @access        Admin
 */
export const updateOrderToPaidHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { verified, value } = await verifyPayPalPayment(req.body.id);
    if (!verified) throw new ApiError(401, "Payment not verified");

    const isNewTransaction = await checkIfNewTransaction(
      OrderPizza,
      req.body.id
    );
    if (!isNewTransaction)
      throw new ApiError(400, "Transaction has been used before");

    const { updatedOrder } = await orderServices.updateOrderToPaidService(
      req.params.id,
      value
    );
    res.json(new ApiResponse(200, "Order updated successful", updatedOrder));
  }
);
