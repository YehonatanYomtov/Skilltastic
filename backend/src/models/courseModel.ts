//* Config-db
import db from "../config/db";

//* Types
import { Course, Price } from "../types";

export async function _createPrice(trx, amount, currency, discount = 0) {
  const [priceId] = await trx<Price>("prices")
    .insert({ amount, currency, discount })
    .returning("id");
  return priceId;
}

export async function _createCourse(
  trx: Transaction,
  title,
  description,
  teacherId,
  priceId
) {
  const [courseId] = await trx("courses")
    .insert({
      title,
      description,
      teacher_id: teacherId,
      price_id: priceId,
    })
    .returning("id");
  return courseId;
}

export async function _addVideosToCourse(trx: Transaction, videos, courseId) {
  for (let i = 0; i < videos.length; i++) {
    await trx("videos").insert({
      url: videos[i].url,
      index: i + 1,
      course_id: courseId,
    });
  }
}

export async function _findTeacherByAuthId(trx: Transaction, authId) {
  return await trx("users").select("id").where("auth_id", authId).first();
}

export async function _getAllCourses() {
  return await db("courses").select("*");
}
