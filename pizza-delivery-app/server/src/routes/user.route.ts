import { Router } from "express";

import { getUserHandler } from "../controllers/user.controller";
import verifyToken from "../middlewares/jwt.middleware";

const userRouter = Router();

userRouter.get("/", verifyToken, getUserHandler);

export { userRouter };
