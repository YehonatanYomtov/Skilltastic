//* React-hooks
import { useState } from "react";

//* React-router
import { Link, NavLink } from "react-router-dom";

//* Redux
import { useSelector } from "react-redux";

//* UI-components
import Logo from "../Logo/Logo.tsx";
import DarkLightModeButton from "../DarkLightModeButton/DarkLightModeButton.tsx";
import NavbarLink from "../NavbarLink/NavbarLink.tsx";

//* User-feature-components
import UserTag from "../../../features/user/UserTag/UserTag.tsx";

//* Styles
import styles from "./Navbar.module.css";

//* Types
import { RootState } from "../../../data/store.ts";

function Navbar() {
  const [isExtended, setIsExtended] = useState(false);
  const [visibleSubMenu, setVisibleSubMenu] = useState<string | null>(null);

  const user = useSelector<RootState>((state) => state.auth.user);
  const status = useSelector<RootState>((state) => state.auth.status);

  const toggleNavbar = () => {
    setIsExtended((prev) => !prev);
  };

  const showSubMenu = (menu: string) => {
    setVisibleSubMenu(menu);
  };

  const hideSubMenu = () => {
    setVisibleSubMenu(null);
  };

  return (
    <nav
      className={`${styles.nav_main_container} ${
        isExtended ? styles.extended : ""
      }`}
    >
      {
        <>
          <button
            disabled={status === "loading"}
            onClick={toggleNavbar}
            className={styles.toggle_button}
          >
            <i
              className={
                isExtended
                  ? "fa-solid fa-arrow-left"
                  : "fa-solid fa-arrow-right"
              }
            ></i>
          </button>
        </>
      }

      <ul>
        <li>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </li>

        {!user && status !== "initialRender" ? (
          <>
            <li>
              <NavbarLink to="/log-in">
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
              </NavbarLink>
            </li>

            <li>
              <NavbarLink to="/sign-up">
                <i className="fa-regular fa-pen-to-square"></i>
              </NavbarLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavbarLink to="/">
                <i className="fa-solid fa-house-chimney"></i>
              </NavbarLink>
            </li>

            <li
              onMouseEnter={() => showSubMenu("profile")}
              onMouseLeave={hideSubMenu}
            >
              <NavbarLink to="/profile">
                <i className="fa-solid fa-user"></i>
                {isExtended && <span>Profile</span>}
              </NavbarLink>
              {visibleSubMenu === "profile" && (
                <div
                  className={`${styles.submenu} ${
                    visibleSubMenu !== "profile" ? styles.hidden : ""
                  }`}
                >
                  <Link to="/profile/overview">Overview</Link>

                  <Link to="/profile/edit">Edit Profile</Link>

                  <Link to="/profile/settings">Account Settings</Link>

                  <Link to="/profile/support">Support & Help</Link>
                </div>
              )}
            </li>

            <li
              onMouseEnter={() => showSubMenu("courses")}
              onMouseLeave={hideSubMenu}
            >
              <NavbarLink to="/courses">
                <i className="fa-solid fa-file-video"></i>
                {isExtended && <span>Courses</span>}
              </NavbarLink>
              {visibleSubMenu === "courses" && (
                <div
                  className={`${styles.submenu} ${
                    visibleSubMenu !== "courses" ? styles.hidden : ""
                  }`}
                >
                  <Link to="/courses/owned">Owned courses</Link>

                  <Link to="/courses/created">My created courses</Link>

                  <Link to="/courses/wishlist">Wishlist</Link>

                  <Link to="/courses/favorites">Favorite Courses</Link>

                  <Link to="/courses/certificates">Certificates</Link>

                  <Link to="/courses/create-course">Create New Course</Link>
                </div>
              )}
            </li>

            <li>
              <NavbarLink to="/contact">
                <i className="fa-solid fa-envelope"></i>
                {isExtended && <span>Contact</span>}
              </NavbarLink>
            </li>
          </>
        )}
      </ul>

      <div className={styles.bottom_section}>
        <DarkLightModeButton />

        <UserTag />
      </div>
    </nav>
  );
}

export default Navbar;
