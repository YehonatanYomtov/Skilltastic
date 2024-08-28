//* User-type
export type User = {
  id: number;
  name: string;
  email: string;
  auth_id: string;
  type: "student" | "teacher";
};

//* Course-type
export type Course = {
  id: number;
  title: string;
  description: string;
  teacher_id: number;
  price_id: number;
};
