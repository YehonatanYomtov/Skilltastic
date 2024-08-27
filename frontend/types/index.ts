import React from "react";

//* Object of strings
export type StringObject = {
  [key: string]: string;
};

//* Basic event handler types
//* Buttons
export type ClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;
export type ChangeHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;
//* Inputs
export type ChangeInputHandler = (
  e: React.ChangeEvent<HTMLInputElement>
) => void;

// //* Course-type
// export type CourseType = {
//   id?: string;
//   title: string;
//   teacherName: string;
//   description: string;
//   price: number;
//   currency: string;
//   duration: string | number;
//   category: string;
//   // subcategory?: string;
//   ratingAverage: string | number;
//   ratingCount: string | number;
//   // discountPrice?: string | number | null;
//   // tag?: string;
//   // imageUrl: string;
// };

//* Course-card-type
export type CourseCard = {
  id?: string | number;
  category?: string;
  subcategory?: string;
  courseTitle: string;
  teacherName: string;
  courseDescription?: string;
  ratingAverage: string | number;
  ratingCount: string | number;
  price: string | number;
  discountPrice?: string | number | null;
  tag?: string;
  imageUrl: string;
};

//* User-auth-type
export type User = {
  uid: string | null;
  email: string | null;
};

export type AuthUser = User | null;
