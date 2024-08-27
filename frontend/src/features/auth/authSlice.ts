//* Redux-hooks
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//* Firebase-imports
import { auth } from "../../firebase/firebaseConfig.ts";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

//* Utils
// import {
//   addCaseFullTemplate,
//   addCasePendingTemplate,
//   addCaseRejectedTemplate,
// } from "../../utils/addCaseTemplate.ts";

//* Types
type AuthUser = {
  uid: string;
  email: string | null;
};

type AuthState = {
  status: "idle" | "loading" | "success" | "error";
  user: AuthUser | null;
  error: string | null;
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
  "auth/login",
  async function ({ email, password }: EmailAndPassword) {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const { user } = userCredential;

    return {
      uid: user.uid,
      email: user.email,
    };
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password }: { email: string; password: string }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const { user } = userCredential;

    return {
      uid: user.uid,
      email: user.email,
    };
  }
);

export const logout = createAsyncThunk("auth/logout", async function () {
  await signOut(auth);
});

export const authIsReady = createAsyncThunk<AuthUser | null, AuthUser | null>(
  "auth/authIsReady",
  async function (user: AuthUser | null) {
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
        state.status = "error";
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
        console.log(action.error);
        state.error = action.error.message || "Signup failed";
        state.status = "error";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(authIsReady.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(authIsReady.fulfilled, (state, action) => {
        state.user = action.payload;
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
