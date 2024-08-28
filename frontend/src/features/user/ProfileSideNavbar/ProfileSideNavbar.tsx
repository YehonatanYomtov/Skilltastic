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
        to="/user/settings"
      >
        <i className="fa-solid fa-briefcase"></i>
        <p>Owned courses</p>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `${styles.nav_link} ${isActive ? styles.active : ""}`
        }
        to="/courses/created"
      >
        <i className="fa-solid fa-person-chalkboard"></i>
        <p>My created courses</p>
      </NavLink>

      {/* 
      <NavLink
        className={({ isActive }) =>
          `${styles.nav_link} ${isActive ? styles.active : ""}`
        }
        to="/courses/wishlist"
      >
        <i className="fa-regular fa-heart"></i>
        <p>Wishlist</p>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `${styles.nav_link} ${isActive ? styles.active : ""}`
        }
        to="/courses/favorites"
      >
        <i className="fa-regular fa-star"></i>
        <p>Favorite Courses</p>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `${styles.nav_link} ${isActive ? styles.active : ""}`
        }
        to="/courses/create-course"
      >
        <i className="fa-regular fa-square-plus"></i>
        <p>Create New Course</p>
      </NavLink> */}
    </div>
  );
}

export default ProfileSideNavbar;
