//* react-router
import { Navigate } from "react-router-dom";

//* redux
import { useSelector } from "react-redux";

//* UI-components
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

//* Styles
import { StringObject } from "../../../types";

//* Types
import { RootState } from "../../../data/store";
import { ReactNode } from "react";
type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useSelector((state: RootState) => state.auth.user);
  const status = useSelector((state: RootState) => state.auth.status);

  const loadingSpinnerStyles: StringObject = {
    height: "100vh",
    width: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  if (status === "loading")
    return <LoadingSpinner style={loadingSpinnerStyles} />;

  if (!user && status !== "initialRender")
    return <Navigate replace to="/log-in" />;

  return <>{children}</>;
}

export default ProtectedRoute;
