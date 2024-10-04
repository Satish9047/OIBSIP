import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { ApiError } from "../utils/apiResponse";
import { appConfig } from "../configs/app.config";
import { ISignIn, IUser } from "../interface/app.interface";

export const signUpService = async (signUpData: IUser) => {
  const userExist = await User.findOne({ email: signUpData.email });
  if (userExist) {
    throw new ApiError(400, "User already exist");
  }
  const user = await User.create(signUpData);
  const { password, ...userInfo } = user.toObject();
  return userInfo;
};

export const signInService = async (signInData: ISignIn) => {
  const user = await User.findOne({ email: signInData.email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordValid = await user.schema.methods.comparePassword.call(
    user,
    signInData.password
  );
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid password");
  }
  const { password, ...userInfo } = user.toObject();

  const token = jwt.sign(
    { id: user._id, email: user.email },
    appConfig.jwtSecret,
    {
      expiresIn: "1min",
    }
  );
  return { userInfo, token };
};
