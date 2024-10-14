//* React-router
import { Outlet } from "react-router-dom";

//* Components-UI
import ProfileSideNavbar from "../../../features/user/components/ProfileSideNavbar/ProfileSideNavbar";

//* Styles
import styles from "./ProfileLayout.module.css";

function ProfileLayout() {
  return (
    <div className={styles.container_main}>
      <ProfileSideNavbar />

      <div className={styles.outlet_container}>
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileLayout;
