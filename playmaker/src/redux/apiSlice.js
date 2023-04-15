import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../baseUrl";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl() }),
  //Register Endpoint
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (payload) => ({
        url: "/user/register",
        method: "POST",
        body: payload,
      }),
    }),
    //Login Endpoint
    login: builder.mutation({
      query: (payload) => ({
        url: "/user/login",
        method: "POST",
        body: payload,
      }),
    }),
    //Get all events
    events: builder.query({
      query: () => ({
        url: "/event",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useEventsQuery } =
  apiSlice;
