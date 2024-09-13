//* Axios;
import axios from "axios";

//* Redux-hooks
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//* Types
export type Price = {
  id: number;
  amount: number;
  currency: string;
  discount: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type Course = {
  id: number;
  title: string;
  description: string;
  teacher_id: number | null;
  price_id: number;
  // image_url: string;
};

export type CourseCreationPayload = {
  title: string;
  description: string;
  teacherId: number; // should be id of current user
  videoFile: File;
};

export type CourseData = {
  id: string;
  name: string;
  description: string;
  teacher: User;
  price: Price;
};

type CourseState = {
  courses: CourseData[];
  myCourses: CourseData[];
  searchCoursesResult: CourseData[];
  videoUrl: string;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
};

//* Initial state
const initialState: CourseState = {
  courses: [],
  myCourses: [],
  searchCoursesResult: [],
  videoUrl: "",
  status: "idle",
  error: null,
};

//* Async thunks
export const createCourse = createAsyncThunk<CourseData, FormData>(
  "course/createCourse",
  async function (courseData: FormData, thunkAPI) {
    try {
      const response = await axios.post("/api/courses/create", courseData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to create course";
        return thunkAPI.rejectWithValue(message);
      } else {
        return thunkAPI.rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

//! Make a template for all duplicate code in the async thunk
export const getAllCourses = createAsyncThunk(
  "course/getAllCourses",
  async function (_, thunkAPI) {
    try {
      const response = await axios.get("/api/courses");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch all courses";
        return thunkAPI.rejectWithValue(message);
      } else {
        return thunkAPI.rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const getAllUserCourses = createAsyncThunk(
  "course/getAllUserCourses",
  async function (uid, thunkAPI) {
    try {
      //! Check if sending user id is safe like this
      const response = await axios.get(`/api/courses/created/${uid}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch all current user courses";
        return thunkAPI.rejectWithValue(message);
      } else {
        return thunkAPI.rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

export const searchCourses = createAsyncThunk(
  "course/searchCourses",
  async function (searchQuery, thunkAPI) {
    try {
      const response = await axios.get(`/api/courses/search?q=${searchQuery}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to search courses";
        return thunkAPI.rejectWithValue(message);
      } else {
        return thunkAPI.rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

//* Slice
const courseSlice = createSlice({
  name: "course",
  initialState,

  reducers: {
    clearError(state) {
      state.error = null;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(createCourse.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
        state.status = "success";
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "error";
      })
      //* --------
      .addCase(getAllCourses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.status = "success";
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "error";
      })
      //* --------
      .addCase(getAllUserCourses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllUserCourses.fulfilled, (state, action) => {
        state.myCourses = action.payload;
        state.status = "success";
      })
      .addCase(getAllUserCourses.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "error";
      })
      //* --------
      .addCase(searchCourses.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(searchCourses.fulfilled, (state, action) => {
        state.searchCoursesResult = action.payload;
        state.status = "success";
      })
      .addCase(searchCourses.rejected, (state, action) => {
        state.error = action.payload as string;
        state.status = "error";
      });
  },
});

export const { clearError } = courseSlice.actions;
export default courseSlice.reducer;
