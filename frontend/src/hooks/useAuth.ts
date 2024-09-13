//* Axios
import axios from "axios";

//* React-hooks
import { useEffect } from "react";

//* Redux
import { useDispatch } from "react-redux";

//* Slice-auth
import { authIsReady } from "../features/auth/authSlice.ts";

//* Firebase-imports
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.ts";

//* Types
//! Check if the 'AppDispatch' and 'RootState' are actual types, and if so where should they be stored.
import { AppDispatch } from "../data/store.ts";
// import { setUser } from "../features/user/userSlice.ts";

function useAuth() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid, email } = user;

        const res = await axios.post("/api/user/user", { email });

        dispatch(authIsReady({ uid, ...res.data }));

        // dispatch(setUser(uid));
      } else {
        dispatch(authIsReady(null));
      }
    });

    return () => unsub();
  }, [dispatch]);
}

export default useAuth;
