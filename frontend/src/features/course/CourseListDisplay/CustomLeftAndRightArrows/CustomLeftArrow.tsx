//* Styles
import styles from "./CustomLeftAndRightArrows.module.css";

//* Types
import { ClickHandler } from "../../../../../../types";

function CustomLeftArrow({ onClick }: { onClick: ClickHandler }) {
  return (
    <div
      className={`${styles.customArrow} ${styles.customArrowLeft}`}
      onClick={onClick}
    >
      <i className="fa-solid fa-angle-left"></i>
    </div>
  );
}

export default CustomLeftArrow;
