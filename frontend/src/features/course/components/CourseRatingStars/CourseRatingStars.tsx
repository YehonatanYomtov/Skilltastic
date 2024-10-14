//* Styles
import styles from "./CourseRatingStars.module.css";

function CourseRatingStars() {
  return (
    <div className={styles.container}>
      <i className="fa-regular fa-star"></i>
      <i className="fa-regular fa-star"></i>
      <i className="fa-regular fa-star"></i>
      <i className="fa-regular fa-star"></i>
      <i className="fa-regular fa-star"></i>
    </div>
  );
}

export default CourseRatingStars;
