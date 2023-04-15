import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

const authSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload;
    },
  },
});

export const { loginSuccess } = authSlice.actions;

export default authSlice.reducer;
