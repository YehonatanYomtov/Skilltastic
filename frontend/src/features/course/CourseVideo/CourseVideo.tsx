import { useParams } from "react-router-dom";

//* Styles
import styles from "./CourseVideo.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

function CourseVideo() {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const params = useParams();

  useEffect(() => {
    async function fetchVideoUrl() {
      const res = await axios.get(`/api/courses/course/${params.courseId}`);
      console.log("res: ", res);

      setVideoUrl(res.data.video_urls[0]);
    }

    fetchVideoUrl();
  }, [params.courseId]);

  return (
    <div className={styles.container}>
      <h1>Course {params.courseId}</h1>

      <video width={500} controls src={videoUrl}></video>

      <h2>(Course title)</h2>
    </div>
  );
}

export default CourseVideo;
