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
// import ParallaxEffect from "../../../components/ui/ParallaxEffect/ParallaxEffect.tsx";
// import PopUp from "../../../components/ui/PopUp/PopUp.tsx";

//* Auth-slice
import { signup } from "../authSlice.ts";

//* Styles
import styles from "./SignUpForm.module.css";
import PopUp from "../../../components/ui/PopUp/PopUp.tsx";

//* Types
import { AppDispatch, RootState } from "../../../data/store.ts";

function SignUpForm() {
  const [alert, setAlert] = useState<string>("");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const status = useSelector((state: RootState) => state.auth.status);
  const error = useSelector((state: RootState) => state.auth.error);
  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const email: string = emailRef.current?.value || "";
    const password: string = passwordRef.current?.value || "";
    const confirmPassword: string = confirmPasswordRef.current?.value || "";

    if (email === "" || password === "" || confirmPassword === "") {
      return setAlert("One or more inputs are empty!");
    }

    if (password !== confirmPassword) {
      return setAlert("Password and ConfirmPassword do not match!");
    }

    //! Change to axios then make 2 sync function to both slices
    dispatch(signup({ email, password }));

    if (emailRef.current) emailRef.current.value = "";
    if (passwordRef.current) passwordRef.current.value = "";
    if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";

    return navigate("/");
  }

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    const email: string = emailRef.current?.value || "";
    const password: string = passwordRef.current?.value || "";
    const confirmPassword: string = confirmPasswordRef.current?.value || "";

    if (
      (email !== "" && password === "" && confirmPassword === "") ||
      (email === "" && password === "" && confirmPassword === "")
    ) {
      setAlert("");
    }
  }, [
    emailRef.current?.value,
    passwordRef.current?.value,
    confirmPasswordRef.current?.value,
  ]);

  return (
    <div className={styles.container_main}>
      {status === "error" && error && <ErrorMessage message={error} />}

      {status === "loading" && !error && !user && <LoadingSpinner />}

      {(status === "success" || status === "initialRender") && !error && (
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <h1>Sign Up</h1>

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

          <input
            ref={confirmPasswordRef}
            className={styles.input}
            type="password"
            placeholder="Confirm Password..."
          />

          {alert !== "" && <PopUp>{alert}</PopUp>}

          <div className={styles.no_account}>
            Already have an account?
            <Link className={styles.link} to="/log-in">
              {" "}
              Log in
            </Link>
          </div>
          <Button className={styles.sign_up_button}>Sign Up</Button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      )}
    </div>
  );
}

export default SignUpForm;
