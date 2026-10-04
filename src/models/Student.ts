export interface Student {
  id: string;
  name: string;
  email?: string;
  passwordHash?: string;
  avatar?: string;
  completedLessons: string[];
  completedTopics: string[];
  completedExercises: string[];
  score: number;
  streak?: number;
  bestStreak?: number;
  lastActiveDate?: string;
  dailyGoal?: number;
  activity?: Record<string, number>;
}
