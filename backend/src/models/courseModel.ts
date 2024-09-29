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
    await trx("videos").insert({
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
  auth_Id: string
): Promise<User | undefined> {
  const teacher = await trx<User>("users")
    .select("*")
    .where("auth_id", auth_Id)
    .first();

  return teacher;
}

export async function _getCourseVideoById(
  id: number
): Promise<Video | undefined> {
  const video = await db<Video>("videos").select("*").where("id", id).first();

  return video;
}

export async function _getCourseById(id: number) {
  try {
    const course = await db("courses as c")
      .leftJoin("videos as v", "v.course_id", "c.id")
      .select("c.*", db.raw("array_agg(v.url) as video_urls"))
      .where("c.id", id)
      .groupBy("c.id")
      .first();

    return course;
  } catch (error) {
    console.error("Database query failed:", error);
    return null;
  }
}

export async function _getAllCourses() {
  const courses = await db<Course>("courses as c")
    .join("users as u", "c.teacher_id", "u.id")
    .join("prices as p", "c.price_id", "p.id")
    .select(
      "c.id as course_id",
      "c.title",
      "c.description",
      "u.id as user_id",
      "u.name",
      "u.email",
      "p.amount",
      "p.currency",
      "p.discount"
    );

  return courses.map((course) => ({
    id: course.course_id,
    name: course.title,
    description: course.description,
    teacher: {
      id: course.user_id,
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

export async function _getAllUserCourses(userId: string) {
  const courses = await db<Course>("courses as c")
    .join("users as u", "c.teacher_id", "u.id")
    .join("prices as p", "c.price_id", "p.id")
    .select(
      "c.id as course_id",
      "c.title",
      "c.description",
      "u.id as user_id",
      "u.name",
      "u.email",
      "p.amount",
      "p.currency",
      "p.discount"
    )
    .where("u.auth_id", userId);

  return courses.map((course) => ({
    id: course.course_id,
    name: course.title,
    description: course.description,
    teacher: {
      id: course.user_id,
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

export async function _searchCourses(searchQuery: string) {
  const courses = await db<Course>("courses as c")
    .join("users as u", "c.teacher_id", "u.id")
    .join("prices as p", "c.price_id", "p.id")
    .select(
      "c.id as course_id",
      "c.title",
      "c.description",
      "u.id as user_id",
      "u.name",
      "u.email",
      "p.amount",
      "p.currency",
      "p.discount"
    )
    .whereRaw(
      `to_tsvector('english', c.title || ' ' || c.description) @@ plainto_tsquery('english', ?)`,
      [searchQuery]
    );

  return courses.map((course) => ({
    id: course.course_id,
    name: course.title,
    description: course.description,
    teacher: {
      id: course.user_id,
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
