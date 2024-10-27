import { Response } from "express";
import { appConfig } from "../configs/app.config";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

export const setAccessCookies = (res: Response, accessToken: string) => {
  res.cookie("accessToken", accessToken, {
    ...cookieOptions,
    path: "/",
    expires: new Date(Date.now() + appConfig.accessTokenCookieExpiry),
  });
};
export const setRefreshCookies = (res: Response, refreshToken: string) => {
  res.cookie("refreshToken", refreshToken, {
    ...cookieOptions,
    path: "/api/v1/auth/refresh-token",
    expires: new Date(Date.now() + appConfig.refreshCookieExpiry),
  });
};
