import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";

import { ProgressBar } from "@/components/ProgressBar";
import { ReturnButton } from "@/components/ReturnButton";
import { Screen } from "@/components/Screen";
import { StatTile } from "@/components/StatTile";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getColors, Radius } from "@/constants/theme";
import { lessons } from "@/data/lessons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Student } from "@/models/Student";
import { getLevel } from "@/rules/lessonRules";
import { getCurrentStudent } from "@/services/authService";
import { getLessonProgress } from "@/services/progressService";

export default function ProgressScreen() {
  const colors = getColors(useColorScheme());

  const [student, setStudent] = useState<Student | null>(null);

  useFocusEffect(
    useCallback(() => {
      getCurrentStudent().then(setStudent);
    }, []),
  );

  if (!student) {
    return (
      <ThemedView style={styles.loading}>
        <ThemedText>Carregando progresso...</ThemedText>
      </ThemedView>
    );
  }

  const totalTopics = lessons.reduce((sum, l) => sum + l.topics.length, 0);
  const totalExercises = lessons.reduce((sum, l) => sum + l.exercises.length, 0);
  const level = getLevel(student.score);

  return (
    <Screen>
      <ReturnButton />
      <ThemedText type="title">Meu progresso</ThemedText>
      <ThemedText style={{ color: colors.muted }}>
        Continue aprendendo, {student.name}!
      </ThemedText>

      <ThemedView style={styles.row}>
        <StatTile icon="🔥" value={student.streak ?? 0} label="Sequência" />
        <StatTile icon="⚡" value={student.bestStreak ?? 0} label="Recorde" />
        <StatTile icon="⭐" value={level.level} label="Nível" />
      </ThemedView>

      <ThemedView
        style={[
          styles.card,
          { backgroundColor: colors.warningSoft, borderColor: colors.warning },
        ]}
      >
        <ThemedText type="subtitle" lightColor={colors.warning} darkColor={colors.warning}>
          Pontuação 🏆
        </ThemedText>
        <ThemedText style={styles.score} lightColor={colors.warning} darkColor={colors.warning}>
          {student.score} pontos
        </ThemedText>
      </ThemedView>

      {[
        { title: "Aulas", done: student.completedLessons.length, total: lessons.length },
        { title: "Lições", done: student.completedTopics.length, total: totalTopics },
        { title: "Exercícios", done: student.completedExercises.length, total: totalExercises },
      ].map((item) => (
        <ThemedView
          key={item.title}
          type="backgroundElement"
          style={[styles.card, { borderColor: colors.border }]}
        >
          <ThemedView style={styles.cardRow}>
            <ThemedText type="subtitle">{item.title}</ThemedText>
            <ThemedText style={styles.number}>
              {item.done} / {item.total}
            </ThemedText>
          </ThemedView>
          <ProgressBar progress={item.total ? item.done / item.total : 0} />
        </ThemedView>
      ))}

      <ThemedText type="subtitle" style={styles.section}>
        Por aula
      </ThemedText>

      {lessons.map((lesson) => {
        const value = student.completedLessons.includes(lesson.id)
          ? 1
          : getLessonProgress(student, lesson);

        return (
          <ThemedView key={lesson.id} style={styles.lessonRow}>
            <ThemedView style={styles.cardRow}>
              <ThemedText type="small" numberOfLines={1} style={styles.flex}>
                {lesson.title}
              </ThemedText>
              <ThemedText type="small" style={{ color: colors.muted }}>
                {Math.round(value * 100)}%
              </ThemedText>
            </ThemedView>
            <ProgressBar progress={value} height={8} />
          </ThemedView>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  row: { flexDirection: "row", gap: 12, backgroundColor: "transparent" },
  card: { padding: 18, borderRadius: Radius.medium, gap: 12, borderWidth: 1 },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    backgroundColor: "transparent",
  },
  flex: { flex: 1 },
  number: { fontSize: 20, fontWeight: "bold" },
  score: { fontSize: 26, fontWeight: "bold", lineHeight: 32 },
  section: { marginTop: 8 },
  lessonRow: { gap: 6, backgroundColor: "transparent" },
});
