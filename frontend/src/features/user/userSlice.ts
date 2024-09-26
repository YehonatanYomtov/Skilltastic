//* Redux-hooks
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//* Axios
import axios from "axios";

//* Firebase-imports
import { auth, storage } from "../../firebase/firebaseConfig.ts";
import { updateProfile } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

//* Types
import { User } from "../../types/user.ts";
type UserState = {
  status: "idle" | "loading" | "success" | "rejected";
  user: User | null;
  isClicked: boolean;
  photoURL: string;
  error: string | null;
};

const initialState: UserState = {
  status: "idle",
  user: null,
  // user: auth.currentUser,
  isClicked: false,
  photoURL: "/images/User-dark.png",
  error: null,
};

//* Async thunks
export const updateProfileImage = createAsyncThunk<string, File>(
  "user/updateProfileImage",
  async function (selectedImage) {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not authenticated");

    const fileRef = ref(storage, `${currentUser.uid}.png`);
    await uploadBytes(fileRef, selectedImage);
    const photoURL = await getDownloadURL(fileRef);

    await updateProfile(currentUser, { photoURL });
    return photoURL;
  }
);

export const getUserFullInfo = createAsyncThunk<User, { email: string }>(
  "user/getUserFullInfo",
  async function (userAuth) {
    try {
      const response = await axios.post("/api/user/user", userAuth);
      return response.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message || "Failed to get user from db.");
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
        state.error = action.error.message ?? null;
      })
      .addCase(getUserFullInfo.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(getUserFullInfo.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(getUserFullInfo.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message ?? null;
      });
  },
});

// export const {} = userSlice.actions;

export default userSlice.reducer;
