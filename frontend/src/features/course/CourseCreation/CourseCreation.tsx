// import { ChangeEvent, useState } from "react";

// //* Styles
// import styles from "./CourseCreation.module.css";

// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../../data/store";
// import { usernameFromEmailExtractor } from "../../../utils/usernameFromEmailExtractor";
// import Input from "../../../components/ui/Input/Input";
// import Select from "../../../components/ui/Select/Select";
// import { AuthUser } from "../../../types";
// import { createCourse } from "../courseSlice";
// import Button from "../../../components/ui/Button/Button";

// //? To utils folder
// const formatDuration = (duration: number): string => {
//   const minutes = Math.floor(duration / 60);
//   const seconds = (duration % 60).toString().slice(0, 2);
//   return `${minutes}:${seconds}`;
// };

// function CourseCreation() {
//   const [videoPreview, setVideoPreview] = useState<string | null>(null);

//   const [courseData, setCourseData] = useState({
//     title: "",
//     description: "",
//     videoFile: null as File | null,
//     duration: 0,
//     category: "",
//     price: 0,
//     currency: "USD",
//   });

//   const user = useSelector<RootState>((state) => state.auth.user);

//   const dispatch = useDispatch<AppDispatch>();

//   function handleInputChange(
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) {
//     const { name, value, type } = e.target;

//     if (type === "file") {
//       const fileInput = e.target as HTMLInputElement;
//       setCourseData((prevState) => ({
//         ...prevState,
//         [name]: fileInput.files?.[0] || null,
//       }));
//     } else {
//       setCourseData((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     }
//   }

//   function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
//     const file = e.target.files?.[0];
//     if (file && file.type.startsWith("video/")) {
//       setCourseData((prevState) => ({
//         ...prevState,
//         videoFile: file,
//       }));
//       setVideoPreview(URL.createObjectURL(file));

//       const videoElement = document.createElement("video");
//       videoElement.src = URL.createObjectURL(file);
//       videoElement.onloadedmetadata = () => {
//         setCourseData((prevState) => ({
//           ...prevState,
//           duration: videoElement.duration,
//         }));
//       };
//     } else {
//       alert("Please select a valid video file");
//     }
//   }

//   function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     const {
//       title,
//       description,
//       videoFile,
//       duration,
//       category,
//       price,
//       currency,
//     } = courseData;

//     if (!videoFile) return;

//     const newCourse = {
//       title,
//       teacherName: usernameFromEmailExtractor(user?.email || ""),
//       description,
//       //! Check if needed to switch to a number
//       price: +price,
//       currency,
//       duration,
//       category,
//     };

//     console.log(newCourse);
//     dispatch(createCourse(newCourse));
//   }

//   return (
//     <form onSubmit={handleSubmit} className={styles.container}>
//       <h1>Course Creation</h1>

//       <h3>Upload a Video</h3>

//       <input
//         type="file"
//         accept="video/*"
//         name="videoFile"
//         onChange={handleFileChange}
//       />
//       {videoPreview && (
//         <div>
//           <h3>Preview:</h3>

//           <video src={videoPreview} controls width="700" />

//           <h3>
//             Course teacher: {usernameFromEmailExtractor(user?.email || "")}
//           </h3>

//           <div>
//             <label>Course title: </label>
//             <Input
//               name="title"
//               type="text"
//               value={courseData.title}
//               onChange={handleInputChange}
//               required
//             />
//           </div>

//           <div>
//             <label>Course description: </label>
//             <textarea
//               name="description"
//               value={courseData.description}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div>
//             <label>Course price: </label>
//             <Input
//               name="price"
//               type="number"
//               value={courseData.price}
//               onChange={handleInputChange}
//               required
//             />

//             <div>
//               <label>Currency:</label>
//               <Select
//                 name="currency"
//                 value={courseData.currency}
//                 onChange={handleInputChange}
//                 options={[
//                   { value: "USD", label: "USD" },
//                   { value: "ILS", label: "ILS" },
//                   { value: "EURO", label: "EURO" },
//                 ]}
//               />
//             </div>
//           </div>

//           <div>
//             <h3>Video duration:</h3>

//             <p>{formatDuration(courseData.duration)}</p>
//           </div>

//           <div>
//             <label>Course category:</label>
//             <Select
//               name="category"
//               value={courseData.category}
//               onChange={handleInputChange}
//               options={[
//                 { value: "programming", label: "Programming" },
//                 { value: "sports", label: "Sports" },
//                 { value: "electronics", label: "Electronics" },
//               ]}
//             />
//           </div>
//           <Button className={styles.submit_btn} type="submit">
//             Upload course
//           </Button>
//         </div>
//       )}
//     </form>
//   );
// }

// export default CourseCreation;

import { ChangeEvent, useState } from "react";
import styles from "./CourseCreation.module.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../data/store";
import { usernameFromEmailExtractor } from "../../../utils/usernameFromEmailExtractor";
import Input from "../../../components/ui/Input/Input";
import Select from "../../../components/ui/Select/Select";
import Button from "../../../components/ui/Button/Button";
import { createCourse } from "../courseSlice";
import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner";
import ErrorMessage from "../../../components/ui/ErrorMessage/ErrorMessage";

//? To utils folder
const formatDuration = (duration: number): string => {
  const minutes = Math.floor(duration / 60);
  const seconds = (duration % 60).toString().slice(0, 2);
  return `${minutes}:${seconds}`;
};

function CourseCreation() {
  const initialCourseData = {
    title: "",
    description: "",
    price: 0,
    currency: "USD",
  };

  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    // videoFile: null as File | null,
    // imageFile: null as File | null,
    // duration: 0,
    // category: "",
    price: 0,
    currency: "USD",
  });

  const user = useSelector<RootState>((state) => state.auth.user);
  const status = useSelector<RootState>((state) => state.course.status);
  const error = useSelector<RootState>((state) => state.course.error);

  const dispatch = useDispatch<AppDispatch>();

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { title, description, price, currency } = courseData;
    // if (!videoFile) return;

    const newCourseDetails = { title, description, price, currency };

    // Create FormData object
    // const formData = new FormData();
    // formData.append("user_uid", user?.uid);
    // formData.append("title", title);
    // formData.append("description", description);
    // formData.append("amount", price);
    // formData.append("currency", currency);
    // formData.append("category", category);
    // formData.append("videos", videoFile);

    dispatch(createCourse(newCourseDetails));
    setCourseData(initialCourseData);
  }

  return (
    <div className={styles.container}>
      {error && <ErrorMessage message={error} />}

      {status === "loading" && <LoadingSpinner />}

      {status !== "loading" && !error && (
        <form onSubmit={handleSubmit} className={styles.container}>
          <h1>Course Creation</h1>

          {/* <h3>Upload a Video</h3> */}

          {/* <input
        type="file"
        accept="video/*"
        name="videoFile"
        onChange={handleFileChange}
      /> */}

          <div>
            {/* <h3>Preview:</h3> */}

            {/* <video src={videoPreview} controls width="700" /> */}

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
                name="price"
                type="number"
                value={courseData.price}
                onChange={handleInputChange}
                required
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

            {/* <div>
          <h3>Video duration:</h3>

          <p>{formatDuration(courseData.duration)}</p>
        </div> */}

            {/* <div>
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
        </div> */}
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
