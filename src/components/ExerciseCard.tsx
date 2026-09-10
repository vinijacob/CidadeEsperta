import { Pressable, StyleSheet } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
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
  const colorScheme = useColorScheme();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

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
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
                isSelected &&
                  !answered && {
                    backgroundColor:
                      colorScheme === "dark"
                        ? "rgba(33, 150, 243, 0.2)"
                        : "rgba(33, 150, 243, 0.25)",
                    borderColor: "#2196F3",
                  },
                answered &&
                  isCorrect && {
                    backgroundColor:
                      colorScheme === "dark"
                        ? "rgba(46, 125, 50, 0.25)"
                        : "rgba(46, 125, 50, 0.2)",
                    borderColor: "#2E7D32",
                  },
                answered &&
                  isSelected &&
                  !isCorrect && {
                    backgroundColor:
                      colorScheme === "dark"
                        ? "rgba(198, 40, 40, 0.25)"
                        : "rgba(198, 40, 40, 0.2)",
                    borderColor: "#C62828",
                  },
              ]}
            >
              <ThemedText style={styles.optionText}>{option}</ThemedText>
            </Pressable>
          );
        })}
      </ThemedView>

      {answered && (
        <ThemedView
          style={[
            styles.feedback,
            {
              backgroundColor: colorScheme === "dark" ? "#242424" : "#EEEEEE",
              borderColor: colors.border,
            },
          ]}
        >
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
    borderRadius: 10,
    padding: 14,
    justifyContent: "center",
  },

  optionText: {
    fontSize: 16,
  },

  feedback: {
    gap: 8,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
  },
});
