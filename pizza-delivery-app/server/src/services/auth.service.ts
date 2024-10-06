import { User } from "../models/user.model";
import { ApiError } from "../utils/apiResponse";
import { ISignIn, IUser } from "../interface/app.interface";
import { createJwtToken } from "../utils/jwtToken";

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
    userInfo.email
  );
  return { userInfo, accessToken, refreshToken };
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
  const { accessToken, refreshToken } = createJwtToken(
    userInfo._id.toString(),
    userInfo.email
  );
  return { userInfo, accessToken, refreshToken };
};

export const userVerificationService = async (email: String, token: number) => {
  const userExist = await User.findOne({ email });
  if (!userExist) {
    throw new ApiError(404, "User not found");
  }
  if (userExist.verificationToken !== token) {
    throw new ApiError(400, "Invalid verification code");
  }
  const user = await User.findOneAndUpdate({ email }, { isVerified: true });
  return user;
};
