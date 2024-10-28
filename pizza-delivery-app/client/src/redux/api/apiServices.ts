import { createApi } from "@reduxjs/toolkit/query/react";
import {
  IAuthResponse,
  IRecipeResponse,
  IResponse,
  ISignIn,
  ISignUp,
} from "../../interface/app.interface";
import { baseQueryWithAuth } from "../../utils/fetchBaseQuery";
import {
  IAllOrderResponse,
  IGetUserOrder,
} from "../../interface/order.Interface";

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
    getMe: builder.query<IAuthResponse, void>({
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
    getAllRecipe: builder.query<IRecipeResponse, void>({
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
    getUser: builder.query<IAuthResponse, void>({
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
    getUserOrder: builder.query<IGetUserOrder, void>({
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
    signOut: builder.mutation<IResponse, void>({
      query: () => ({
        url: "/auth/sign-out",
        method: "POST",
      }),
      transformResponse: (response: IResponse) => response,
      transformErrorResponse: (error: { status: number; data: IResponse }) =>
        error.data,
    }),
    verifyUser: builder.mutation({
      query: (verificationCode) => ({
        url: "auth/verify-user",
        method: "POST",
        body: verificationCode,
      }),
      transformResponse: (response: IResponse) => response,
      transformErrorResponse: (error: { status: number; data: IResponse }) =>
        error.data,
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: email,
      }),
      transformResponse: (response: IResponse) => response,
      transformErrorResponse: (error: { status: number; data: IResponse }) =>
        error.data,
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: IResponse) => response,
      transformErrorResponse: (error: { status: number; data: IResponse }) =>
        error.data,
    }),
    getPayPalClientId: builder.query({
      query: () => ({
        url: "/config/paypal",
        method: "GET",
      }),
    }),
    getAllOrders: builder.query<IAllOrderResponse, void>({
      query: () => ({
        url: "/order",
        method: "GET",
      }),
      transformResponse: (response: IAllOrderResponse) => response,
      transformErrorResponse: (error: {
        status: number;
        data: IAllOrderResponse;
      }) => error.data,
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetUserQuery,
  useGetAllRecipeQuery,
  useGetUserOrderQuery,
  useGetPayPalClientIdQuery,
  useGetAllOrdersQuery,
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useVerifyUserMutation,
  useResetPasswordMutation,
  useForgetPasswordMutation,
} = apiServices;
