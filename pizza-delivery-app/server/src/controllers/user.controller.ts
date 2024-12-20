import { Request, Response } from "express";

import { asyncHandler } from "../utils/asyncHandler";
import * as userServices from "../services/user.service";
import { ApiError, ApiResponse } from "../utils/apiResponse";

/**
 * @desc          Get user details
 * @route         GET /users/me
 * @access        Private
 */
export const getUserHandler = asyncHandler(
  async (
    req: Request & { user?: { id: string; email: string; role: string } },
    res: Response
  ) => {
    const user = req.user;
    if (!user) {
      throw new ApiError(401, "Unauthorized access");
    }
    const data = await userServices.getUserService(user.id);
    res.json(new ApiResponse(200, "user is Valid", data));
  }
);
