import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiServices } from "../redux/apiServices";
import userReducer from "../redux/state/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  [apiServices.reducerPath]: apiServices.reducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiServices.middleware),
});

export const persistor = persistStore(store);
