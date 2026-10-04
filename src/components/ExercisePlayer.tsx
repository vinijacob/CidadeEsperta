import { Answer, Exercise } from "@/models/Exercise";
import { ExerciseCard } from "./ExerciseCard";
import { OrderCard } from "./OrderCard";

interface ExercisePlayerProps {
  exercise: Exercise;
  answer: Answer;
  answered: boolean;
  points?: number;
  onChange: (answer: Answer) => void;
}

export function ExercisePlayer({
  exercise,
  answer,
  answered,
  points,
  onChange,
}: ExercisePlayerProps) {
  if (exercise.type === "order") {
    return (
      <OrderCard
        exercise={exercise}
        answered={answered}
        points={points}
        onChange={onChange}
      />
    );
  }

  return (
    <ExerciseCard
      exercise={exercise}
      selectedAnswer={typeof answer === "number" ? answer : null}
      answered={answered}
      points={points}
      onSelectAnswer={(index) => !answered && onChange(index)}
    />
  );
}
