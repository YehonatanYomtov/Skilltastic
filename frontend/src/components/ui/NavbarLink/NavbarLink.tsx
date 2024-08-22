//* react-router
import { NavLink, NavLinkProps } from "react-router-dom";

//* styles
import styles from "./NavbarLink.module.css";
import { ReactNode } from "react";

//* types
type NavbarLinkProps = {
  to: string;
  children: ReactNode;
} & Omit<NavLinkProps, "to">; // Use Omit to exclude the 'to' prop from NavLinkProps since it's already defined

function NavbarLink({ to = "/", children, ...props }: NavbarLinkProps) {
  return (
    <NavLink
      className={({ isActive }: { isActive: boolean }) =>
        isActive ? `${styles.nav_link} ${styles.active}` : styles.nav_link
      }
      to={to}
      end
      {...props} // Spread other NavLinkProps here
    >
      {children}
    </NavLink>
  );
}

export default NavbarLink;
