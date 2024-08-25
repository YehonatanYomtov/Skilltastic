import { ReactElement } from "react";
import styles from "./ShowCase.module.css";

type ShowCaseProps = {
  children: ReactElement[];
};

function ShowCase({ children }: ShowCaseProps) {
  return <div className={styles.container}>{children}</div>;
}

export default ShowCase;
