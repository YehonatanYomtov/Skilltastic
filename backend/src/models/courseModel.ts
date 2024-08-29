//* Config-db
import db from "../config/db";

//* Types
import { Course, Price, Transaction, User, Video } from "../types";

export async function _createPrice(
  trx: Transaction,
  amount: number,
  currency: string,
  discount: number = 0
) {
  const [{ id }] = await trx<Price>("prices")
    .insert({ amount, currency, discount })
    .returning("id");

  return id;
}

export async function _createCourse(
  trx: Transaction,
  title: string,
  description: string,
  teacherId: number,
  priceId: number
) {
  const [course] = await trx<Course>("courses")
    .insert({
      title,
      description,
      teacher_id: teacherId,
      price_id: priceId,
    })
    .returning("*");
  return course;
}

export async function _addVideosToCourse(
  trx: Transaction,
  videos: { url: string }[],
  courseId: number
) {
  for (let i = 0; i < videos.length; i++) {
    await trx<Video>("videos").insert({
      url: videos[i].url,
      index: i + 1,
      course_id: courseId,
    });
  }
}

//! Switch location to userModel
export async function _findUserById(trx: Transaction, id: string) {
  const user = await trx<User>("users").select("*").where("id", id).first();

  return user;
}

export async function _findTeacherByAuthId(
  trx: Transaction,
  teacherId: string
): Promise<User | undefined> {
  const teacher = await trx<User>("users")
    .select("*")
    .where("id", teacherId)
    .first();

  return teacher;
}

export async function _getAllCourses() {
  const courses = await db<Course>("courses as c")
    .join("users as u", "c.teacher_id", "u.id")
    .join("prices as p", "c.price_id", "p.id")
    .select(
      "c.id",
      "c.title",
      "c.description",
      "u.id ",
      "u.name",
      "u.email",
      "p.amount",
      "p.currency",
      "p.discount"
    );

  return courses.map((course) => ({
    id: course.id,
    name: course.title,
    description: course.description,
    teacher: {
      id: course.id,
      name: course.name,
      email: course.email,
    },
    price: {
      amount: course.amount,
      currency: course.currency,
      discount: course.discount,
    },
  }));
}
