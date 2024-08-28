import { Request, Response } from "express";
import {
  _addVideosToCourse,
  _createCourse,
  _createPrice,
  _findTeacherByAuthId,
  _getAllCourses,
} from "../models/courseModel";

import db from "../config/db";

// export const createCourse = async (req: Request, res: Response) => {
//   try {
//     const newCourse = req.body;
//     const createdCourse = await _createCourse(newCourse);

//     console.log("CONTROLLER -> Created Course:", createdCourse);

//     res.status(201).json(createdCourse);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to create course" });
//   }
// };

export async function createCourse(req: Request, res: Response) {
  const {
    title,
    description,
    teacherAuthId,
    amount,
    currency,
    discount,
    videos,
  } = req.body;

  try {
    await db.transaction(async (trx) => {
      // Fetching the teacher's ID using auth_id within the transaction
      const teacher = await _findTeacherByAuthId(trx, teacherAuthId);

      if (!teacher) {
        throw new Error("Teacher not found");
      }

      // Create Price
      const priceId = await _createPrice(trx, amount, currency, discount);

      // Create Course
      const courseId = await _createCourse(
        trx,
        title,
        description,
        teacher.id,
        priceId
      );

      // Add Video to course
      await _addVideosToCourse(trx, videos, courseId);

      res
        .status(201)
        .json({ message: "Course created successfully", courseId });
    });
  } catch (error) {
    const err = error as Error;
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    res.status(201).json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get all courses" });
  }
};
