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

  const optionBackgroundColor = colorScheme === "dark" ? "#242424" : "#FFFFFF";

  const feedbackBackgroundColor =
    colorScheme === "dark" ? "#242424" : "#EEEEEE";

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
                  backgroundColor: optionBackgroundColor,
                  borderColor: colors.border,
                },
                isSelected && {
                  borderColor: colors.tint,
                },
                answered &&
                  isCorrect && {
                    borderColor: "#2E7D32",
                    backgroundColor:
                      colorScheme === "dark" ? "#17351A" : "#E8F5E9",
                  },
                answered &&
                  isSelected &&
                  !isCorrect && {
                    borderColor: "#C62828",
                    backgroundColor:
                      colorScheme === "dark" ? "#351717" : "#FFEBEE",
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
              backgroundColor: feedbackBackgroundColor,
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
