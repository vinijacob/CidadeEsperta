import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";

import { LessonCard } from "@/components/LessonCard";
import { ProfileButton } from "@/components/ProfileButton";
import { ProgressBar } from "@/components/ProgressBar";
import { ReturnButton } from "@/components/ReturnButton";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { DEV_UNLOCK_ALL } from "@/config/appConfig";
import { getColors, Radius } from "@/constants/theme";
import { lessons } from "@/data/lessons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Student } from "@/models/Student";
import { getCurrentStudent } from "@/services/authService";
import { getLessonProgress, isLessonUnlocked } from "@/services/progressService";

export default function LessonsScreen() {
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
        <ThemedText>Carregando aulas...</ThemedText>
      </ThemedView>
    );
  }

  const done = student.completedLessons.length;

  return (
    <Screen>
      <ThemedView style={styles.header}>
        <ReturnButton />
        <ProfileButton avatar={student.avatar} />
      </ThemedView>

      <ThemedText type="title">Aulas</ThemedText>

      <ThemedView
        type="backgroundElement"
        style={[styles.summary, { borderColor: colors.border }]}
      >
        <ThemedText>
          {done} de {lessons.length} aulas concluídas
        </ThemedText>
        <ProgressBar progress={done / lessons.length} />
      </ThemedView>

      {lessons.map((lesson, index) => {
        const unlocked = DEV_UNLOCK_ALL || isLessonUnlocked(student, index);

        return (
          <LessonCard
            key={lesson.id}
            lesson={lesson}
            unlocked={unlocked}
            completed={student.completedLessons.includes(lesson.id)}
            progress={getLessonProgress(student, lesson)}
            onPress={() => unlocked && router.push(`/lesson/${lesson.id}`)}
          />
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  summary: {
    gap: 10,
    padding: 16,
    borderRadius: Radius.medium,
    borderWidth: 1,
  },
});
