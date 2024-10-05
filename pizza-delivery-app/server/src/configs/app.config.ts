import dotenv from "dotenv";
dotenv.config();

interface IAppConfig {
  port: string;
  saltRound: number;
  jwtSecret: string;
  mongodbUrl: string;
  email: string;
  password: string;
}

export const appConfig: IAppConfig = {
  port: process.env.PORT || "3000",
  saltRound: 10,
  jwtSecret: process.env.JWT_SECRET as string,
  mongodbUrl:
    `${process.env.MONGODB_URL}/pizza-app` ||
    "mongodb://localhost:27017/pizza-app",
  email: process.env.EMAIL || "",
  password: process.env.PASSWORD || "",
};
