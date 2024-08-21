//* react-router
import { NavLink } from "react-router-dom";

//* styles
import styles from "./NavBLink.module.css";

function NavBLink({ to = "/", children }) {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link
      }
      to={to}
      end
    >
      {children}
    </NavLink>
  );
}

export default NavBLink;
