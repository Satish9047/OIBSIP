import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("This is user route");
});

export { userRouter };
