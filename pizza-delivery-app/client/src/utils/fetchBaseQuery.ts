import {
  BaseQueryApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

import { removeUserState } from "../redux/state/userSlice";
import { IResponse } from "../interface/app.interface";

const mutex = new Mutex();
export const baseQueryWithAuth = async (
  argv: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
    credentials: "include",
  });
  await mutex.waitForUnlock();

  const response = await baseQuery(argv, api, extraOptions);

  if (response.error && response.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResponse = (await baseQuery(
          { url: "/auth/refresh-token", method: "GET" },
          api,
          extraOptions
        )) as { data?: IResponse; error?: FetchBaseQueryError };
        if (refreshResponse.data?.success) {
          console.log("fetchBaseWrapper function refresh cookie successfully");
        } else {
          console.log("fetchBaseWrapper function refresh cookie failed");
          api.dispatch(removeUserState());
        }
      } catch (error) {
        console.log(error);
      } finally {
        release();
      }
    } else {
      api.dispatch(removeUserState());
    }
  }
  return response;
};
