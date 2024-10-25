//* Redux-hooks
import { createSlice } from "@reduxjs/toolkit";

//* Types
type Task = {
  taskText: string;
  completed: boolean;
};

type TasksState = {
  status: "idle" | "loading" | "success" | "rejected";
  tasks: Task[];
  error: string | null;
};

const initialState: TasksState = {
  status: "idle",
  tasks: [],
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,

  reducers: {},
});

// export const {} = tasksSlice.actions;

export default tasksSlice.reducer;
