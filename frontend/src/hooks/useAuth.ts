//* react-hooks
import { useEffect } from "react";

//* redux
import { useDispatch } from "react-redux";

//* slice-auth
import { authIsReady } from "../features/auth/authSlice.ts";

//* firebase-imports
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.ts";
import axios from "axios";
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
