import { Student } from "../models/Student";
import { getData, removeData, saveData, STORAGE_KEYS } from "./storageService";

export async function login(name: string): Promise<Student> {
  const existingStudent = await getData<Student>(STORAGE_KEYS.STUDENT);

  if (existingStudent) {
    return existingStudent;
  }

  const newStudent: Student = {
    id: Date.now().toString(),
    name,
    completedLessons: [],
    completedTopics: [],
    completedExercises: [],
    score: 0,
  };

  await saveData(STORAGE_KEYS.STUDENT, newStudent);

  return newStudent;
}

export async function getCurrentStudent(): Promise<Student | null> {
  return getData<Student>(STORAGE_KEYS.STUDENT);
}

export async function logout(): Promise<void> {
  await removeData(STORAGE_KEYS.STUDENT);
}
