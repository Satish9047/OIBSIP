import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { ApiError } from "../utils/apiResponse";
import { appConfig } from "../configs/app.config";
import { JwtUser } from "../interface/app.interface";

const verifyToken = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }
  try {
    const decoded = jwt.verify(token, appConfig.jwtSecret) as JwtPayload;
    if (!decoded || !decoded.id || !decoded.email) {
      throw new ApiError(401, "Invalid token");
    }
    req.user = decoded as JwtUser;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new ApiError(401, "Token expired");
    } else if (error instanceof JsonWebTokenError) {
      throw new ApiError(401, "Invalid token");
    } else {
      throw new ApiError(500, "Internal server error");
    }
  }
};

const verifyRefreshToken = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    throw new ApiError(401, "Unauthorized Request");
  }
  try {
    const decoded = jwt.verify(token, appConfig.jwtSecret) as JwtPayload;
    if (!decoded || !decoded.id || !decoded.email) {
      throw new ApiError(401, "Invalid token");
    }
    req.user = decoded as JwtUser;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new ApiError(401, "Token expired");
    } else if (error instanceof JsonWebTokenError) {
      throw new ApiError(401, "Invalid token");
    } else {
      throw new ApiError(500, "Internal server error");
    }
  }
};

export { verifyToken, verifyRefreshToken };
