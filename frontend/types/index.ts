import React from "react";

//* Basic event handler types
//* Buttons
export type ClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;
export type ChangeHandler = (e: React.MouseEvent<HTMLButtonElement>) => void;
//* Inputs
export type ChangeInputHandler = (
  e: React.ChangeEvent<HTMLInputElement>
) => void;

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
