import { Answer, Exercise } from "@/models/Exercise";

export function isAnswerCorrect(exercise: Exercise, answer: Answer): boolean {
  if (answer === null) {
    return false;
  }

  if (exercise.type === "order") {
    return (
      Array.isArray(answer) &&
      answer.length === exercise.solution.length &&
      answer.every((line, index) => line === exercise.solution[index])
    );
  }

  return answer === exercise.correctAnswer;
}
