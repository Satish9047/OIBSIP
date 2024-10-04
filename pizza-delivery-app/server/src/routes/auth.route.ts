import { Router } from "express";

import { signUpHandler, signInHandler } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/sign-up", signUpHandler);
authRouter.post("/sign-in", signInHandler);

export { authRouter };
