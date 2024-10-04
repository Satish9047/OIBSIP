import { Request, Response } from "express";

import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import * as authService from "../services/auth.service";

export const signUpHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await authService.signUpService(req.body);
    res.json(new ApiResponse(201, "User created successfully", data));
  }
);

export const signInHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await authService.signInService(req.body);
    res.json(new ApiResponse(200, "User sign in successfully", data));
  }
);
