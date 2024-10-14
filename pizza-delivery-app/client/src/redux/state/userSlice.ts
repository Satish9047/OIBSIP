import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../interface/app.interface";

const initialState: IUser = {
  _id: "",
  name: "",
  email: "",
  phone: "",
  address: "",
  role: "",
  verificationToken: "",
  isVerified: false,
  createdAt: "",
  updatedAt: "",
  _v: 0,
};

export const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    addUserState: (state, action: PayloadAction<IUser>) => {
      return { ...state, ...action.payload };
    },
    removeUserState: () => {
      return initialState;
    },
  },
});

export const { addUserState, removeUserState } = userSlice.actions;
export default userSlice.reducer;
