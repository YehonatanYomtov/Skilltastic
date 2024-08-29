//* React-router
import { NavLink } from "react-router-dom";

//* Components-ui
// import NavbarLink from "../NavbarLink/NavbarLink";

//* Styles
import styles from "./ProfileSideNavbar.module.css";

function ProfileSideNavbar() {
  return (
    <div className={styles.container}>
      <h3>Profile Management</h3>

      <NavLink
        className={({ isActive }) =>
          `${styles.nav_link} ${isActive ? styles.active : ""}`
        }
        to="/profile/overview"
      >
        <i className="fa-solid fa-magnifying-glass"></i>
        <p>Overview</p>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `${styles.nav_link} ${isActive ? styles.active : ""}`
        }
        to="/profile/edit"
      >
        <i className="fa-solid fa-pencil"></i>
        <p>Edit Profile</p>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `${styles.nav_link} ${isActive ? styles.active : ""}`
        }
        to="/profile/settings"
      >
        <i className="fa-solid fa-gear"></i>
        <p>Account Settings</p>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `${styles.nav_link} ${isActive ? styles.active : ""}`
        }
        to="/profile/support"
      >
        <i className="fa-solid fa-headset"></i>
        <p>Support & Help</p>
      </NavLink>
    </div>
  );
}

export default ProfileSideNavbar;
