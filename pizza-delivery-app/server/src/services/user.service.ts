import { User } from "../models/user.model";
import { ApiError } from "../utils/apiResponse";
const getUserService = async (id: string) => {
  const user = await User.findById(id);
  if (user) {
    const { password, ...userInfo } = user.toObject();
    return userInfo;
  }
  throw new ApiError(404, "User not found");
};
export { getUserService };
