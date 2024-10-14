//* React-hooks
import { memo } from "react";

//* React-router-dom
import { Link } from "react-router-dom";

//* Components-course
import CourseRatingStars from "../CourseRatingStars/CourseRatingStars.tsx";

//* Styles
import styles from "./CourseCard.module.css";

//* Types
import { CourseCard as CourseCardType } from "../../../../types/course.ts";
// import { Course, CourseData } from "../courseSlice.ts";
type CourseCardProps = {
  course: CourseCardType;
};

function CourseCard({ course }: CourseCardProps) {
  const { id, description, name: title, price, teacher, imageUrl } = course;

  const { amount, currency, discount } = price;

  const { name: teacherName } = teacher;

  return (
    <div className={styles.card_main_container}>
      <Link to={`/courses/${id}`}>
        <div className={styles.card_img_container}>
          <img
            src={imageUrl || "/images/course-bg-default.png"}
            alt="Course img"
          />
        </div>

        <div className={styles.card_info_container}>
          <h3>{title}</h3>
          <p className={styles.name}>{teacherName}</p>
          <p className={styles.description}>{description}</p>

          <div className={styles.rating}>
            <strong>0.0</strong>

            <CourseRatingStars />

            <p>(0)</p>
          </div>

          <div className={styles.price}>
            <strong>
              {discount !== "0.00" ? (+amount * +discount) / 100 : amount}{" "}
              {currency}
            </strong>
            {discount !== "0.00" && <span>{discount}%</span>}
          </div>

          {/* {tag && <div className={styles.tag}>{tag}</div>} */}
        </div>
      </Link>
    </div>
  );

  // const {
  //   courseTitle,
  //   teacherName,
  //   ratingAverage,
  //   ratingCount,
  //   price,
  //   discountPrice,
  //   tag,
  //   imageUrl,
  // } = course;

  // return (
  //   <div className={styles.card_main_container}>
  //     <div className={styles.card_img_container}>
  //       <img src={imageUrl} alt={courseTitle} />
  //     </div>

  //     <div className={styles.card_info_container}>
  //       <h3>{courseTitle}</h3>
  //       <p className={styles.name}>{teacherName}</p>
  //       {/* <p>{courseDescription}</p> */}

  //       <div className={styles.rating}>
  //         <strong>{ratingAverage}</strong>
  //         <div>(Rating stars)</div>
  //         <p>({ratingCount})</p>
  //       </div>

  //       <div className={styles.price}>
  //         <strong>{price}</strong>
  //         {discountPrice && <span>{discountPrice}</span>}
  //       </div>

  //       {tag && <div className={styles.tag}>{tag}</div>}
  //     </div>
  //   </div>
  // );
}

export default memo(CourseCard);
