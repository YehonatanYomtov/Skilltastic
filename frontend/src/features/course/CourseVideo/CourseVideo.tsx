//* React-hooks
import { useEffect, useState } from "react";

//* React-router-dom
import { useParams } from "react-router-dom";

//* Redux
import { useSelector } from "react-redux";

//* Axios
import axios from "axios";

//* Styles
import styles from "./CourseVideo.module.css";

//* Types
import { RootState } from "../../../data/store";
import { Course } from "../../../types/course";

function CourseVideo() {
  const [course, setCourse] = useState<Course | null>(null);

  const user = useSelector((state: RootState) => state.user.user);

  const params = useParams();

  useEffect(() => {
    async function fetchVideoUrl() {
      const res = await axios.get(`/api/courses/course/${params.courseId}`);

      // setVideoUrl(res.data.video_urls[0]);
      setCourse(res.data);
    }

    fetchVideoUrl();
  }, [params.courseId]);

  return (
    <div className={styles.container}>
      <h1 className={styles.course_header}>
        Course title: <span>{course?.title}</span>
      </h1>

      <video
        width={500}
        controls
        src={
          Array.isArray(course?.video_urls) && course?.video_urls[0]
            ? course.video_urls[0]
            : ""
        }
      ></video>

      <h2>
        Course description: <span>{course?.description}</span>
      </h2>
      <h3>
        Teacher : <span>{user?.name}</span>
      </h3>
      <h4>
        Email: <span>{user?.email}</span>
      </h4>
      <h4>
        ID: <span>{user?.id}</span>
      </h4>
    </div>
  );
}

export default CourseVideo;
