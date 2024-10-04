import { Router } from "express";

const orderRouter = Router();

orderRouter.post("/", (req, res) => {
  res.send("This is order route");
});

export { orderRouter };
