import jwt from "jsonwebtoken";
import { appConfig } from "../configs/app.config";

export const createJwtToken = (id: string, email: string) => {
  const accessToken = jwt.sign({ id, email }, appConfig.jwtSecret, {
    expiresIn: "1min",
  });
  const refreshToken = jwt.sign({ id, email }, appConfig.jwtSecret, {
    expiresIn: "1d",
  });
  return { accessToken, refreshToken };
};
