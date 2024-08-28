import { ReactNode } from "react";

//* Styles
import styles from "./IntroDisplayItem.module.css";

function IntroDisplayItem({ style, children }: { children: ReactNode }) {
  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  );
}

export default IntroDisplayItem;
