import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//Slice
export const apiServices = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:000/api",
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: () => `auth/sign-up`,
    }),
    signIn: builder.mutation({
      query: () => `auth/sign-in`,
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = apiServices;
