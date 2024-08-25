//* react-router
import { useLocation, useNavigate, useRouteError } from "react-router-dom";

//* redux
import { useDispatch } from "react-redux";

//* Components-UI
import Button from "../Button/Button.tsx";

//* Auth-slice
import { clearError } from "../../../features/auth/authSlice.ts";

//* Types
import { AppDispatch } from "../../../data/store.ts";

//* styles
import styles from "./ErrorMessage.module.css";

function ErrorMessage({ message = "Error" }) {
  const error = useRouteError();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();

  function handleError() {
    if (location.pathname === "/log-in") {
      navigate("/log-in");
    } else if (location.pathname === "/sign-up") {
      navigate("/sign-up");
    } else {
      navigate(-1);
    }
    dispatch(clearError());
  }

  return (
    <div className={styles.container}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>

      <i>{error?.statusText || error?.message || message}</i>

      <Button onClick={handleError} variant="blue-hollow">
        Ok
      </Button>
    </div>
  );
}

export default ErrorMessage;
