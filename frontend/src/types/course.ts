//* Course-type
export type Course = {
  id: number;
  title: string;
  description: string;
  teacher_id: number;
  price_id: number;
};

//* Course-price-type
export type CoursePrice = {
  amount: string;
  currency: string;
  discount: string;
};

//* Course-teacher-type
export type CourseTeacher = {
  id: number;
  email: string;
  name: string;
};

//* Course-card-type
export type CourseCard = {
  id?: string | number;
  category?: string;
  subcategory?: string;
  name: string;
  teacher: CourseTeacher;
  description?: string;
  ratingAverage: string | number;
  ratingCount: string | number;
  price: CoursePrice;
  discountPrice?: string | number | null;
  tag?: string;
  imageUrl: string;
};
