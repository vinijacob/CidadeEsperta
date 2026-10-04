import { Pressable, StyleSheet, View } from "react-native";

import { getColors, Radius } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ChoiceExercise } from "@/models/Exercise";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface ExerciseCardProps {
  exercise: ChoiceExercise;
  selectedAnswer: number | null;
  answered: boolean;
  points?: number;
  onSelectAnswer: (answerIndex: number) => void;
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export function ExerciseCard({
  exercise,
  selectedAnswer,
  answered,
  points = 10,
  onSelectAnswer,
}: ExerciseCardProps) {
  const colors = getColors(useColorScheme());

  const isRight = selectedAnswer === exercise.correctAnswer;

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.question}>
        {exercise.question}
      </ThemedText>

      <ThemedView style={styles.options}>
        {exercise.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = exercise.correctAnswer === index;
          const showCorrect = answered && isCorrect;
          const showWrong = answered && isSelected && !isCorrect;

          const accent = showCorrect
            ? colors.success
            : showWrong
              ? colors.danger
              : isSelected
                ? colors.tint
                : colors.border;

          const background = showCorrect
            ? colors.successSoft
            : showWrong
              ? colors.dangerSoft
              : isSelected
                ? colors.tintSoft
                : colors.card;

          return (
            <Pressable
              key={index}
              disabled={answered}
              onPress={() => onSelectAnswer(index)}
              style={({ pressed }) => [
                styles.option,
                { backgroundColor: background, borderColor: accent },
                pressed && { opacity: 0.8 },
              ]}
            >
              <View
                style={[
                  styles.letter,
                  {
                    borderColor: accent,
                    backgroundColor:
                      isSelected || answered ? accent : "transparent",
                  },
                ]}
              >
                <ThemedText
                  type="small"
                  style={styles.letterText}
                  lightColor={
                    isSelected || showCorrect ? "#FFFFFF" : colors.muted
                  }
                  darkColor={
                    isSelected || showCorrect ? colors.background : colors.muted
                  }
                >
                  {showCorrect ? "✓" : showWrong ? "✕" : LETTERS[index]}
                </ThemedText>
              </View>

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
              backgroundColor: isRight ? colors.successSoft : colors.dangerSoft,
              borderColor: isRight ? colors.success : colors.danger,
            },
          ]}
        >
          <ThemedText type="subtitle">
            {isRight
              ? `🎉 Muito bem! +${points} pontos`
              : "😅 Quase! Veja a explicação."}
          </ThemedText>

          <ThemedText>{exercise.explanation}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 20, backgroundColor: "transparent" },
  question: { fontSize: 20, lineHeight: 28 },
  options: { gap: 12, backgroundColor: "transparent" },
  option: {
    minHeight: 56,
    borderWidth: 1.5,
    borderRadius: Radius.medium,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  letter: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  letterText: { fontWeight: "bold", lineHeight: 18 },
  optionText: { flex: 1, fontSize: 16 },
  feedback: {
    gap: 8,
    padding: 16,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
  },
});
