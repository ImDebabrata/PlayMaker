import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../baseUrl";
import { useSelector } from "react-redux";

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
      query: (token) => ({
        url: "/event",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    //Create new event
    addEvents: builder.mutation({
      query: ({ payload, token }) => ({
        url: "/event",
        method: "POST",
        body: payload,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    //Retrive Event by id
    eventsById: builder.query({
      query: ({ eventId, token }) => ({
        url: `/event/${eventId}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    //JoinEvent
    applyEvent: builder.mutation({
      query: ({ eventId, token }) => ({
        url: `/event/${eventId}/apply`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    //Accept Player
    acceptPlayer: builder.mutation({
      query: ({ eventId, userId, token }) => ({
        url: `/event/${eventId}/accept/${userId}`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    //Reject Player
    rejectPlayer: builder.mutation({
      query: ({ eventId, userId, token }) => ({
        url: `/event/${eventId}/reject/${userId}`,
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
    //Accept and pending Events based on user id
    applyEventLog: builder.query({
      query: ({ userId, token }) => ({
        url: `/event/user/${userId}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useEventsQuery,
  useAddEventsMutation,
  useEventsByIdQuery,
  useApplyEventMutation,
  useAcceptPlayerMutation,
  useRejectPlayerMutation,
  useApplyEventLogQuery,
} = apiSlice;
