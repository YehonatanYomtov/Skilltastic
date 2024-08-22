//* react-router
import { NavLink } from "react-router-dom";

//* styles
import styles from "./NavbarLink.module.css";
import { ReactElement, ReactNode } from "react";

//* types
type NavbarLinkProps = {
  to: string;
  children: ReactNode;
};

function NavbarLink({ to = "/", children }: NavbarLinkProps) {
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

export default NavbarLink;
