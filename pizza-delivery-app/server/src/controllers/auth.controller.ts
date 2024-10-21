import { Request, Response } from "express";

import { sendMail } from "../utils/nodemailer";
import { ApiError, ApiResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { getRandomNumber } from "../utils/randomNumber";
import * as authServices from "../services/auth.service";
import { JwtPayload } from "jsonwebtoken";
import { JwtUser } from "../interface/app.interface";
import { appConfig } from "../configs/app.config";

/**
 * @desc          Sign up a new user
 * @route         POST /api/v1/auth/signup
 * @access        Public
 */
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
      secure: appConfig.env === "production",
      sameSite: "none",
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 10),
    });
    //REFRESH TOKEN
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: appConfig.env === "production",
      sameSite: "none",
      path: "/api/auth/refresh-token",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    res.json(new ApiResponse(201, "User created successful", userInfo));
  }
);

/**
 * @desc          Sign in a user
 * @route         POST /api/v1/auth/sign-in
 * @access        Public
 */
export const signInHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { userInfo, accessToken, refreshToken, verificationCode } =
      await authServices.signInService(req.body);

    if (!userInfo.isVerified) {
      await sendMail(
        userInfo.email,
        "Verification Email to Pizza Lovers",
        `Hi, ${userInfo.name}! Welcome to Pizza Lovers. Your verification code is ${verificationCode}.`
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: appConfig.env === "production",
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 10),
      });
      throw new ApiError(403, "User is not verified");
    }
    //ACCESS TOKEN
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: appConfig.env === "production",
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 10),
    });
    //REFRESH TOKEN
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: appConfig.env === "production",
      path: "/api/v1/auth/refresh-token",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    });
    res.json(new ApiResponse(200, "User sign in successful", userInfo));
  }
);

/**
 * @desc          Verify user
 * @route         POST /api/v1/auth/verify-user
 * @access        User | Admin after Sign Up
 */
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

/**
 * @desc          Refresh token
 * @route         POST /api/v1/auth/refresh-token
 * @access        User | Admin
 */
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
      secure: appConfig.env === "production",
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 10),
    });

    res.json(new ApiResponse(200, "Token refreshed successful", userInfo));
  }
);

/**
 * @desc          Get user data
 * @route         GET /api/v1/auth/me
 * @access        User | Admin
 */
export const getMeHandler = asyncHandler(
  async (req: Request & { user?: JwtUser }, res: Response) => {
    if (req.user) {
      res.json(new ApiResponse(200, "Valid User"));
    }
    throw new ApiError(404, "Invalid user request");
  }
);

/**
 * @desc          Logout user
 * @route         GET /api/v1/auth/logout
 * @access        User | Admin
 */
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
