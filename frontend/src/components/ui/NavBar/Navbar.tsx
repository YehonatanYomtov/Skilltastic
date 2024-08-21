//* react-hooks
import { useEffect, useState } from "react";

//* react-router
import { Link } from "react-router-dom";

//* UI-components
import Logo from "../Logo/Logo.tsx";
import NavBLink from "../NavBLink/NavBLink.tsx";
import DarkLightModeButton from "../DarkLightModeButton/DarkLightModeButton";

//* user-feature-components
import UserTag from "../../../features/user/UserTag/UserTag.tsx";

//* styles
import styles from "./NavBar.module.css";

function Navbar() {
  return (
    <nav className={styles.nav_main_container}>
      <ul>
        <li>
          <Link to="/">
            <Logo />
          </Link>
        </li>

        <li>
          <NavBLink>
            <i className="fa-solid fa-house-chimney"></i>
          </NavBLink>
        </li>

        <li>
          <NavBLink to="/profile">
            <i className="fa-solid fa-user"></i>
          </NavBLink>
        </li>

        <li>
          <NavBLink to="/courses">
            <i className="fa-solid fa-file-video"></i>
          </NavBLink>
        </li>

        {/* <li>
          <NavBLink to="/settings">
            <i className="fa-solid fa-gear"></i>
          </NavBLink>
        </li> */}
      </ul>

      <div>
        <DarkLightModeButton />

        <UserTag />
      </div>
    </nav>
  );
}

export default Navbar;
