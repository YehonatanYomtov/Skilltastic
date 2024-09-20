import { Request, Response } from "express";
import {
  _addVideosToCourse,
  _createCourse,
  _createPrice,
  _findTeacherByAuthId,
  _findUserById,
  _getAllCourses,
  _getAllUserCourses,
  _getCourseById,
  _getCourseVideoById,
  _searchCourses,
} from "../models/courseModel";

import db from "../config/db";
import { uploadVideo } from "../utils/uploadVideoToFireStore";

export async function createCourse(req: Request, res: Response) {
  const {
    teacherId,
    title,
    description,
    // price: amount,
    // currency,
    // videoUrl,
  } = req.body;

  // if (!title || !description || !amount || !currency) {
  if (!title || !description) {
    return res.status(400).json({ error: "All course fields are required" });
  }

  // if (!videoUrl) {
  //   return res.status(400).json({ error: "No video file uploaded" });
  // }

  try {
    await db.transaction(async (trx) => {
      // const priceId = await _createPrice(trx, amount, currency);

      const course = await _createCourse(trx, title, description, teacherId, 1);

      const url = await uploadVideo(req.file);
      await _addVideosToCourse(trx, [{ url }], course.id);

      res.status(201).json({ message: "Course created successfully", course });
    });
  } catch (error) {
    const err = error as Error;
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export async function getAllCourses(req: Request, res: Response) {
  try {
    const courses = await _getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    const err = error as Error;
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to get all courses", error: err.message });
  }
}

export async function getCourseVideoById(req: Request, res: Response) {
  const id = +req.params.videoId;

  try {
    const courses = await _getCourseVideoById(id);
    res.status(200).json(courses);
  } catch (error) {
    const err = error as Error;
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to get course video", error: err.message });
  }
}

export async function getCourseById(req: Request, res: Response) {
  const id = +req.params.courseId;

  try {
    const course = await _getCourseById(id);
    res.status(200).json(course);
  } catch (error) {
    const err = error as Error;
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to get course video", error: err.message });
  }
}

export async function getAllUserCourses(req: Request, res: Response) {
  const userId = req.params.id;

  try {
    const courses = await _getAllUserCourses(userId);
    res.status(200).json(courses);
  } catch (error) {
    const err = error as Error;
    console.error(err);
    res.status(500).json({
      message: "Failed to get all current users courses",
      error: err.message,
    });
  }
}

export async function searchCourses(req: Request, res: Response) {
  const searchQuery = req.query.q;

  try {
    if (typeof searchQuery !== "string") {
      return res.status(400).send({ message: "No query provided." });
    }

    const courses = await _searchCourses(searchQuery);
    res.status(200).json(courses);
  } catch (error) {
    const err = error as Error;
    console.error(err);
    res.status(500).json({
      message: "Failed to get courses",
      error: err.message,
    });
  }
}
