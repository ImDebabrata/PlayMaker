import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { apiSlice } from "./apiSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      auth: authSlice,
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
}
export const store = makeStore();
