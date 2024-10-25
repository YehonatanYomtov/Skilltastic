import { configureStore } from "@reduxjs/toolkit";

//* Reducers
import authReducer from "../features/auth/authSlice.ts";
import courseReducer from "../features/course/courseSlice.ts";
import userReducer from "../features/user/userSlice.ts";
import tasksReducer from "../features/tasks/tasksSlice.ts";

const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
    user: userReducer,
    tasks: tasksReducer,
  },
});

//! should this be here or in the types folder
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
