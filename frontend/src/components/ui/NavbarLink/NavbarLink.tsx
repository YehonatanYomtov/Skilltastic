//* React-router
import { NavLink, NavLinkProps } from "react-router-dom";

//* Styles
import styles from "./NavbarLink.module.css";
import { ReactNode } from "react";

//* Types
type NavbarLinkProps = {
  to: string;
  subNavLink?: boolean;
  children: ReactNode;
} & Omit<NavLinkProps, "to">;

function NavbarLink({
  subNavLink = false,
  to,
  children,
  ...props
}: NavbarLinkProps) {
  return (
    <NavLink
      className={({ isActive }) =>
        `${styles.nav_link} ${subNavLink ? styles.subNavLink : ""} ${
          isActive ? styles.active : ""
        }`
      }
      to={to}
      end={subNavLink ? false : true}
      {...props}
    >
      {children}
    </NavLink>
  );
}

export default NavbarLink;
