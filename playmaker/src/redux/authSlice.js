import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logOutUser(state, action) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { loginSuccess, logOutUser } = authSlice.actions;

export default authSlice.reducer;
