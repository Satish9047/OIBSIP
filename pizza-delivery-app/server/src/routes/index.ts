import { Request, Response, Router } from "express";

import { authRouter } from "./auth.route";
import { userRouter } from "./user.route";
import { orderRouter } from "./order.route";
import { inventoryRoute } from "./inventory";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/order", orderRouter);
router.use("/inventory", inventoryRoute);

// Paypal
router.get("/config/paypal", (req: Request, res: Response) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

export default router;
