import nodemailer from "nodemailer";

import { appConfig } from "../configs/app.config";
import { ApiError } from "./apiResponse";

export const sendMail = async (to: string, subject: string, text: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: appConfig.email,
        pass: appConfig.password,
      },
    });
    const message = {
      from: appConfig.email,
      to,
      subject,
      text,
    };

    await transporter.sendMail(message);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new ApiError(400, "Failed to send email");
  }
};
