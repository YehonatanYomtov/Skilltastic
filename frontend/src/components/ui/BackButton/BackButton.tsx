//* React-router-dom
import { useLocation, useNavigate } from "react-router-dom";

//* Styles
import styles from "./BackButton.module.css";

const mainRoutes: string[] = ["/", "/profile", "/courses", "/contact"];

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  function navigateBack(routes: string[]) {
    routes.map((route) => {
      if (location.pathname === route) {
        navigate("/");
      } else {
        navigate(-1);
      }
    });
  }

  return location.pathname !== "/" &&
    location.pathname !== "/log-in" &&
    location.pathname !== "/sign-up" ? (
    <button
      style={
        location.pathname === "/user"
          ? {
              color: "var(--clr--main-white)",
              borderBottom: "2px solid var(--clr--main-white)",
            }
          : {}
      }
      className={styles.back_button}
      onClick={() => navigateBack(mainRoutes)}
    >
      &larr; Back
    </button>
  ) : null;
}

export default BackButton;
