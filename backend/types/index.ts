//* Course-type
export type CourseType = {
  id?: string;
  title: string;
  teacherName: string;
  description: string;
  price: number;
  currency: string;
  duration: string | number;
  category: string;
  // subcategory?: string;
  ratingAverage: string | number;
  ratingCount: string | number;
  // discountPrice?: string | number | null;
  // tag?: string;
  // imageUrl: string;
};
