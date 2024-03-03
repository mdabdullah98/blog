import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  token: null,
  userMail: null,
  userId: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;
      state.token = action.payload.token;
      state.userMail = action.payload.email;
      state.userId = action.payload.uid;
    },
    logout: (state) => {
      state.status = false;
      state.token = null;
      state.userMail = null;
      state.userId = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
