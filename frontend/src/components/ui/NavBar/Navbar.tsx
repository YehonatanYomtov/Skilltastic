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
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner.tsx";

//* User-feature-components
import UserTag from "../../../features/user/UserTag/UserTag.tsx";

//* Styles
import styles from "./Navbar.module.css";

//* Types
import { RootState } from "../../../data/store.ts";
import { StringObject } from "../../../../types/index.ts";

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

  const loadingSpinnerStyles: StringObject = {
    height: "100vh",
    width: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
            disabled={status === "idle"}
            onClick={toggleNavbar}
            className={styles.toggle_button}
          >
            {status === "idle" ? (
              <LoadingSpinner
                style={loadingSpinnerStyles}
                color="white"
                secondaryColor="white"
                height={10}
                width={10}
              />
            ) : (
              <i
                className={
                  isExtended
                    ? "fa-solid fa-arrow-left"
                    : "fa-solid fa-arrow-right"
                }
              ></i>
            )}
          </button>
        </>
      }

      <ul>
        <li>
          <NavLink to="/">
            <Logo />
          </NavLink>
        </li>

        {status === "idle" ? (
          <LoadingSpinner style={loadingSpinnerStyles} height={40} width={40} />
        ) : !user ? (
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
                  <Link to="/profile/change">Change Profile</Link>

                  <NavbarLink subNavLink={true} to="/profile/create-course">
                    <i className="fa-regular fa-square-plus">
                      <span>Create New Course</span>
                    </i>
                  </NavbarLink>

                  <Link to="/profile/settings">Settings</Link>
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
                  <Link to="/courses/wishlist">Wishlist</Link>

                  <Link to="/courses/favorites">Favorite Courses</Link>
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
        {status === "idle" ? (
          <LoadingSpinner
            style={{ ...loadingSpinnerStyles, paddingBottom: "5rem" }}
            height={30}
            width={30}
          />
        ) : (
          <UserTag />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
