//* Styles
import styles from "./CustomLeftAndRightArrows.module.css";

//* Types
import { ClickHandler } from "../../../../../types/index.ts";

function CustomRightArrow({ onClick }: { onClick?: ClickHandler }) {
  return (
    <button
      className={`${styles.customArrow} ${styles.customArrowRight}`}
      onClick={onClick}
    >
      <i className="fa-solid fa-angle-right"></i>
    </button>
  );
}

export default CustomRightArrow;
