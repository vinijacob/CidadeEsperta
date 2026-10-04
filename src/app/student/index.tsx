import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";

import { Button } from "@/components/Button";
import { DailyGoalCard } from "@/components/DailyGoalCard";
import { ProfileButton } from "@/components/ProfileButton";
import { ProgressBar } from "@/components/ProgressBar";
import { Screen } from "@/components/Screen";
import { StatTile } from "@/components/StatTile";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getColors, Radius } from "@/constants/theme";
import { lessons } from "@/data/lessons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Student } from "@/models/Student";
import { badges, getLevel } from "@/rules/lessonRules";
import { getCurrentStudent } from "@/services/authService";
import { isLessonUnlocked } from "@/services/progressService";

function greeting() {
  const hour = new Date().getHours();

  return hour < 12 ? "Bom dia" : hour < 18 ? "Boa tarde" : "Boa noite";
}

export default function StudentHomeScreen() {
  const router = useRouter();
  const colors = getColors(useColorScheme());

  const [student, setStudent] = useState<Student | null>(null);

  useFocusEffect(
    useCallback(() => {
      getCurrentStudent()
        .then((current) =>
          current ? setStudent(current) : router.replace("/login"),
        )
        .catch(() => router.replace("/login"));
    }, []),
  );

  if (!student) {
    return (
      <ThemedView style={styles.loading}>
        <ThemedText>Carregando...</ThemedText>
      </ThemedView>
    );
  }

  const nextIndex = lessons.findIndex(
    (lesson, index) =>
      !student.completedLessons.includes(lesson.id) &&
      isLessonUnlocked(student, index),
  );
  const nextLesson = nextIndex >= 0 ? lessons[nextIndex] : null;
  const progress = student.completedLessons.length / lessons.length;
  const level = getLevel(student.score);
  const earned = badges.filter((badge) => badge.earned(student)).length;

  return (
    <Screen>
      <ThemedView style={styles.header}>
        <ThemedView style={styles.headerText}>
          <ThemedText type="title">
            {greeting()}, {student.name}! 👋
          </ThemedText>
          <ThemedText style={{ color: colors.muted }}>
            Vamos construir uma cidade inteligente?
          </ThemedText>
        </ThemedView>

        <ProfileButton avatar={student.avatar} />
      </ThemedView>

      <ThemedView style={[styles.hero, { backgroundColor: colors.tint }]}>
        <ThemedText
          type="small"
          lightColor="#FFFFFF"
          darkColor={colors.background}
          style={styles.heroLabel}
        >
          {nextLesson ? "CONTINUE DE ONDE PAROU" : "PARABÉNS!"}
        </ThemedText>

        <ThemedText
          type="subtitle"
          lightColor="#FFFFFF"
          darkColor={colors.background}
        >
          {nextLesson ? nextLesson.title : "Você concluiu todas as aulas 🎉"}
        </ThemedText>

        {nextLesson && (
          <ThemedView style={styles.heroAction}>
            <Button
              title="Continuar ▶"
              variant="inverse"
              onPress={() => router.push(`/lesson/${nextLesson.id}`)}
            />
          </ThemedView>
        )}
      </ThemedView>

      <ThemedView style={styles.row}>
        <StatTile icon="🔥" value={student.streak ?? 0} label="Dias seguidos" />
        <StatTile icon="🏆" value={student.score} label="Pontos" />
        <StatTile icon="🎖️" value={`${earned}/${badges.length}`} label="Conquistas" />
      </ThemedView>

      <DailyGoalCard student={student} />

      <ThemedView
        type="backgroundElement"
        style={[styles.card, { borderColor: colors.border }]}
      >
        <ThemedView style={styles.cardRow}>
          <ThemedText type="subtitle">Nível {level.level}</ThemedText>
          <ThemedText type="small" style={{ color: colors.muted }}>
            {level.into}/{level.next} pts
          </ThemedText>
        </ThemedView>
        <ProgressBar progress={level.progress} />
      </ThemedView>

      <ThemedView
        type="backgroundElement"
        style={[styles.card, { borderColor: colors.border }]}
      >
        <ThemedView style={styles.cardRow}>
          <ThemedText type="subtitle">Progresso da cidade</ThemedText>
          <ThemedText type="small" style={{ color: colors.muted }}>
            {Math.round(progress * 100)}%
          </ThemedText>
        </ThemedView>
        <ProgressBar progress={progress} />
      </ThemedView>

      <ThemedView
        type="backgroundElement"
        style={[styles.card, { borderColor: colors.border }]}
      >
        <ThemedText type="subtitle">⚡ Revisão rápida</ThemedText>
        <ThemedText style={{ color: colors.muted }}>
          5 perguntas aleatórias das aulas liberadas. Cada acerto vale 5 pontos!
        </ThemedText>
        <Button
          variant="secondary"
          title="Treinar agora"
          onPress={() => router.push("/student/review")}
        />
      </ThemedView>

      <Button
        title="Ver todas as aulas"
        onPress={() => router.push("/student/lessons")}
      />
      <ThemedView style={styles.row}>
        <Button
          flex
          variant="secondary"
          title="Progresso"
          onPress={() => router.push("/student/progress")}
        />
        <Button
          flex
          variant="secondary"
          title="Conquistas"
          onPress={() => router.push("/student/achievements")}
        />
      </ThemedView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  headerText: { flex: 1, gap: 4 },
  hero: { borderRadius: Radius.large, padding: 20, gap: 10 },
  heroLabel: { fontWeight: "bold", letterSpacing: 1, opacity: 0.85 },
  heroAction: { alignSelf: "flex-start", backgroundColor: "transparent" },
  row: { flexDirection: "row", gap: 12, backgroundColor: "transparent" },
  card: {
    gap: 12,
    padding: 18,
    borderRadius: Radius.medium,
    borderWidth: 1,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
});
