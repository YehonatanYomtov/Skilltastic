import styles from "./ShowCase.module.css";

function ShowCase({ children }) {
  return <div className={styles.container}>{children}</div>;
}

export default ShowCase;
