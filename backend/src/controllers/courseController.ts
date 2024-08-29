// import { Request, Response } from "express";
// import {
//   _addVideosToCourse,
//   _createCourse,
//   _createPrice,
//   _findTeacherByAuthId,
//   _getAllCourses,
// } from "../models/courseModel";

// import db from "../config/db";
// import { uploadFile } from "../utils/uploadFile";

// export async function createCourse(req: Request, res: Response) {
//   const { title, description, teacherAuthId, amount, currency, discount } =
//     req.body;

//   console.log(req.body);

//   const image = req.file;
//   const videoFiles = req.files as Express.Multer.File[];
//   console.log("videoFiles ------------>: ", videoFiles);

//   try {
//     // Upload image to Firebase Storage
//     const imageUrl = image
//       ? await uploadFile(image, `courses/${Date.now()}_${image.originalname}`)
//       : null;

//     // Upload videos to Firebase Storage
//     const videoUrls = await Promise.all(
//       videoFiles.map((file) =>
//         uploadFile(file, `videos/${Date.now()}_${file.originalname}`)
//       )
//     );

//     await db.transaction(async (trx) => {
//       // Fetching the teacher's ID using auth_id within the transaction
//       const teacher = await _findTeacherByAuthId(trx, teacherAuthId);

//       if (!teacher) {
//         throw new Error("Teacher not found");
//       }

//       // Create Price
//       const priceId = await _createPrice(trx, amount, currency, discount);

//       // Create Course
//       const courseId = await _createCourse(
//         trx,
//         title,
//         description,
//         teacher.id,
//         priceId
//       );

//       if (imageUrl) {
//         await trx("courses")
//           .where("id", courseId)
//           .update({ image_url: imageUrl });
//       }

//       // Add Video to course
//       await _addVideosToCourse(
//         trx,
//         videoUrls.map((url, index) => ({ url, index: index + 1 })),
//         courseId
//       );

//       res
//         .status(201)
//         .json({ message: "Course created successfully", courseId });
//     });
//   } catch (error) {
//     const err = error as Error;
//     console.error(err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// }

// export const getAllCourses = async (req: Request, res: Response) => {
//   try {
//     const courses = await _getAllCourses();
//     res.status(201).json(req.body);
//   } catch (error) {
//     const err = error as Error;
//     console.error(err);
//     res
//       .status(500)
//       .json({ message: "Failed to get all courses", error: err.message });
//   }
// };

import { Request, Response } from "express";
import {
  _addVideosToCourse,
  _createCourse,
  _createPrice,
  _findTeacherByAuthId,
  _getAllCourses,
} from "../models/courseModel";

import db from "../config/db";
import { uploadFile } from "../utils/uploadFile";

import { Request, Response } from "express";
import {
  _addVideosToCourse,
  _createCourse,
  _createPrice,
  _findTeacherByAuth  1,
  _findUserById,
  _getAllCourses,
} from "../models/courseModel";

import db from "../config/db";
import { uploadFile } from "../utils/uploadFile";

export async function createCourse(req: Request, res: Response) {
  const { id, title, description } = req.body;

  try {
    await db.transaction(async (trx) => {
      const course = await _createCourse(trx, title, description, id, 1);

      res.status(201).json({ message: "Course created successfully", course });
    });
  } catch (error) {
    const err = error as Error;
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

// export async function createCourse(req: Request, res: Response) {
//   const { title, description, teacherAuthId, amount, currency, discount } =
//     req.body;

//   const image = req.file;
//   const videoFiles = req.files as Express.Multer.File[];

//   try {
//     // Upload image to Firebase Storage
//     const imageUrl = image
//       ? await uploadFile(image, `courses/${Date.now()}_${image.originalname}`)
//       : null;

//     // Upload videos to Firebase Storage
//     const videoUrls = videoFiles?.length
//       ? await Promise.all(
//           videoFiles.map((file) =>
//             uploadFile(file, `videos/${Date.now()}_${file.originalname}`)
//           )
//         )
//       : [];

//     await db.transaction(async (trx) => {
//       // Fetching the teacher's ID using auth_id within the transaction
//       const teacher = await _findTeacherByAuthId(trx, teacherAuthId);

//       if (!teacher) {
//         throw new Error("Teacher not found");
//       }

//       // Create Price
//       const priceId = await _createPrice(trx, amount, currency, discount);

//       // Create Course
//       const courseId = await _createCourse(
//         trx,
//         title,
//         description,
//         teacher.id,
//         priceId
//       );

//       if (imageUrl) {
//         await trx("courses")
//           .where("id", courseId)
//           .update({ image_url: imageUrl });
//       }

//       // Add Video to course, if any video files were uploaded
//       if (videoUrls.length > 0) {
//         await _addVideosToCourse(
//           trx,
//           videoUrls.map((url, index) => ({ url, index: index + 1 })),
//           courseId
//         );
//       }

//       res
//         .status(201)
//         .json({ message: "Course created successfully", courseId });
//     });
//   } catch (error) {
//     const err = error as Error;
//     console.error(err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// }

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
