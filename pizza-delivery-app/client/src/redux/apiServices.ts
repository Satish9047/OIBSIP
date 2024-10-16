import { createApi } from "@reduxjs/toolkit/query/react";
import { IAuthResponse, ISignIn, ISignUp } from "../interface/app.interface";
import { baseQueryWithAuth } from "../utils/fetchBaseQuery";

//Slice
export const apiServices = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    signUp: builder.mutation<IAuthResponse, ISignUp>({
      query: (credentials) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      transformResponse: (response: IAuthResponse) => response,
      transformErrorResponse: (error: {
        status: number;
        data: IAuthResponse;
      }) => error.data,
    }),
    signIn: builder.mutation<IAuthResponse, ISignIn>({
      query: (credentials) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      transformResponse: (response: IAuthResponse) => response,
      transformErrorResponse: (error: {
        status: number;
        data: IAuthResponse;
      }) => error.data,
    }),
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
        credentials: "include",
      }),
      transformResponse: (response: IAuthResponse) => response,
      transformErrorResponse: (error: {
        status: number;
        data: IAuthResponse;
      }) => error.data,
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useGetMeQuery } =
  apiServices;
