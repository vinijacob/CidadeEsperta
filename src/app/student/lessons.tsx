import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";

import { LessonCard } from "@/components/LessonCard";
import { ProfileButton } from "@/components/ProfileButton";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { DEV_UNLOCK_ALL } from "@/config/appConfig";
import { Colors } from "@/constants/theme";
import { lessons } from "@/data/lessons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Student } from "@/models/Student";
import { getCurrentStudent } from "@/services/authService";
import { isLessonUnlocked } from "@/services/progressService";

export default function LessonsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const [student, setStudent] = useState<Student | null>(null);

  const [loading, setLoading] = useState(true);

  async function loadStudent() {
    try {
      const currentStudent = await getCurrentStudent();

      if (!currentStudent) {
        router.replace("/login");
        return;
      }

      setStudent(currentStudent);
    } catch (error) {
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadStudent();
    }, []),
  );

  if (loading || !student) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>Carregando aulas...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.header}>
          <ThemedText type="title">Aulas</ThemedText>

          <ProfileButton />
        </ThemedView>

        <ThemedText style={styles.subtitle}>
          Aprenda programação passo a passo construindo uma cidade inteligente.
        </ThemedText>

        {lessons.map((lesson, index) => {
          const unlocked = DEV_UNLOCK_ALL || isLessonUnlocked(student, index);

          const completed = student.completedLessons.includes(lesson.id);

          return (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              unlocked={unlocked}
              completed={completed}
              onPress={() => {
                if (unlocked) {
                  router.push(`/lesson/${lesson.id}`);
                }
              }}
            />
          );
        })}

        <Pressable
          style={[
            styles.progressButton,
            {
              borderColor: colors.tint,
            },
          ]}
          onPress={() => router.push("/student/progress")}
        >
          <ThemedText
            style={styles.progressButtonText}
            lightColor={Colors.light.tint}
            darkColor={Colors.dark.tint}
          >
            Ver meu progresso
          </ThemedText>
        </Pressable>
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
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    gap: 16,
    padding: 20,
    paddingTop: 80,
    paddingBottom: 30,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },

  subtitle: {
    marginBottom: 8,
  },

  progressButton: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },

  progressButtonText: {
    fontWeight: "bold",
  },
});
