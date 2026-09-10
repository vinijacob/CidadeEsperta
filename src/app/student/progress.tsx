import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import { ProgressBar } from "@/components/ProgressBar";
import { ReturnButton } from "@/components/ReturnButton";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { lessons } from "@/data/lessons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Student } from "@/models/Student";
import { getCurrentStudent } from "@/services/authService";

export default function ProgressScreen() {
  const colorScheme = useColorScheme();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadProgress() {
    try {
      const currentStudent = await getCurrentStudent();

      setStudent(currentStudent);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadProgress();
    }, []),
  );

  if (loading || !student) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>Carregando progresso...</ThemedText>
      </ThemedView>
    );
  }

  const totalLessons = lessons.length;

  const completedLessons = student.completedLessons.length;

  const totalTopics = lessons.reduce(
    (total, lesson) => total + lesson.topics.length,
    0,
  );

  const totalExercises = lessons.reduce(
    (total, lesson) => total + lesson.exercises.length,
    0,
  );

  const completedExercises = student.completedExercises.length;

  const lessonProgress =
    totalLessons === 0 ? 0 : completedLessons / totalLessons;

  const exerciseProgress =
    totalExercises === 0 ? 0 : completedExercises / totalExercises;

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ReturnButton />
        <ThemedText type="title">Meu progresso</ThemedText>

        <ThemedText style={styles.greeting}>
          Continue aprendendo, {student.name}!
        </ThemedText>

        <ThemedView
          type="backgroundElement"
          style={[
            styles.card,
            {
              borderColor: colors.border,
            },
          ]}
        >
          <ThemedText type="subtitle">Aulas</ThemedText>

          <ThemedText style={styles.number}>
            {completedLessons} / {totalLessons}
          </ThemedText>

          <ProgressBar progress={lessonProgress} />
        </ThemedView>

        <ThemedView
          type="backgroundElement"
          style={[
            styles.card,
            {
              borderColor: colors.border,
            },
          ]}
        >
          <ThemedText type="subtitle">Lições</ThemedText>

          <ThemedText style={styles.number}>
            {student.completedTopics.length} / {totalTopics}
          </ThemedText>
        </ThemedView>

        <ThemedView
          type="backgroundElement"
          style={[
            styles.card,
            {
              borderColor: colors.border,
            },
          ]}
        >
          <ThemedText type="subtitle">Exercícios</ThemedText>

          <ThemedText style={styles.number}>
            {completedExercises} / {totalExercises}
          </ThemedText>

          <ProgressBar progress={exerciseProgress} />
        </ThemedView>

        <ThemedView
          style={[
            styles.scoreCard,
            {
              backgroundColor: colorScheme === "dark" ? "#332B16" : "#FFF3CD",

              borderColor: colorScheme === "dark" ? "#665722" : "#F0D98C",
            },
          ]}
        >
          <ThemedText type="subtitle" lightColor="#6B5700" darkColor="#FFE082">
            Pontuação 🏆
          </ThemedText>

          <ThemedText
            style={styles.score}
            lightColor="#6B5700"
            darkColor="#FFE082"
          >
            {student.score} pontos
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    gap: 16,
    padding: 20,
    paddingTop: 80,
    paddingBottom: 30,
  },

  greeting: {
    marginBottom: 8,
  },

  card: {
    padding: 20,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
  },

  scoreCard: {
    padding: 20,
    borderRadius: 12,
    gap: 10,
    borderWidth: 1,
  },

  number: {
    fontSize: 24,
    fontWeight: "bold",
  },

  score: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
