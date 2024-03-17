import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from "./authSlice";

import databaseSliceReducer from "./databaseSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    db: databaseSliceReducer,
  },
});
export default store;
