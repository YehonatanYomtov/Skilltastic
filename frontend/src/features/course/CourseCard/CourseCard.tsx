import { memo } from "react";

//* Styles
import styles from "./CourseCard.module.css";

//* Types
import { CourseCard as CourseCardType } from "../../../types/index.ts";
type CourseCardProps = {
  course: CourseCardType | Course;
};

function CourseCard({ course }: CourseCardProps) {
  const { title, description, amount: price, currency, discount } = course;
  console.log("course: ", course);

  return (
    <div className={styles.card_main_container}>
      <div className={styles.card_img_container}>
        {/* <img src={imageUrl} alt={courseTitle} /> */}
        <img src="" alt="Course pic" />
      </div>

      <div className={styles.card_info_container}>
        <h3>{title}</h3>
        <p className={styles.name}>(Teacher name)</p>
        <p>{description}</p>

        <div className={styles.rating}>
          <strong>(ratingAverage)</strong>
          <div>(Rating stars)</div>
          <p>(ratingCount)</p>
        </div>

        <div className={styles.price}>
          <strong>{discount !== 0 ? (price * discount) / 100 : price}</strong>
          {discount > 0 && <span>{discount}%</span>}
        </div>

        {/* {tag && <div className={styles.tag}>{tag}</div>} */}
      </div>
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
