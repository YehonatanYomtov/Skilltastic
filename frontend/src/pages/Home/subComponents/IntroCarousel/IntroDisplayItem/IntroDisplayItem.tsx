import { ReactNode, CSSProperties } from "react";

//* Styles
import styles from "./IntroDisplayItem.module.css";

//* Types
type IntroDisplayItemProps = {
  style?: CSSProperties;
  children: ReactNode;
};

function IntroDisplayItem({ style, children }: IntroDisplayItemProps) {
  return (
    <div className={styles.container} style={style}>
      {children}
    </div>
  );
}

export default IntroDisplayItem;
