//* React-router
import { useLocation, useNavigate, useRouteError } from "react-router-dom";

//* Redux
import { useDispatch } from "react-redux";

//* Components-UI
import Button from "../Button/Button.tsx";

//* Auth-slice
import { clearError } from "../../../features/auth/authSlice.ts";

//* Types
import { AppDispatch } from "../../../data/store.ts";

//* Styles
import styles from "./ErrorMessage.module.css";

function ErrorMessage({ message = "Error" }) {
  const error = useRouteError() as unknown as Error;

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

      <i>{error?.message || message}</i>

      <Button onClick={handleError} variant="blue-hollow">
        Ok
      </Button>
    </div>
  );
}

export default ErrorMessage;
