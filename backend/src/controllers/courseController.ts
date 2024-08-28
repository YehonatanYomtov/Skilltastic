import { Request, Response } from "express";
import { _createCourse, _getAllCourses } from "../models/courseModel";

export const createCourse = async (req: Request, res: Response) => {
  try {
    const newCourse = req.body;
    const createdCourse = await _createCourse(newCourse);

    console.log("CONTROLLER -> Created Course:", createdCourse);

    res.status(201).json(createdCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create course" });
  }
};

export const getAllCourses = async (req: Request, res: Response) => {
  try {
    res.status(201).json(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get all courses" });
  }
};
