//* React-hooks
import { useEffect, useRef, useState } from "react";

//* React-router
import { Link, useNavigate } from "react-router-dom";

//* Redux-hooks
import { useDispatch, useSelector } from "react-redux";

//* Components-UI
import Button from "../../../components/ui/Button/Button.tsx";
import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner.tsx";
import ErrorMessage from "../../../components/ui/ErrorMessage/ErrorMessage.tsx";
import PopUp from "../../../components/ui/PopUp/PopUp.tsx";

//* Auth-slice
import { login } from "../authSlice.ts";

//* Types
import { AppDispatch, RootState } from "../../../data/store.ts";

//* Styles
import styles from "./LogInForm.module.css";

function LogInForm() {
  const [alert, setAlert] = useState<string>("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const status = useSelector((state: RootState) => state.auth.status);
  const error = useSelector((state: RootState) => state.auth.error);
  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const email: string = emailRef.current?.value || "";
    const password: string = passwordRef.current?.value || "";

    if (email === "" || password === "") {
      return setAlert("One or more inputs are empty!");
    }

    dispatch(login({ email, password }));
    navigate("/");
  }

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <div className={styles.container_main}>
      {status === "error" && error && <ErrorMessage message={error} />}

      {status === "loading" && !error && !user && <LoadingSpinner />}

      {(status === "success" || status === "initialRender") && !error && (
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <div className={styles.blur}></div>
          <h1>Log In</h1>

          <input
            ref={emailRef}
            className={styles.input}
            type="email"
            placeholder="Email..."
          />

          <input
            ref={passwordRef}
            className={styles.input}
            type="password"
            placeholder="Password..."
          />

          {alert !== "" && <PopUp>{alert}</PopUp>}

          <div className={styles.no_account}>
            Don`t have an account?
            <Link className={styles.link} to="/sign-up">
              {" "}
              Create one
            </Link>
          </div>

          <Button className={styles.log_in_button}>Log In</Button>

          {error && <p className={styles.error}>{error}</p>}
        </form>
      )}
    </div>
  );
}

export default LogInForm;
