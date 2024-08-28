//* React-router
import { Outlet } from "react-router-dom";

//* Components-ui
import SideNavbar from "../../components/ui/SideNavbar/SideNavbar";

//* Styles
import styles from "./SubLayout.module.css";

function SubLayout() {
  return (
    <div className={styles.container_main}>
      <SideNavbar />

      <div className={styles.outlet_container}>
        <Outlet />
      </div>
    </div>
  );
}

export default SubLayout;
