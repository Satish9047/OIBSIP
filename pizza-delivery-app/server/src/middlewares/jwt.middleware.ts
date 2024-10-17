import jwt, {
  JsonWebTokenError,
  JwtPayload,
  TokenExpiredError,
} from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { ApiError } from "../utils/apiResponse";
import { appConfig } from "../configs/app.config";
import { JwtUser } from "../interface/app.interface";
import { verifyAdminService } from "../services/auth.service";

const verifyToken = async (
  req: Request & { user?: JwtUser },
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.accessToken;

  if (!token) {
    return next(new ApiError(401, "Unauthorized"));
  }

  try {
    const decoded = jwt.verify(
      token,
      appConfig.accessJwtSecret
    ) as JwtPayload & {
      id: string;
      email: string;
    };

    if (!decoded || !decoded.id || !decoded.email) {
      return next(new ApiError(401, "Invalid token"));
    }

    req.user = decoded as JwtUser;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(new ApiError(401, "Token expired"));
    } else if (error instanceof JsonWebTokenError) {
      return next(new ApiError(401, "Invalid token"));
    } else {
      return next(new ApiError(500, "Internal server error"));
    }
  }
};

export default verifyToken;

const verifyRefreshToken = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    return next(new ApiError(401, "Unauthorized Request"));
  }
  try {
    const decoded = jwt.verify(token, appConfig.refreshJwtSecret) as JwtPayload;
    if (!decoded || !decoded.id || !decoded.email) {
      return next(new ApiError(401, "Invalid token"));
    }
    req.user = decoded as JwtUser;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(new ApiError(401, "Token expired"));
    } else if (error instanceof JsonWebTokenError) {
      return next(new ApiError(401, "Invalid token"));
    } else {
      return next(new ApiError(500, "Internal server error"));
    }
  }
};

const verifyAdmin = async (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token) {
    next(new ApiError(401, "Unauthorized Request"));
  }
  try {
    const decoded = jwt.verify(token, appConfig.accessJwtSecret) as JwtPayload;
    if (!decoded || !decoded.id || !decoded.email) {
      return next(new ApiError(401, "Invalid token"));
    }
    req.user = decoded as JwtUser;
    const user = await verifyAdminService(decoded.id);
    if (!user) {
      return next(new ApiError(401, "Unauthorized Request"));
    }
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return next(new ApiError(401, "Token expired"));
    } else if (error instanceof JsonWebTokenError) {
      next(new ApiError(401, "Invalid token"));
    } else {
      return next(new ApiError(500, "Internal server error"));
    }
  }
};

export { verifyToken, verifyRefreshToken, verifyAdmin };
