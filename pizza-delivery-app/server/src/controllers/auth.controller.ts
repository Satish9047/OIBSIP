import { Request, Response } from "express";

import { sendMail } from "../utils/nodemailer";
import { ApiError, ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { getRandomNumber } from "../utils/randomNumber";
import * as authServices from "../services/auth.service";
import { JwtPayload } from "jsonwebtoken";
import { JwtUser } from "../interface/app.interface";

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
    res.json(new ApiResponse(201, "User created successful", userInfo));
  }
);

export const signInHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { userInfo, accessToken, refreshToken } =
      await authServices.signInService(req.body);
    //ACCESS TOKEN
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
    });
    //REFRESH TOKEN
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
    });
    res.json(new ApiResponse(200, "User sign in successful", userInfo));
  }
);

export const verificationHandler = asyncHandler(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const { verificationCode } = req.body;
    const user = req.user;
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
    res.json(new ApiResponse(200, "User verified successful"));
  }
);

export const refreshTokenHandler = asyncHandler(
  async (req: Request & { user?: JwtPayload }, res: Response) => {
    const user = req.user;
    if (!user) {
      throw new ApiError(401, "Unauthorized access");
    }
    const { userInfo, accessToken } = await authServices.refreshTokenService(
      user.email
    );
    //ACCESS TOKEN
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "none",
      secure: false,
    });

    res.json(new ApiResponse(200, "Token refreshed successful", userInfo));
  }
);

export const getMeHandler = asyncHandler(
  async (req: Request & { user?: JwtUser }, res: Response) => {
    if (req.user) {
      res.json(new ApiResponse(200, "Valid User"));
    }
    throw new ApiError(404, "Invalid user request");
  }
);

export const logoutHandler = asyncHandler(
  async (req: Request & { user?: JwtUser }, res: Response) => {
    const user = req.user;
    if (!user) {
      throw new ApiError(401, "Unauthorized Request");
    }
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json(new ApiResponse(200, "User logged out successful"));
  }
);
