import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  token: null,
  userMail: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.token = action.payload.token;
      state.userMail = action.payload.email;
    },
    logout: (state) => {
      state.status = false;
      state.token = null;
      state.userMail = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
