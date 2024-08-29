import { configureStore } from "@reduxjs/toolkit";

//* Reducers
import authReducer from "../features/auth/authSlice.ts";
import courseReducer from "../features/course/courseSlice.ts";
import userReducer from "../features/user/userSlice.ts";

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
