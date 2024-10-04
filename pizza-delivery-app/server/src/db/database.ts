import mongoose from "mongoose";

import { appConfig } from "../configs/app.config";

export const connectDb = async () => {
  try {
    await mongoose.connect(appConfig.mongodbUrl);
    console.log("MongoDB connected successfully...");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};
