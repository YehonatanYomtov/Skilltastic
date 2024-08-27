import express from "express";
import {
  createCourse,
  getAllCourses,
} from "../controllers/courseController.ts";
const router = express.Router();

router.post("/create", createCourse);
router.get("/", getAllCourses);

export default router;
