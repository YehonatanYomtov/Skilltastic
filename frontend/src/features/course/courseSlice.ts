//* Redux-hooks
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//* Axios
import axios from "axios";

//* Types
type Course = {
  id?: string;
  title: string;
  teacherName: string;
  description: string;
  price: number;
  currency: string;
  duration: string | number;
  category: string;
  ratingAverage: string | number;
  ratingCount: string | number;
};

type CourseData = {
  title: string;
  teacherName: string;
  description: string;
  price: number;
  currency: string;
  duration: string | number;
  category: string;
  ratingAverage: string | number;
  ratingCount: string | number;
};

type CourseState = {
  courses: Course[];
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
};

//* Initial state
const initialState: CourseState = {
  courses: [],
  status: "idle",
  error: null,
};

//* Async thunks
export const createCourse = createAsyncThunk<Course, CourseData>(
  "course/createCourse",
  async function (courseData: CourseData, thunkAPI) {
    try {
      const response = await axios.post("/api/courses/create", courseData, {
        // headers: {
        // "Content-Type": "multipart/form-data",
        // },
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
      });
  },
});

export const { clearError } = courseSlice.actions;
export default courseSlice.reducer;
