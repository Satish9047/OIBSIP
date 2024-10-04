import { Request, Response } from "express";

import { ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import * as authServices from "../services/auth.service";

export const signUpHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await authServices.signUpService(req.body);
    res.json(new ApiResponse(201, "User created successfully", data));
  }
);

export const signInHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { userInfo, accessToken, refreshToken } =
      await authServices.signInService(req.body);
    //ACCESS TOKEN
    res.cookie("token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    //REFRESH TOKEN
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.json(new ApiResponse(200, "User sign in successfully", userInfo));
  }
);
