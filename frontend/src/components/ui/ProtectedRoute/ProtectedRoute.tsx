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
  // const user = useSelector((state) => state.user.user);
  // const userSignedIn = useSelector((state) => state.user.userSignedIn);
  const user = useSelector((state: RootState) => state.auth.user);

  // if (userSignedIn) {
  if (user) return children;

  // return (
  //   <div className={styles.spinnerBgStyling}>
  //     <LoadingSpinner />
  //   </div>
  // );
  // }

  return <Navigate replace to="/log-in" />;
}

export default ProtectedRoute;
