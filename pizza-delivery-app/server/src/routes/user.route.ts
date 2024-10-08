import { Router } from "express";

import { getUserHandler } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getUserHandler);

export { userRouter };
