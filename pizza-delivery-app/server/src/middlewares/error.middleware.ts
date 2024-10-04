import { Request, Response, NextFunction } from "express";

import { ApiError } from "../utils/apiResponse";
/**
 * @description                 Error handler middleware
 * @param error                 ApiError
 * @param req                   Request object
 * @param res                   Response object
 * @param next                  NextFunction
 * @returns                     Error Response
 */
const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ApiError) {
    return res.status(error.status).json({
      success: error.success,
      message: error.message,
      data: null,
    });
  }
  return res.status(500).json({
    status: 500,
    message: "Internal Server Error",
    success: false,
    data: null,
  });
};

export default errorHandler;
