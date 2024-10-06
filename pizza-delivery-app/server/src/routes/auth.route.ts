import { Router } from "express";

import {
  signUpHandler,
  signInHandler,
  verificationHandler,
} from "../controllers/auth.controller";
import { verifyToken } from "../middlewares/jwt.middleware";
import { signInSchema, signUpSchema } from "../schema/user.schema";
import { validateData } from "../middlewares/validation.middleware";

const authRouter = Router();

authRouter.post("/sign-up", validateData(signUpSchema), signUpHandler);
authRouter.post("/sign-in", validateData(signInSchema), signInHandler);
authRouter.post("/verify-user", verifyToken, verificationHandler);

export { authRouter };
