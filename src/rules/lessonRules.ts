import { Student } from "@/models/Student";

export interface Badge {
  id: string;
  icon: string;
  title: string;
  description: string;
  earned: (student: Student) => boolean;
}

export const badges: Badge[] = [
  {
    id: "first-step",
    icon: "🌱",
    title: "Primeiro passo",
    description: "Conclua sua primeira lição.",
    earned: (s) => s.completedTopics.length >= 1,
  },
  {
    id: "first-lesson",
    icon: "🏠",
    title: "Primeira construção",
    description: "Conclua uma aula inteira.",
    earned: (s) => s.completedLessons.length >= 1,
  },
  {
    id: "sharp",
    icon: "🎯",
    title: "Na mosca",
    description: "Acerte 10 exercícios.",
    earned: (s) => s.completedExercises.length >= 10,
  },
  {
    id: "points-100",
    icon: "💯",
    title: "Cem pontos",
    description: "Alcance 100 pontos.",
    earned: (s) => s.score >= 100,
  },
  {
    id: "streak-3",
    icon: "🔥",
    title: "Em chamas",
    description: "Estude 3 dias seguidos.",
    earned: (s) => (s.bestStreak ?? s.streak ?? 0) >= 3,
  },
  {
    id: "goal-day",
    icon: "📅",
    title: "Meta batida",
    description: "Cumpra sua meta diária de pontos.",
    earned: (s) =>
      Object.values(s.activity ?? {}).some((p) => p >= (s.dailyGoal ?? 50)),
  },
  {
    id: "halfway",
    icon: "🏙️",
    title: "Meia cidade",
    description: "Conclua 5 aulas.",
    earned: (s) => s.completedLessons.length >= 5,
  },
  {
    id: "master",
    icon: "👑",
    title: "Prefeito esperto",
    description: "Conclua todas as aulas.",
    earned: (s) => s.completedLessons.length >= 10,
  },
];

export function getLevel(score: number) {
  const level = Math.floor(score / 50) + 1;
  const into = score % 50;

  return { level, into, next: 50, progress: into / 50 };
}

export const avatarOptions = [
  { emoji: "🙂", name: "Sorriso" },
  { emoji: "😎", name: "Descolado" },
  { emoji: "🤓", name: "Estudioso" },
  { emoji: "🦊", name: "Raposa" },
  { emoji: "🐱", name: "Gato" },
  { emoji: "🐼", name: "Panda" },
  { emoji: "🚀", name: "Foguete" },
  { emoji: "🤖", name: "Robô" },
];

export const dailyGoalOptions = [20, 50, 100];
