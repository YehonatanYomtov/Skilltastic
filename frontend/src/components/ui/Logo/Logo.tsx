//* styles
import styles from "./Logo.module.css";

function Logo() {
  return (
    <>
      <i className={`fa-solid fa-graduation-cap ${styles.logo}`}></i>
      {/* <img className={styles.logo} src="/images/Logo.png" alt="Logo" /> */}
      {/* <p className={styles.text}>SkillTastic</p> */}
    </>
  );
}

export default Logo;
