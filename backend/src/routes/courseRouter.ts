import express from "express";
import {
  createCourse,
  getAllCourses,
} from "../controllers/courseController.js";
const router = express.Router();

router.post("/create", createCourse);
router.get("/", getAllCourses);
// router.get("/wishlist", getAllWishlistCourses);
// router.get("/owned-courses", getAllOwnedCourses);
// router.get("/my-created-courses", getAllMyCreatedCourses);

export default router;
