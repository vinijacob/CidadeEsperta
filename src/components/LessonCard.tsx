import { Pressable, StyleSheet } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
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
  const colorScheme = useColorScheme();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <Pressable
      onPress={onPress}
      disabled={!unlocked}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: unlocked ? colors.tint : colors.border,
        },
        !unlocked && styles.lockedCard,
        pressed && unlocked && styles.pressedCard,
      ]}
    >
      <ThemedView
        style={styles.content}
        type="backgroundElement"
        lightColor={Colors.light.card}
        darkColor={Colors.dark.card}
      >
        <ThemedView
          style={styles.textContainer}
          type="backgroundElement"
          lightColor={Colors.light.card}
          darkColor={Colors.dark.card}
        >
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
            <ThemedText
              style={[
                styles.completedText,
                {
                  color: colors.tint,
                },
              ]}
            >
              Aula concluída!
            </ThemedText>
          )}

          {!unlocked && (
            <ThemedText
              style={[
                styles.lockedText,
                {
                  color: colors.muted,
                },
              ]}
            >
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
    borderRadius: 12,
    padding: 16,
  },

  lockedCard: {
    opacity: 0.5,
  },

  pressedCard: {
    opacity: 0.7,
  },

  content: {
    flexDirection: "row",
    gap: 14,
  },

  textContainer: {
    flex: 1,
    gap: 6,
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
    fontWeight: "bold",
    marginTop: 4,
  },

  lockedText: {
    fontSize: 13,
    marginTop: 4,
  },
});
