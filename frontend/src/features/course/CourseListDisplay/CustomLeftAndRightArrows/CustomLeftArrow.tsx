//* Styles
import styles from "./CustomLeftAndRightArrows.module.css";

//* Types
import { ClickHandler } from "../../../../../types/index.ts";

function CustomLeftArrow({ onClick }: { onClick?: ClickHandler }) {
  return (
    <button
      className={`${styles.customArrow} ${styles.customArrowLeft}`}
      onClick={onClick}
    >
      <i className="fa-solid fa-angle-left"></i>
    </button>
  );
}

export default CustomLeftArrow;
