//* Redux-hooks
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//* Firebase-imports
import { auth, storage } from "../../firebase/firebaseConfig.ts";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import axios from "axios";

const initialState = {
  status: "idle",
  // user: auth.currentUser,
  user: null,
  isClicked: false,
  photoURL: "/images/User-dark.png",
  error: null,
};

//* Async thunks
export const updateProfileImage = createAsyncThunk(
  "user/updateProfileImage",
  async function (selectedImage) {
    const currentUser = auth.currentUser;
    const fileRef = ref(storage, `${currentUser.uid}.png`);

    await uploadBytes(fileRef, selectedImage);

    const photoURL = await getDownloadURL(fileRef);

    await updateProfile(currentUser, { photoURL });

    return photoURL;
  }
);

export const getUserFullInfo = createAsyncThunk(
  "user/getUserFullInfo",
  async function (userAuth) {
    try {
      const response = await axios.post("/api/user/user", userAuth);
      return response.data;
    } catch (err) {
      const error = err as Error;
      const message = error.message || "Failed to get user from db.";
      return message;
    }
  }
);

// export const setUser = createAsyncThunk(
//   "user/setUser",
//   async function (selectedImage) {
//     const currentUser = auth.currentUser;
//     const fileRef = ref(storage, `${currentUser.uid}.png`);

//     await uploadBytes(fileRef, selectedImage);

//     const photoURL = await getDownloadURL(fileRef);

//     await updateProfile(currentUser, { photoURL });

//     return photoURL;
//   }
// );

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    // setIsClicked(state) {
    //   state.isClicked = !state.isClicked;
    // },
  },

  extraReducers(builder) {
    builder
      .addCase(updateProfileImage.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.status = "success";
        state.photoURL = action.payload;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      })
      .addCase(getUserFullInfo.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(getUserFullInfo.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
        console.log("action.payload: ", action.payload);
      })
      .addCase(getUserFullInfo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
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

// export const {} = userSlice.actions;

export default userSlice.reducer;

// export const signup = createAsyncThunk(
//   "user/signup",
//   async function ({ email, password }) {
//     const res = await createUserWithEmailAndPassword(auth, email, password);
//     const newUser = res.user;

//     return newUser;
//   }
// );

// export const signin = createAsyncThunk(
//   "user/signin",
//   async function ({ email, password }) {
//     const res = await signInWithEmailAndPassword(auth, email, password);
//     return res;
//   }
// );

// export const logout = createAsyncThunk("user/logout", async function () {
//   await signOut(auth);
// });

// export const authIsReady = createAsyncThunk(
//   "user/authIsReady",
//   async function (user) {
//     return user;
//   }
// );
