//* react-router
import { Outlet } from "react-router-dom";

//* components-UI
import Navbar from "../components/ui/Navbar/Navbar.tsx";
import BackButton from "../components/ui/BackButton/BackButton.tsx";
import Footer from "../components/ui/Footer/Footer.tsx";

//* styles
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <>
      <Navbar />

      <main className={styles.main}>
        <Outlet />
        <BackButton />
      </main>

      <Footer />
    </>
  );
}

export default AppLayout;
