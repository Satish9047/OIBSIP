import { createApi } from "@reduxjs/toolkit/query/react";
import {
  IAuthResponse,
  IRecipeResponse,
  ISignIn,
  ISignUp,
} from "../../interface/app.interface";
import { baseQueryWithAuth } from "../../utils/fetchBaseQuery";
import { IGetUserOrder } from "../../interface/order.Interface";

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
    getMe: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      transformResponse: (response: IAuthResponse) => response,
      transformErrorResponse: (error: {
        status: number;
        data: IAuthResponse;
      }) => error.data,
    }),
    getAllRecipe: builder.query({
      query: () => ({
        url: "/inventory/recipe",
        method: "GET",
      }),
      transformResponse: (response: IRecipeResponse) => response,
      transformErrorResponse: (error: {
        status: number;
        data: IRecipeResponse;
      }) => error.data,
    }),
    getUser: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      transformResponse: (response: IAuthResponse) => response,
      transformErrorResponse: (error: {
        status: number;
        data: IAuthResponse;
      }) => error.data,
    }),
    getUserOrder: builder.query({
      query: () => ({
        url: "/order/user",
        method: "GET",
      }),
      transformResponse: (response: IGetUserOrder) => response,
      transformErrorResponse: (error: {
        status: number;
        data: IGetUserOrder;
      }) => error.data,
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetMeQuery,
  useGetAllRecipeQuery,
  useGetUserQuery,
  useGetUserOrderQuery,
} = apiServices;
