import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { lessons } from "@/data/lessons";

export default function LessonScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const lesson = lessons.find((item) => item.id === id);

  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);

  if (!lesson) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Aula não encontrada</ThemedText>

        <Pressable style={styles.button} onPress={() => router.back()}>
          <ThemedText style={styles.buttonText}>Voltar</ThemedText>
        </Pressable>
      </ThemedView>
    );
  }

  const currentTopic = lesson.topics[currentTopicIndex];

  const isLastTopic = currentTopicIndex === lesson.topics.length - 1;

  function handleNext() {
    if (!isLastTopic) {
      setCurrentTopicIndex((currentIndex) => currentIndex + 1);
      return;
    }

    router.push(`/exercises/${lesson?.id}`);
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText style={styles.lessonTitle}>{lesson.title}</ThemedText>

        <ThemedText style={styles.progress}>
          Lição {currentTopicIndex + 1} de {lesson.topics.length}
        </ThemedText>

        <ThemedView style={styles.card}>
          <ThemedText type="subtitle" style={styles.topicTitle}>
            {currentTopic.title}
          </ThemedText>

          <ThemedText style={styles.topicContent}>
            {currentTopic.content}
          </ThemedText>

          {currentTopic.pythonExample && (
            <ThemedView style={styles.codeContainer}>
              <ThemedText style={styles.codeTitle}>
                Exemplo em Python 🐍
              </ThemedText>

              <ThemedText style={styles.code}>
                {currentTopic.pythonExample}
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>

        <Pressable style={styles.button} onPress={handleNext}>
          <ThemedText style={styles.buttonText}>
            {isLastTopic ? "Ir para os exercícios" : "Próxima lição"}
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

  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    gap: 16,
  },

  lessonTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },

  progress: {
    opacity: 0.7,
  },

  card: {
    borderRadius: 12,
    padding: 20,
    gap: 16,
    backgroundColor: "#F5F5F5",
  },

  topicTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },

  topicContent: {
    fontSize: 16,
    lineHeight: 25,
  },

  codeContainer: {
    borderRadius: 10,
    padding: 16,
    backgroundColor: "#222",
    gap: 10,
  },

  codeTitle: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  code: {
    color: "#FFFFFF",
    fontFamily: "monospace",
    lineHeight: 22,
  },

  button: {
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E7D32",
    marginTop: 8,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
