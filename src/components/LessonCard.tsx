import { Pressable, StyleSheet, View } from "react-native";

import { getColors, Radius } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Lesson } from "@/models/Lesson";
import { ProgressBar } from "./ProgressBar";
import { ThemedText } from "./themed-text";

interface LessonCardProps {
  lesson: Lesson;
  unlocked: boolean;
  completed: boolean;
  progress?: number;
  onPress: () => void;
}

export function LessonCard({
  lesson,
  unlocked,
  completed,
  progress = 0,
  onPress,
}: LessonCardProps) {
  const colors = getColors(useColorScheme());

  const number = lesson.id.replace("lesson-", "");

  return (
    <Pressable
      onPress={onPress}
      disabled={!unlocked}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: completed ? colors.success : unlocked ? colors.tint : colors.border,
        },
        !unlocked && styles.locked,
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.badge,
          {
            backgroundColor: completed
              ? colors.success
              : unlocked
                ? colors.tintSoft
                : colors.track,
          },
        ]}
      >
        <ThemedText
          style={styles.badgeText}
          lightColor={completed ? "#FFFFFF" : colors.text}
          darkColor={completed ? colors.background : colors.text}
        >
          {completed ? "✓" : unlocked ? number : "🔒"}
        </ThemedText>
      </View>

      <View style={styles.body}>
        <ThemedText type="subtitle" style={styles.title}>
          {lesson.title}
        </ThemedText>

        <ThemedText style={[styles.description, { color: colors.muted }]}>
          {lesson.description}
        </ThemedText>

        <ThemedText type="small" style={{ color: colors.muted }}>
          {lesson.topics.length} lições • {lesson.exercises.length} exercícios
        </ThemedText>

        {unlocked && !completed && progress > 0 && (
          <ProgressBar progress={progress} height={8} />
        )}

        {completed && (
          <ThemedText type="small" style={[styles.bold, { color: colors.success }]}>
            Aula concluída!
          </ThemedText>
        )}

        {!unlocked && (
          <ThemedText type="small" style={{ color: colors.muted }}>
            Complete a aula anterior para desbloquear.
          </ThemedText>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: 14,
    borderWidth: 1.5,
    borderRadius: Radius.medium,
    padding: 16,
  },
  locked: { opacity: 0.55 },
  pressed: { opacity: 0.75 },
  badge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { fontWeight: "bold", fontSize: 18, lineHeight: 24 },
  body: { flex: 1, gap: 6 },
  title: { fontSize: 18 },
  description: { lineHeight: 20, fontSize: 14 },
  bold: { fontWeight: "bold" },
});
