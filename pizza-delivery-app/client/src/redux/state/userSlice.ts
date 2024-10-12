import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

const initialState: IUser = {
  name: "",
  email: "",
  phone: "",
  address: "",
  createdAt: "",
  updatedAt: "",
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
