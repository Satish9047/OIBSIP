import { Router } from "express";

import { signUpHandler, signInHandler } from "../controllers/auth.controller";
import { validateData } from "../middlewares/validation.middleware";
import { signInSchema, signUpSchema } from "../schema/user.schema";

const authRouter = Router();

authRouter.post("/sign-up", validateData(signUpSchema), signUpHandler);
authRouter.post("/sign-in", validateData(signInSchema), signInHandler);

export { authRouter };
