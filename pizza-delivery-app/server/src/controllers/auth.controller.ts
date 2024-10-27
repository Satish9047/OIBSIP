import { Request, Response } from "express";

import { JwtPayload } from "jsonwebtoken";
import { sendMail } from "../utils/nodemailer";
import { appConfig } from "../configs/app.config";
import { JwtUser } from "../interface/app.interface";
import { asyncHandler } from "../utils/asyncHandler";
import { getRandomNumber } from "../utils/randomNumber";
import * as authServices from "../services/auth.service";
import { ApiError, ApiResponse } from "../utils/apiResponse";
import { setAccessCookies, setRefreshCookies } from "../utils/setCookie";

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
    setAccessCookies(res, accessToken);
    //REFRESH TOKEN
    setRefreshCookies(res, refreshToken);
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
      setAccessCookies(res, accessToken);
      throw new ApiError(403, "User is not verified");
    }
    //ACCESS TOKEN
    setAccessCookies(res, accessToken);
    //REFRESH TOKEN
    setRefreshCookies(res, refreshToken);
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
      // sameSite: "none",
      secure: appConfig.env === "production",
      path: "/",
      expires: new Date(Date.now() + appConfig.accessTokenCookieExpiry),
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
    if (!req.user) {
      res.status(200).json(new ApiResponse(200, "User already logged out"));
      return;
    }

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: appConfig.env === "production",
      path: "/",
    });
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: appConfig.env === "production",
      path: "/api/v1/auth/refresh-token",
    });

    res.status(200).json(new ApiResponse(200, "User logged out successfully"));
  }
);

/**
 * @desc          Forgot password
 * @route         POST /api/v1/auth/forget-password
 * @access        User | Admin
 */
export const forgotPasswordHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;
    if (!email) {
      throw new ApiError(400, "Email is required");
    }
    const { userInfo, resetLink } =
      await authServices.forgetPasswordService(email);
    await sendMail(
      email,
      "Password Reset Link to Pizza Lovers",
      `Hi, ${userInfo.name}! Please click on the link below to reset your password.
      ${resetLink}`
    );
    res.json(new ApiResponse(200, "Password reset link sent to your email"));
  }
);

/**
 * @desc          Reset password
 * @route         POST /api/v1/auth/reset-password
 * @access        User | Admin
 */
export const resetPasswordHandler = asyncHandler(
  async (req: Request, res: Response) => {
    const { newPassword, resetToken } = req.body;
    if (!newPassword || !resetToken) {
      throw new ApiError(400, "All fields are required");
    }
    const { userInfo } = await authServices.resetPasswordService(
      resetToken,
      newPassword
    );

    res.json(new ApiResponse(200, "Password reset successful", userInfo));
  }
);
