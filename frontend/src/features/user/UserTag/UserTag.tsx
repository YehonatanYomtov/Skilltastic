//* react-hooks
import { useState } from "react";

//* react-router
// import { Link } from "react-router-dom";

//* redux-hooks
// import { useDispatch, useSelector } from "react-redux";

//* components-UI
// import ParallaxEffect from "../../../components/ui/ParallaxEffect/ParallaxEffect";

//* user-slice
// import { logout } from "../userSlice";

//* 3rd-party-loading-components
// import { Dna } from "react-loader-spinner";

//* styles
import styles from "./UserTag.module.css";
import { DNA } from "react-loader-spinner";

function UserTag() {
  const [isActive, setIsActive] = useState(false);

  // const status = useSelector((state) => state.user.status);
  // const email = useSelector((state) => state.user.user.email);
  // const photoURL = useSelector((state) => state.user.user.photoURL);
  const photoURL = null;
  // const dispatch = useDispatch();

  function handleLogout() {
    // dispatch(logout());
    setIsActive(false);
  }

  return (
    <>
      <div
        className={styles.main_container}
        onClick={() => setIsActive((cur) => !cur)}
      >
        <div className={styles.image_container}>
          {status === "loading" ? (
            <DNA height={22} width={22} />
          ) : photoURL ? (
            <img
              className={`${styles.image} ${styles.spin}`}
              src={photoURL || "/images/User-dark.png"}
              alt="User Pic"
            />
          ) : (
            <i className="fa-solid fa-user"></i>
          )}
        </div>

        <div className={styles.email_text_container}>
          {/* <p className={styles.email_text}>{email || "User"}</p> */}
        </div>
      </div>

      <button
        className={`${styles.dropdown_button} ${styles.dropdown_bottom_button}`}
        onClick={handleLogout}
      >
        Sign Out
      </button>
    </>
  );
}

export default UserTag;
