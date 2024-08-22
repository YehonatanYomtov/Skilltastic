import { configureStore } from "@reduxjs/toolkit";

//* Reducers
import authReducer from "../features/auth/authSlice.ts";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
