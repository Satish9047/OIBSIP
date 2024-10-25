import { Router } from "express";

import {
  signUpHandler,
  signInHandler,
  verificationHandler,
  refreshTokenHandler,
  logoutHandler,
  getMeHandler,
  forgotPasswordHandler,
  resetPasswordHandler,
} from "../controllers/auth.controller";
import { signInSchema, signUpSchema } from "../schema/user.schema";
import { validateData } from "../middlewares/validation.middleware";
import { verifyRefreshToken, verifyToken } from "../middlewares/jwt.middleware";

const authRouter = Router();

authRouter.post("/sign-up", validateData(signUpSchema), signUpHandler);
authRouter.post("/sign-in", validateData(signInSchema), signInHandler);
authRouter.get("/me", verifyToken, getMeHandler);
authRouter.post("/verify-user", verifyToken, verificationHandler);
authRouter.get("/refresh-token", verifyRefreshToken, refreshTokenHandler);
authRouter.post("/sign-out", verifyToken, logoutHandler);
authRouter.post("/forgot-password", forgotPasswordHandler);
authRouter.post("/reset-password", resetPasswordHandler);

export { authRouter };
