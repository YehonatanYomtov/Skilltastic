import express from "express";
import { createCourse, getAllCourses } from "../controllers/courseController";
import { upload } from "../utils/multerConfig";

const router = express.Router();

router.post(
  "/create",
  // upload.single("image"), // Middleware for uploading the course image
  // upload.array("videos"), // Middleware for uploading multiple videos
  createCourse
);
router.get("/", getAllCourses);
// router.get("/wishlist", getAllWishlistCourses);
// router.get("/owned-courses", getAllOwnedCourses);
// router.get("/my-created-courses", getAllMyCreatedCourses);

export default router;
