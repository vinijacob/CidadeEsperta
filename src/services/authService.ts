import { Student } from "../models/Student";
import { getData, removeData, saveData, STORAGE_KEYS } from "./storageService";

// Hash simples apenas para não guardar a senha em texto puro no aparelho.
function hashPassword(password: string): string {
  let hash = 5381;

  for (let i = 0; i < password.length; i++) {
    hash = (hash * 33) ^ password.charCodeAt(i);
  }

  return (hash >>> 0).toString(16);
}

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<Student> {
  const student: Student = {
    id: Date.now().toString(),
    name,
    email: email.toLowerCase(),
    passwordHash: hashPassword(password),
    avatar: "🙂",
    completedLessons: [],
    completedTopics: [],
    completedExercises: [],
    score: 0,
    streak: 0,
    bestStreak: 0,
  };

  await saveData(STORAGE_KEYS.STUDENT, student);
  await saveData(STORAGE_KEYS.SESSION, true);

  return student;
}

export async function signIn(email: string, password: string): Promise<Student> {
  const student = await getData<Student>(STORAGE_KEYS.STUDENT);

  if (!student) {
    throw new Error("NO_ACCOUNT");
  }

  if (
    student.email !== email.toLowerCase() ||
    student.passwordHash !== hashPassword(password)
  ) {
    throw new Error("INVALID_CREDENTIALS");
  }

  await saveData(STORAGE_KEYS.SESSION, true);

  return student;
}

export async function hasAccount(): Promise<boolean> {
  return (await getData<Student>(STORAGE_KEYS.STUDENT)) !== null;
}

export async function getCurrentStudent(): Promise<Student | null> {
  const session = await getData<boolean>(STORAGE_KEYS.SESSION);

  // Contas antigas (sem e-mail) não têm sessão: continuam entrando direto.
  const student = await getData<Student>(STORAGE_KEYS.STUDENT);

  if (!student || (!session && student.email)) {
    return null;
  }

  return student;
}

export async function updateStudent(
  changes: Partial<Pick<Student, "name" | "avatar" | "dailyGoal">>,
): Promise<Student | null> {
  const student = await getCurrentStudent();

  if (!student) {
    return null;
  }

  const updated = { ...student, ...changes };

  await saveData(STORAGE_KEYS.STUDENT, updated);

  return updated;
}

export async function resetProgress(): Promise<void> {
  const student = await getCurrentStudent();

  if (!student) {
    return;
  }

  await saveData(STORAGE_KEYS.STUDENT, {
    ...student,
    completedLessons: [],
    completedTopics: [],
    completedExercises: [],
    score: 0,
    streak: 0,
    bestStreak: 0,
    lastActiveDate: undefined,
    activity: {},
  });
}

export async function logout(): Promise<void> {
  await removeData(STORAGE_KEYS.SESSION);
}

export async function deleteAccount(): Promise<void> {
  await removeData(STORAGE_KEYS.SESSION);
  await removeData(STORAGE_KEYS.STUDENT);
}
