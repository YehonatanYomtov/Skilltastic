//* Config-db
import db from "config/db.ts";

//* Types
import { CourseType } from "../../types/index.ts";

export async function _createCourse(courseData: CourseType) {
  const {
    title,
    teacherName,
    description,
    price,
    currency,
    duration,
    category,
  } = courseData;

  console.log("--BACKEND--> courseData: ", courseData);

  return await db("courses")
    .insert(courseData)
    .returning(["id", "teacherName", "title", "description"]);
}

export async function _getAllCourses() {
  return await db("courses").select("*");
}
