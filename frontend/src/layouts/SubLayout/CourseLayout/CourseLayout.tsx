//* React-router
import { Outlet } from "react-router-dom";

//* Components-ui
import CoursesSideNavbar from "../../../features/course/CoursesSideNavbar/CoursesSideNavbar";

//* Styles
import styles from "./CourseLayout.module.css";

function CourseLayout() {
  return (
    <div className={styles.container_main}>
      <CoursesSideNavbar />

      <div className={styles.outlet_container}>
        <Outlet />
      </div>
    </div>
  );
}

export default CourseLayout;
