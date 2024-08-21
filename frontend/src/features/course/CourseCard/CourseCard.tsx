// Styles
import styles from "./CourseCard.module.css";

function CourseCard() {
  return (
    <div className={styles.card_main_container}>
      <div className={styles.card_img_container}>
        <img src="" alt="" />
      </div>

      <div className={styles.card_info_container}>
        <h3>(Course title)</h3>
        <p>(Teacher name)</p>
        <p>(Course description)</p>

        <div className={styles.rating}>
          <strong>(Rating average)</strong>
          <div>(Rating stars)</div>
          <p>( (Rating amount) )</p>
        </div>

        <div className={styles.price}>
          <p>(Price)</p>
          <span>(Discount price)</span>
        </div>

        <div className={styles.tag}>Discount</div>
      </div>
    </div>
  );
}

export default CourseCard;
