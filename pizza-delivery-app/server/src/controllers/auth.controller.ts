import { Request, Response } from "express";

import { sendMail } from "../utils/nodemailer";
import { ApiError, ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { getRandomNumber } from "../utils/randomNumber";
import * as authServices from "../services/auth.service";
import { JwtPayload } from "jsonwebtoken";

export const signUpHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const verificationCode = getRandomNumber();
    const { userInfo, accessToken, refreshToken } =
      await authServices.signUpService(req.body, verificationCode);
    await sendMail(
      userInfo.email,
      "Verification Email to Pizza Lovers",
      `Hi, ${userInfo.name}! Welcome to Pizza Lovers. Your verification code is ${verificationCode}.`
    );
    //ACCESS TOKEN
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    //REFRESH TOKEN
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/api/auth/refresh-token",
    });
    res.json(new ApiResponse(201, "User created successfully", userInfo));
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

export const verificationHandler = asyncHandler(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const { verificationCode } = req.body;
    const user = req.user; //
    if (!user) {
      throw new ApiError(401, "Unauthorized access");
    }
    const data = authServices.userVerificationService(
      user.email,
      verificationCode
    );
    if (!data) {
      throw new ApiError(400, "Invalid verification code");
    }
    res.json(new ApiResponse(200, "User verified successfully"));
  }
);
