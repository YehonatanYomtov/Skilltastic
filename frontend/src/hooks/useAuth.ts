//* react-hooks
import { useEffect } from "react";

//* redux
import { useDispatch } from "react-redux";

//* slice-auth
import { authIsReady } from "../features/auth/authSlice.ts";

//* firebase-imports
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.ts";

function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authIsReady(user));
      } else {
        dispatch(authIsReady(null));
      }
    });

    return () => unsub();
  }, [dispatch]);
}

export default useAuth;
