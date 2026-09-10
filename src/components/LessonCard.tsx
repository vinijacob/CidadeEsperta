import { Pressable, StyleSheet } from "react-native";

import { Lesson } from "@/models/Lesson";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface LessonCardProps {
  lesson: Lesson;
  unlocked: boolean;
  completed: boolean;
  onPress: () => void;
}

export function LessonCard({
  lesson,
  unlocked,
  completed,
  onPress,
}: LessonCardProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!unlocked}
      style={({ pressed }) => [
        styles.card,
        !unlocked && styles.lockedCard,
        pressed && unlocked && styles.pressedCard,
      ]}
    >
      <ThemedView style={styles.content}>
        <ThemedView style={styles.textContainer}>
          <ThemedText type="subtitle">
            {completed ? "✅" : unlocked ? "🔓" : "🔒"} {lesson.title}
          </ThemedText>

          <ThemedText style={styles.description}>
            {lesson.description}
          </ThemedText>

          <ThemedText style={styles.info}>
            {lesson.topics.length} lições • {lesson.exercises.length} exercícios
          </ThemedText>

          {completed && (
            <ThemedText style={styles.completedText}>
              Aula concluída!
            </ThemedText>
          )}

          {!unlocked && (
            <ThemedText style={styles.lockedText}>
              Complete a aula anterior para desbloquear.
            </ThemedText>
          )}
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#2E7D32",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },

  lockedCard: {
    opacity: 0.5,
    borderColor: "#999",
  },

  pressedCard: {
    opacity: 0.7,
  },

  content: {
    flexDirection: "row",
    gap: 14,
    backgroundColor: "transparent",
  },

  icon: {
    fontSize: 28,
    marginTop: 2,
  },

  textContainer: {
    flex: 1,
    gap: 6,
    backgroundColor: "transparent",
  },

  description: {
    lineHeight: 20,
  },

  info: {
    fontSize: 13,
    opacity: 0.7,
    marginTop: 4,
  },

  completedText: {
    color: "#2E7D32",
    fontWeight: "bold",
    marginTop: 4,
  },

  lockedText: {
    color: "#777",
    fontSize: 13,
    marginTop: 4,
  },
});
