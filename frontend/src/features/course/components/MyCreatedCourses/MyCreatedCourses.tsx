import { useSelector } from "react-redux";
import { RootState } from "../../../data/store";
import CourseCard from "../CourseCard/CourseCard";

//* Styles
import styles from "./MyCreatedCourses.module.css";

function MyCreatedCourses() {
  const myCourses = useSelector((state: RootState) => state.course.myCourses);
  console.log("myCourses: ", myCourses);

  return (
    <div className={styles.container}>
      <h1>My Created Courses</h1>

      <div className={styles.courses_display}>
        {myCourses.map((course) => (
          <CourseCard course={course} key={course.id} />
        ))}
      </div>
    </div>
  );
}

export default MyCreatedCourses;
