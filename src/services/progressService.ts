import { Student } from "@/models/Student";
import { getData, saveData, STORAGE_KEYS } from "./storageService";

export function todayKey(date = new Date()): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function addPoints(student: Student, points: number): void {
  if (points <= 0) {
    return;
  }

  const today = todayKey();

  student.score += points;
  student.activity = {
    ...student.activity,
    [today]: (student.activity?.[today] ?? 0) + points,
  };
}

function touchStreak(student: Student): void {
  const today = todayKey();

  if (student.lastActiveDate === today) {
    return;
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  student.streak =
    student.lastActiveDate === todayKey(yesterday)
      ? (student.streak ?? 0) + 1
      : 1;
  student.bestStreak = Math.max(student.bestStreak ?? 0, student.streak);
  student.lastActiveDate = today;
}

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

  touchStreak(student);

  await saveData(STORAGE_KEYS.STUDENT, student);

  return student;
}

export async function completeExercise(
  exerciseId: string,
  points: number,
  correct: boolean = points > 0,
): Promise<Student | null> {
  const student = await getStudentProgress();

  if (!student) {
    return null;
  }

  touchStreak(student);

  if (correct && !student.completedExercises.includes(exerciseId)) {
    student.completedExercises.push(exerciseId);
    addPoints(student, points);
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

export async function completeTopic(
  topicId: string,
): Promise<Student | null> {
  const student = await getStudentProgress();

  if (!student) {
    return null;
  }

  if (!student.completedTopics.includes(topicId)) {
    student.completedTopics.push(topicId);
  }

  touchStreak(student);
  await saveData(STORAGE_KEYS.STUDENT, student);

  return student;
}

export function getLessonProgress(
  student: Student,
  lesson: { topics: { id: string }[]; exercises: { id: string }[] },
): number {
  const total = lesson.topics.length + lesson.exercises.length;

  if (total === 0) {
    return 0;
  }

  const done =
    lesson.topics.filter((t) => student.completedTopics.includes(t.id))
      .length +
    lesson.exercises.filter((e) => student.completedExercises.includes(e.id))
      .length;

  return done / total;
}

export async function addBonusPoints(points: number): Promise<Student | null> {
  const student = await getStudentProgress();

  if (!student) {
    return null;
  }

  touchStreak(student);
  addPoints(student, points);

  await saveData(STORAGE_KEYS.STUDENT, student);

  return student;
}

export function getTodayPoints(student: Student): number {
  return student.activity?.[todayKey()] ?? 0;
}

export function getWeekActivity(student: Student) {
  const days = ["D", "S", "T", "Q", "Q", "S", "S"];

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));

    return {
      label: days[date.getDay()],
      points: student.activity?.[todayKey(date)] ?? 0,
      isToday: i === 6,
    };
  });
}
