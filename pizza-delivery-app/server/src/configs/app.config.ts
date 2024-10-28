import dotenv from "dotenv";
dotenv.config();

interface IAppConfig {
  port: string;
  saltRound: number;
  accessJwtSecret: string;
  refreshJwtSecret: string;
  mongodbUrl: string;
  email: string;
  password: string;
  accessTokenExpiry: string;
  refreshTokenExpiry: string;
  accessTokenCookieExpiry: number;
  refreshCookieExpiry: number;
  env: string;
  clientUrl: string;
}

export const appConfig: IAppConfig = {
  // MongoDB
  mongodbUrl:
    `${process.env.MONGODB_URL}/pizza-app` ||
    "mongodb://localhost:27017/pizza-app",

  // APP
  port: process.env.PORT || "3000",
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",

  // BCRYPT
  saltRound: 10,

  // JWT
  accessJwtSecret: process.env.ACCESS_JWT_SECRET as string,
  refreshJwtSecret: process.env.REFRESH_JWT_SECRET as string,
  // accessTokenExpiry: "10m",
  accessTokenExpiry: "10s",
  refreshTokenExpiry: "1d",

  // Nodemailer
  email: process.env.EMAIL || "",
  password: process.env.PASSWORD || "",

  // Cookie Expiry
  // accessTokenCookieExpiry: 1000 * 60 * 10,
  accessTokenCookieExpiry: 1000 * 10,
  refreshCookieExpiry: 1000 * 60 * 60 * 24,

  // Environment
  env: process.env.NODE_ENV || "development",
};
