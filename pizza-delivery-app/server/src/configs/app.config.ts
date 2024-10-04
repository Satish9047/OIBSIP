import dotenv from "dotenv";
dotenv.config();

interface AppConfig {
  port: string;
  saltRound: number;
  mongodbUrl: string;
}

export const appConfig: AppConfig = {
  port: process.env.PORT || "3000",
  saltRound: 10,
  mongodbUrl:
    `${process.env.MONGODB_URL}/pizza-app` ||
    "mongodb://localhost:27017/pizza-app",
};
