//* react-router
import { Outlet } from "react-router-dom";

//* Components-UI
import Navbar from "../components/ui/Navbar/Navbar";
import BackButton from "../components/ui/BackButton/BackButton";
import Footer from "../components/ui/Footer/Footer";

//* Styles
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
