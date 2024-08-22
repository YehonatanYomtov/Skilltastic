//* react-hooks
// import { useEffect, useState } from "react";

//* react-router
import { Link, useLocation } from "react-router-dom";

//* UI-components
import Logo from "../Logo/Logo.tsx";
import DarkLightModeButton from "../DarkLightModeButton/DarkLightModeButton.tsx";
import NavbarLink from "../NavbarLink/NavbarLink.tsx";

//* user-feature-components
import UserTag from "../../../features/user/UserTag/UserTag.tsx";

//* styles
import styles from "./Navbar.module.css";

function Navbar() {
  const location = useLocation();

  console.log(location.pathname);

  return (
    <nav className={styles.nav_main_container}>
      <ul>
        <li>
          <Link to="/">
            <Logo />
          </Link>
        </li>

        {location.pathname === "/log-in" || location.pathname === "/sign-up" ? (
          <>
            <li>
              <NavbarLink>
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
              </NavbarLink>
            </li>

            <li>
              <NavbarLink>
                <i className="fa-regular fa-pen-to-square"></i>
              </NavbarLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavbarLink>
                <i className="fa-solid fa-house-chimney"></i>
              </NavbarLink>
            </li>

            <li>
              <NavbarLink to="/profile">
                <i className="fa-solid fa-user"></i>
              </NavbarLink>
            </li>

            <li>
              <NavbarLink to="/courses">
                <i className="fa-solid fa-file-video"></i>
              </NavbarLink>
            </li>

            <li>
              <NavbarLink to="/contact">
                <i className="fa-solid fa-envelope"></i>
              </NavbarLink>
            </li>
          </>
        )}
      </ul>
      <div>
        <DarkLightModeButton />

        <UserTag />
      </div>
    </nav>
  );
}

export default Navbar;
