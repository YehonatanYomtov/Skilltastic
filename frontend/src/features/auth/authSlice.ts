//* Redux-hooks
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//* Firebase-imports
import { auth } from "../../firebase/firebaseConfig.ts";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

//* Utils
// import {
//   addCaseFullTemplate,
//   addCasePendingTemplate,
//   addCaseRejectedTemplate,
// } from "../../utils/addCaseTemplate.ts";

//* Types
type AuthState = {
  status: string;
  user: User | null;
  error: string | null;
  // isClicked: boolean;
};

type EmailAndPassword = {
  email: string;
  password: string;
};

//* Initial state
const initialState: AuthState = {
  status: "idle",
  user: auth.currentUser,
  error: null,
  // userSignedIn: JSON.parse(localStorage.getItem("userSignedIn")) || false,
  // isClicked: false,
};

//* Async thunks

export const login = createAsyncThunk(
  "auth/signin",
  async function ({ email, password }: EmailAndPassword) {
    console.log(email, password);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential.user);
    return userCredential.user;
  }
);

export const signup = createAsyncThunk<User, EmailAndPassword>(
  "auth/signup",
  async function ({ email, password }: EmailAndPassword) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const newUser = userCredential.user;

    return newUser;
  }
);

export const logout = createAsyncThunk("auth/logout", async function () {
  await signOut(auth);
});

export const authIsReady = createAsyncThunk(
  "auth/authIsReady",
  async function (user) {
    return user;
  }
);

//* Slice
const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearError(state) {
      state.error = null;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "success";
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message || "Login failed";
        state.status = "idle";
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "success";
      })
      .addCase(signup.rejected, (state, action) => {
        state.error = action.error.message || "Signup failed";
        state.status = "idle";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
    // addCaseFullTemplate(builder, signup, {
    //   user: "payload",
    //   userSignedIn: true,
    // });
    // //* ====
    // addCasePendingTemplate(builder, signin);
    // builder.addCase(signin.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   state.user = action.payload.user;
    //   state.userSignedIn = true;
    // });
    // addCaseRejectedTemplate(builder, signin);
    // //* ====
    // addCaseFullTemplate(builder, logout, { user: null, userSignedIn: false });
    // //* =====
    // addCaseFullTemplate(builder, authIsReady, { user: "payload" });
    // //* =====
    // addCaseFullTemplate(builder, updateProfileImage, { photoURL: "payload" });
  },
});

// export const { setIsClicked } = authSlice.actions;
export const { clearError } = authSlice.actions;
export default authSlice.reducer;
