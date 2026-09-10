import { Student } from "@/models/Student";
import { getData, saveData, STORAGE_KEYS } from "./storageService";

export async function getStudentProgress(): Promise<Student | null> {
  return getData<Student>(STORAGE_KEYS.STUDENT);
}

export async function completeLesson(
  lessonId: string,
): Promise<Student | null> {
  const student = await getStudentProgress();

  if (!student) {
    return null;
  }

  if (!student.completedLessons.includes(lessonId)) {
    student.completedLessons.push(lessonId);
  }

  await saveData(STORAGE_KEYS.STUDENT, student);

  return student;
}

export async function completeExercise(
  exerciseId: string,
  points: number,
): Promise<Student | null> {
  const student = await getStudentProgress();

  if (!student) {
    return null;
  }

  if (!student.completedExercises.includes(exerciseId)) {
    student.completedExercises.push(exerciseId);
    student.score += points;
  }

  await saveData(STORAGE_KEYS.STUDENT, student);

  return student;
}

export function isLessonCompleted(student: Student, lessonId: string): boolean {
  return student.completedLessons.includes(lessonId);
}

export function isLessonUnlocked(
  student: Student,
  lessonIndex: number,
): boolean {
  if (lessonIndex === 0) {
    return true;
  }

  const previousLessonId = `lesson-${lessonIndex}`;

  return student.completedLessons.includes(previousLessonId);
}
