import { Course } from "src/app/courses/model/course";

export interface Student {
  id: string;
  name: string;
  email: string;
  courses: Course[]
}
