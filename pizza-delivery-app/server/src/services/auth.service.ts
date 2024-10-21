import { User } from "../models/user.model";
import { ApiError } from "../utils/apiResponse";
import { ISignIn, IUser } from "../interface/app.interface";
import { createAccessToken, createJwtToken } from "../utils/jwtToken";
import { getRandomNumber } from "../utils/randomNumber";

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
  const { password, ...userInfo } = user.toObject();
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

  const { password, ...userInfo } = user.toObject();
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
  return user;
};

export const refreshTokenService = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const { password, ...userInfo } = user.toObject();
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
