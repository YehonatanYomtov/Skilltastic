import { useParams } from "react-router-dom";

//* Styles
import styles from "./CourseVideo.module.css";

function CourseVideo() {
  const params = useParams();

  return (
    <div className={styles.container}>
      <h1>Course Video {params.courseId}</h1>
    </div>
  );
}

export default CourseVideo;
