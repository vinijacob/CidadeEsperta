import { Pressable, StyleSheet } from "react-native";

import { Exercise } from "@/models/Exercise";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface ExerciseCardProps {
  exercise: Exercise;
  selectedAnswer: number | null;
  answered: boolean;
  onSelectAnswer: (answerIndex: number) => void;
}

export function ExerciseCard({
  exercise,
  selectedAnswer,
  answered,
  onSelectAnswer,
}: ExerciseCardProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.question}>
        {exercise.question}
      </ThemedText>

      <ThemedView style={styles.options}>
        {exercise.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = exercise.correctAnswer === index;

          return (
            <Pressable
              key={index}
              disabled={answered}
              onPress={() => onSelectAnswer(index)}
              style={[
                styles.option,

                isSelected && !answered && styles.selectedOption,

                answered && isCorrect && styles.correctOption,

                answered && isSelected && !isCorrect && styles.wrongOption,
              ]}
            >
              <ThemedText style={styles.optionText}>{option}</ThemedText>
            </Pressable>
          );
        })}
      </ThemedView>

      {answered && (
        <ThemedView style={styles.feedback}>
          <ThemedText type="subtitle">
            {selectedAnswer === exercise.correctAnswer
              ? "🎉 Muito bem!"
              : "😅 Quase!"}
          </ThemedText>

          <ThemedText>{exercise.explanation}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },

  question: {
    fontSize: 20,
    lineHeight: 28,
  },

  options: {
    gap: 12,
    backgroundColor: "transparent",
  },

  option: {
    minHeight: 52,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
    padding: 14,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  selectedOption: {
    backgroundColor: "rgba(33, 150, 243, 0.25)",
    borderColor: "#2196F3",
    borderWidth: 2,
  },

  correctOption: {
    backgroundColor: "rgba(46, 125, 50, 0.2)",
    borderColor: "#2E7D32",
    borderWidth: 2,
  },

  wrongOption: {
    backgroundColor: "rgba(198, 40, 40, 0.2)",
    borderColor: "#C62828",
    borderWidth: 2,
  },

  optionText: {
    color: "#000000",
  },

  feedback: {
    gap: 8,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#EEEEEE",
  },
});
