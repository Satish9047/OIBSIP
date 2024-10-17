import { Router } from "express";

import {
  signUpHandler,
  signInHandler,
  verificationHandler,
  refreshTokenHandler,
  logoutHandler,
  getMeHandler,
} from "../controllers/auth.controller";
import { verifyRefreshToken, verifyToken } from "../middlewares/jwt.middleware";
import { signInSchema, signUpSchema } from "../schema/user.schema";
import { validateData } from "../middlewares/validation.middleware";

const authRouter = Router();

authRouter.post("/sign-up", validateData(signUpSchema), signUpHandler);
authRouter.post("/sign-in", validateData(signInSchema), signInHandler);
authRouter.get("/me", verifyToken, getMeHandler);
authRouter.post("/verify-user", verifyToken, verificationHandler);
authRouter.get("/refresh-token", verifyRefreshToken, refreshTokenHandler);
authRouter.get("/logout", verifyToken, logoutHandler);

export { authRouter };
