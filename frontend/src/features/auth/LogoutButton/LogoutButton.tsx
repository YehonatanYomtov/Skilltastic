//* Redux-hooks
import { useDispatch } from "react-redux";

//* Slice-auth
import { logout } from "../authSlice";

//* Types
import { AppDispatch } from "../../../data/store";

//* Styles
import styles from "./LogoutButton.module.css";

function LogoutButton() {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <button className={styles.logout_btn} onClick={() => dispatch(logout())}>
      Log out
    </button>
  );
}

export default LogoutButton;
