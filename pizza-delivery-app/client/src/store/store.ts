import { configureStore } from "@reduxjs/toolkit";
import { apiServices } from "../redux/apiServices";
import userReducer from "../redux/state/userSlice";

export const store = configureStore({
  reducer: {
    [apiServices.reducerPath]: apiServices.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiServices.middleware),
});
