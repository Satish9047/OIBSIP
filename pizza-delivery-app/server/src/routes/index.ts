import { Router } from "express";

import { authRouter } from "./auth.route";
import { userRouter } from "./user.route";
import { orderRouter } from "./order.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/order", orderRouter);

export default router;
