//* react-router
import { Navigate } from "react-router-dom";

//* redux
import { useSelector } from "react-redux";

//* UI-components
// import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

//* Styles
// import styles from "./ProtectedRoute.module.css";

import { ReactNode } from "react";
import { RootState } from "../../../data/store";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useSelector((state: RootState) => state.auth.user);

  // If the user is not logged in, redirect to the login page
  if (!user) {
    return <Navigate replace to="/log-in" />;
  }

  // If the user is logged in, render the children components
  return <>{children}</>;
}

export default ProtectedRoute;
