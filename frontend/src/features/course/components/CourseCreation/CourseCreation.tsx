import { ChangeEvent, useState } from "react";
import styles from "./CourseCreation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../data/store.ts";
import { usernameFromEmailExtractor } from "../../../../utils/usernameFromEmailExtractor.ts";
import Input from "../../../../components/ui/Input/Input.tsx";
import Select from "../../../../components/ui/Select/Select.tsx";
import Button from "../../../../components/ui/Button/Button.tsx";
import LoadingSpinner from "../../../../components/ui/LoadingSpinner/LoadingSpinner.tsx";
import ErrorMessage from "../../../../components/ui/ErrorMessage/ErrorMessage.tsx";
import { createCourse } from "../../courseSlice.ts";

function CourseCreation() {
  const initialCourseData = {
    title: "",
    description: "",
    price: 0,
    currency: "USD",
    videoFile: null,
  };

  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    videoFile: null as File | null,
    price: 0,
    currency: "USD",
  });

  const user = useSelector((state: RootState) => state.auth.user);
  const status = useSelector((state: RootState) => state.course.status);
  const error = useSelector((state: RootState) => state.course.error);

  const dispatch = useDispatch<AppDispatch>();

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setCourseData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setCourseData((prevState) => ({
        ...prevState,
        videoFile: file,
      }));
      setVideoPreview(URL.createObjectURL(file));

      const videoElement = document.createElement("video");
      videoElement.src = URL.createObjectURL(file);
      videoElement.onloadedmetadata = () => {
        setCourseData((prevState) => ({
          ...prevState,
          duration: videoElement.duration,
        }));
      };
    } else {
      alert("Please select a valid video file");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { title, description, videoFile } = courseData;
    console.log(user);
    if (user?.id === undefined) return;

    if (!videoFile) {
      return alert("Please upload a video file");
    }

    try {
      const formData = new FormData();
      formData.append("teacherId", user.id + "");
      formData.append("title", title);
      formData.append("description", description);
      formData.append("videoFile", videoFile);

      dispatch(createCourse(formData));

      setCourseData(initialCourseData);
      setVideoPreview(null);
    } catch (err) {
      console.error("Error during course creation:", err);
    }
  }

  return (
    <div className={styles.container}>
      {!!error && <ErrorMessage message={error} />}

      {status === "loading" && <LoadingSpinner />}

      {status !== "loading" && !error && (
        <form onSubmit={handleSubmit}>
          <h1>Course Creation</h1>

          <div className={styles.inputs_container}>
            <h3>
              Course teacher: {usernameFromEmailExtractor(user?.email || "")}
            </h3>
            <div>
              <label>Course title: </label>
              <Input
                name="title"
                type="text"
                value={courseData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Course description: </label>
              <textarea
                name="description"
                value={courseData.description}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label>Course price: </label>
              <Input
                className={styles.price_input}
                name="price"
                type="number"
                value={courseData.price}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label>Currency:</label>
              <Select
                name="currency"
                value={courseData.currency}
                onChange={handleInputChange}
                options={[
                  { value: "USD", label: "USD" },
                  { value: "ILS", label: "ILS" },
                  { value: "EURO", label: "EURO" },
                ]}
              />
            </div>

            <hr />

            <h3>Upload a Video</h3>

            <label className={styles.file_input}>
              Choose a file
              <input
                className={styles.video_input}
                type="file"
                accept="video/*"
                name="videoFile"
                onChange={handleFileChange}
              />
            </label>
            {videoPreview && (
              <>
                <h3>Preview:</h3>
                <video
                  className={styles.video}
                  src={videoPreview}
                  controls
                  width="500"
                />
              </>
            )}
            <Button className={styles.submit_btn} type="submit">
              Upload course
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CourseCreation;
