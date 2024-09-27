// //* Styles
// import { ChangeEvent, useState } from "react";

// import styles from "./CourseCreation.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../../data/store";
// import { usernameFromEmailExtractor } from "../../../utils/usernameFromEmailExtractor";
// import Input from "../../../components/ui/Input/Input";
// import Select from "../../../components/ui/Select/Select";
// import Button from "../../../components/ui/Button/Button";
// import { createCourse } from "../courseSlice";
// import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner";
// import ErrorMessage from "../../../components/ui/ErrorMessage/ErrorMessage";
// import { uploadVideo } from "../../../firebase/uploadVideoToStorage";

// //? To utils folder
// // const formatDuration = (duration: number): string => {
// //   const minutes = Math.floor(duration / 60);
// //   const seconds = (duration % 60).toString().slice(0, 2);
// //   return `${minutes}:${seconds}`;
// // };

// function CourseCreation() {
//   const initialCourseData = {
//     title: "",
//     description: "",
//     price: 0,
//     currency: "USD",
//   };

//   const [videoPreview, setVideoPreview] = useState<string | null>(null);

//   const [courseData, setCourseData] = useState({
//     title: "",
//     description: "",
//     videoFile: null as File | null,
//     imageFile: null as File | null,
//     // duration: 0,
//     // category: "",
//     price: 0,
//     currency: "USD",
//   });

//   const user = useSelector((state: RootState) => state.auth.user);
//   const status = useSelector((state: RootState) => state.course.status);
//   const error = useSelector((state: RootState) => state.course.error);

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

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     const { title, description, videoFile, price, currency } = courseData;

//     if (!videoFile) {
//       //! Switch alert to message on the screen.
//       alert("Please select a video file.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("description", description);
//     formData.append("price", price.toString());
//     formData.append("currency", currency);
//     formData.append("videoFile", videoFile);

//     const videoUrl = await uploadVideo(videoFile);

//     const newCourseDetails = {
//       auth_id: user?.uid,
//       name: courseData.title,
//       description: courseData.description,
//       price: courseData.price,
//       currency: courseData.currency,
//       videoUrl,
//     };

//     dispatch(createCourse(newCourseDetails));
//     setCourseData(initialCourseData);
//   }

//   return (
//     <div className={styles.container}>
//       {error && <ErrorMessage message={error} />}

//       {status === "loading" && <LoadingSpinner />}

//       {status !== "loading" && !error && (
//         <>
//           <form onSubmit={handleSubmit} className={styles.container}>
//             <h1>Course Creation</h1>

//             <div>
//               <h3>
//                 Course teacher: {usernameFromEmailExtractor(user?.email || "")}
//               </h3>

//               <div>
//                 <label>Course title: </label>
//                 <Input
//                   name="title"
//                   type="text"
//                   value={courseData.title}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>

//               <div>
//                 <label>Course description: </label>
//                 <textarea
//                   name="description"
//                   value={courseData.description}
//                   onChange={handleInputChange}
//                 />
//               </div>

//               <div>
//                 <label>Course price: </label>
//                 <Input
//                   name="price"
//                   type="number"
//                   value={courseData.price}
//                   onChange={handleInputChange}
//                   required
//                 />

//                 <div>
//                   <label>Currency:</label>
//                   <Select
//                     name="currency"
//                     value={courseData.currency}
//                     onChange={handleInputChange}
//                     options={[
//                       { value: "USD", label: "USD" },
//                       { value: "ILS", label: "ILS" },
//                       { value: "EURO", label: "EURO" },
//                     ]}
//                   />
//                 </div>
//               </div>

//               {/* <div>
//             <h3>Video duration:</h3>

//             <p>{formatDuration(courseData.duration)}</p>
//           </div> */}

//               {/* <div>
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
//           </div> */}
//               <Button className={styles.submit_btn} type="submit">
//                 Upload course
//               </Button>
//             </div>
//           </form>

//           <h3>Upload a Video</h3>

//           <input
//             type="file"
//             accept="video/*"
//             name="videoFile"
//             onChange={handleFileChange}
//           />

//           <h3>Preview:</h3>

//           {videoPreview && (
//             <video
//               className={styles.video}
//               src={videoPreview}
//               controls
//               width="600"
//             />
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// export default CourseCreation;
