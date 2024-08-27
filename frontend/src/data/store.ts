import { configureStore } from "@reduxjs/toolkit";

//* Reducers
import authReducer from "../features/auth/authSlice.ts";
import courseReducer from "../features/course/courseSlice.ts";

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
