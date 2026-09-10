import { Exercise } from "./Exercise";
import { Topic } from "./Topic";

export interface Lesson {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
  exercises: Exercise[];
}
