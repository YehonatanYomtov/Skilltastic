//* User-type
export type User = {
  id: number;
  name: string;
  email: string;
  auth_id: string;
  type: "student" | "teacher";
};
