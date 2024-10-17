import jwt from "jsonwebtoken";
import { appConfig } from "../configs/app.config";

export const createJwtToken = (id: string, email: string, role: string) => {
  const accessToken = jwt.sign({ id, email, role }, appConfig.accessJwtSecret, {
    expiresIn: "10min",
  });
  const refreshToken = jwt.sign(
    { id, email, role },
    appConfig.refreshJwtSecret,
    {
      expiresIn: "1d",
    }
  );
  return { accessToken, refreshToken };
};

export const createAccessToken = (id: string, email: string, role: string) => {
  const accessToken = jwt.sign({ id, email, role }, appConfig.accessJwtSecret, {
    expiresIn: "10min",
  });
  return accessToken;
};
