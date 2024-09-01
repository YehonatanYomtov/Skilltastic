import express from "express";
import {
  createCourse,
  getAllCourses,
  getAllUserCourses,
  getCourseById,
  getCourseVideoById,
  searchCourses,
} from "../controllers/courseController";
import { upload } from "../utils/multerConfig";
import multer from "multer";
import { uploadVideo } from "../utils/uploadVideoToFireStore";

const router = express.Router();

router.post("/upload-video", upload.single("video"), async (req, res) => {
  try {
    const response = await uploadVideo(req.file);
    res.send(response);
  } catch (err) {
    res.status(400).send("There was an error");
  }
});

router.post("/create", upload.single("videoFile"), createCourse);

// router.post("/video-url", uploadVideoUrl);
router.get("/", getAllCourses);
router.get("/created/:id", getAllUserCourses);
router.get("/search", searchCourses);
router.get("/video/:courseId/:videoId", getCourseVideoById);
router.get("/course/:courseId", getCourseById);
// router.get("/wishlist", getAllWishlistCourses);
// router.get("/owned-courses", getAllOwnedCourses);
// router.get("/my-created-courses", getAllMyCreatedCourses);

export default router;
