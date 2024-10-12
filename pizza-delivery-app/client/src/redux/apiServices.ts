import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAuthResponse, ISignIn, ISignUp } from "../interface/app.interface";

//Slice
export const apiServices = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/v1",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation<IAuthResponse, ISignUp>({
      query: (credentials) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: credentials,
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
      }),
      transformResponse: (response: IAuthResponse) => response,
      transformErrorResponse: (error: {
        status: number;
        data: IAuthResponse;
      }) => error.data,
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = apiServices;
