import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";
import { ApiError } from "../utils/apiResponse";

export const validateData = (schema: z.ZodType) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ApiError(400, error.issues[0].message);
      }
      throw new ApiError(400, "Invalid data");
    }
  };
};
