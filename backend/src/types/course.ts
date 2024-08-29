//* Course-types

export type Price = {
  id: number;
  amount: number;
  currency: string;
  discount: number;
};

export type Course = {
  id: number;
  title: string;
  description: string;
  //! check if null should be an option for 'teacher_id'
  teacher_id: number | null;
  price_id: number;
  // image_url: string;
};

export type Video = {
  id: number;
  url: string;
  index: number;
  course_id: number;
};

export type BoughtCourse = {
  course_id: number;
  buyer_id: number;
};

export type Wishlist = {
  course_id: number;
  wanter_id: number;
};
