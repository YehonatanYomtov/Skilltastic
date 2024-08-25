//* Styles
import styles from "./CustomLeftAndRightArrows.module.css";

function CustomRightArrow({ onClick }) {
  return (
    <div
      className={`${styles.customArrow} ${styles.customArrowRight}`}
      onClick={onClick}
    >
      <i className="fa-solid fa-angle-right"></i>
    </div>
  );
}

export default CustomRightArrow;
