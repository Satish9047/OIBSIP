import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.use("/api/v1", (req: Request, res: Response) => {
  res.send("Hello Pizza Lovers");
});

export default app;
