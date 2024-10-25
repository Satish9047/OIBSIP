import jwt from "jsonwebtoken";
import {
  createAccessToken,
  createJwtToken,
  resetPasswordToken,
} from "../utils/jwtToken";
import { User } from "../models/user.model";
import { ApiError } from "../utils/apiResponse";
import { appConfig } from "../configs/app.config";
import { getRandomNumber } from "../utils/randomNumber";
import { ISignIn, IUser } from "../interface/app.interface";

export const signUpService = async (
  signUpData: IUser,
  verificationCode: number
) => {
  const userExist = await User.findOne({ email: signUpData.email });
  if (userExist) {
    throw new ApiError(400, "User already exist");
  }
  signUpData.verificationToken = verificationCode;
  const user = await User.create(signUpData);
  const { password, verificationToken, ...userInfo } = user.toObject();
  const { accessToken, refreshToken } = createJwtToken(
    userInfo._id.toString(),
    userInfo.email,
    userInfo.role
  );
  return { userInfo, accessToken, refreshToken };
};

export const signInService = async (signInData: ISignIn) => {
  const { email } = signInData;
  const user = await User.findOne({ email });
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
  const verificationCode = getRandomNumber();
  if (!user.isVerified) {
    await User.findOneAndUpdate(
      { email },
      { verificationToken: verificationCode }
    );
  }

  const { password, verificationToken, ...userInfo } = user.toObject();
  const { accessToken, refreshToken } = createJwtToken(
    userInfo._id.toString(),
    userInfo.email,
    userInfo.role
  );
  return { userInfo, accessToken, refreshToken, verificationCode };
};

export const userVerificationService = async (email: String, token: number) => {
  const userExist = await User.findOne({ email });
  if (!userExist) {
    throw new ApiError(404, "User not found");
  }
  console.log("verify user token", token);
  if (userExist.verificationToken?.toString() !== token.toString()) {
    throw new ApiError(400, "Invalid verification code");
  }
  const user = await User.findOneAndUpdate({ email }, { isVerified: true });
  if (!user) {
    throw new ApiError(404, "Failed to verify user");
  }
  const { password, verificationToken, ...userInfo } = user.toObject();
  return userInfo;
};

export const refreshTokenService = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const { password, verificationToken, ...userInfo } = user.toObject();
  const accessToken = createAccessToken(
    userInfo._id.toString(),
    userInfo.email,
    userInfo.role
  );
  return { userInfo, accessToken };
};

export const verifyAdminService = async (id: string) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      return null;
    }
    if (user.role !== "admin") {
      return null;
    } else {
      return true;
    }
  } catch (error) {
    return null;
  }
};

export const forgetPasswordService = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const { password, verificationToken, ...userInfo } = user.toObject();
  const resetToken = resetPasswordToken(user._id.toString(), user.email);
  const resetLink = `${appConfig.clientUrl}/reset-password/${user._id.toString()}/${resetToken}`;

  return { userInfo, resetLink };
};

export const resetPasswordService = async (
  token: string,
  newPassword: string
) => {
  const decode = jwt.verify(token, appConfig.accessJwtSecret) as jwt.JwtPayload;
  if (!decode) {
    throw new ApiError(400, "Invalid token");
  }

  const user = await User.findByIdAndUpdate(
    {
      _id: decode.id,
    },
    {
      password: newPassword,
    }
  );
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const { password, verificationToken, ...userInfo } = user.toObject();
  return { userInfo };
};
