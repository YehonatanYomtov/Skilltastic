//* Course-type
export type Course = {
  id: number;
  title: string;
  description: string;
  teacher_id: number;
  price_id: number;
};

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
