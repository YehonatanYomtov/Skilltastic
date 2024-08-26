import { ChangeEvent, useState } from "react";

//* Styles
import styles from "./CourseCreation.module.css";

import { useSelector } from "react-redux";
import { RootState } from "../../../data/store";
import { usernameFromEmailExtractor } from "../../../utils/usernameFromEmailExtractor";
import Input from "../../../components/ui/Input/Input";
import Select from "../../../components/ui/Select/Select";
import { AuthUser } from "../../../../types";

//? To utils folder
const formatDuration = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = (duration % 60).toString().slice(0, 2);
  return `${minutes}:${seconds}`;
};

function CourseCreation() {
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    videoFile: null as File | null,
    duration: 0,
    category: "",
    price: "",
    currency: "USD",
  });

  const user = useSelector<RootState, AuthUser>((state) => state.auth.user);

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;

    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      setCourseData((prevState) => ({
        ...prevState,
        [name]: fileInput.files?.[0] || null,
      }));
    } else {
      setCourseData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
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

  const handleUpload = async () => {
    const {
      title,
      description,
      videoFile,
      duration,
      category,
      price,
      currency,
    } = courseData;

    if (!videoFile) return;

    const newCourse = {
      title,
      teacherName: usernameFromEmailExtractor(user?.email || ""),
      description,
      price,
      currency,
      duration,
      category,
    };

    console.log(newCourse);

    // const courseData = new courseData();
    // courseData.append('video', selectedFile);

    // try {
    //   const response = await fetch('YOUR_SERVER_ENDPOINT', {
    //     method: 'POST',
    //     body: courseData,
    //   });

    //   if (response.ok) {
    //     alert('Video uploaded successfully!');
    //   } else {
    //     alert('Failed to upload video');
    //   }
    // } catch (error) {
    //   console.error('Error uploading video:', error);
    //   alert('An error occurred while uploading the video');
    // }
  };

  return (
    <div className={styles.container}>
      <h1>Course Creation</h1>
      <section>
        <h3>Upload a Video</h3>
        <input
          type="file"
          accept="video/*"
          name="videoFile"
          onChange={handleFileChange}
        />
        {videoPreview && (
          <div>
            <h3>Preview:</h3>
            <video src={videoPreview} controls width="700" />
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
                name="price"
                type="number"
                value={courseData.price}
                onChange={handleInputChange}
              />
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
            </div>
            <div>
              <h3>Video duration:</h3>
              <p>{formatDuration(courseData.duration)}</p>
            </div>
            <div>
              <label>Course category:</label>
              <Select
                name="category"
                value={courseData.category}
                onChange={handleInputChange}
                options={[
                  { value: "programming", label: "Programming" },
                  { value: "sports", label: "Sports" },
                  { value: "electronics", label: "Electronics" },
                ]}
              />
            </div>
          </div>
        )}
        <button onClick={handleUpload}>Upload Video</button>
      </section>
    </div>
  );
}

export default CourseCreation;
