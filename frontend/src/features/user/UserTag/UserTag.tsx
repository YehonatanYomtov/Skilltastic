//* react-hooks

//* react-router
// import { Link } from "react-router-dom";

//* redux-hooks
// import { useDispatch, useSelector } from "react-redux";

//* components-UI
// import ParallaxEffect from "../../../components/ui/ParallaxEffect/ParallaxEffect";

//* user-slice
// import { logout } from "../userSlice";

//* 3rd-party-loading-components
import { DNA } from "react-loader-spinner";

//* styles
import styles from "./UserTag.module.css";
import LogoutButton from "../../auth/LogoutButton/LogoutButton";

function UserTag() {
  // const status = useSelector((state) => state.user.status);
  // const email = useSelector((state) => state.user.user.email);
  // const photoURL = useSelector((state) => state.user.user.photoURL);
  const photoURL = null;
  // const dispatch = useDispatch();

  return (
    <>
      <div className={styles.main_container}>
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

      <LogoutButton />
    </>
  );
}

export default UserTag;
