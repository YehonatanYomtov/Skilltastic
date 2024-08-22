//* Styles
import { useParams } from "react-router-dom";
import styles from "./CourseVideo.module.css";

function CourseVideo() {
  const params = useParams();

  return (
    <div>
      <h1>Course Video {params.courseId}</h1>
    </div>
  );
}

export default CourseVideo;
