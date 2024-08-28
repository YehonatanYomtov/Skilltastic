//* Config-db
import db from "../config/db";

//* Types
import { Course, Price, User, Video } from "../types";
import { Transaction } from "knex";

export async function _createPrice(
  trx: Transaction,
  amount: number,
  currency: string,
  discount: number = 0
): Promise<number> {
  const [priceId] = await trx<Price>("prices")
    .insert({ amount, currency, discount })
    .returning("id");
  return priceId;
}

export async function _createCourse(
  trx: Transaction,
  title: string,
  description: string,
  teacherId: number,
  priceId: number
): Promise<number> {
  const [courseId] = await trx<Course>("courses")
    .insert({
      title,
      description,
      teacher_id: teacherId,
      price_id: priceId,
    })
    .returning("id");
  return courseId;
}

export async function _addVideosToCourse(
  trx: Transaction,
  videos: { url: string }[],
  courseId: number
): Promise<void> {
  for (let i = 0; i < videos.length; i++) {
    await trx<Video>("videos").insert({
      url: videos[i].url,
      index: i + 1,
      course_id: courseId,
    });
  }
}

export async function _findTeacherByAuthId(
  trx: Transaction,
  authId: string
): Promise<User | undefined> {
  return await trx<User>("users").select("id").where("auth_id", authId).first();
}

export async function _getAllCourses(): Promise<Course[]> {
  return await db<Course>("courses").select("*");
}
