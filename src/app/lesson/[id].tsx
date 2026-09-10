import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";

import { ReturnButton } from "@/components/ReturnButton";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { lessons } from "@/data/lessons";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function LessonScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const { id } = useLocalSearchParams<{ id: string }>();

  const lesson = lessons.find((item) => item.id === id);

  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);

  if (!lesson) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title">Aula não encontrada</ThemedText>

        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: colors.tint,
            },
          ]}
          onPress={() => router.back()}
        >
          <ThemedText
            style={styles.buttonText}
            lightColor="#FFFFFF"
            darkColor="#FFFFFF"
          >
            Voltar
          </ThemedText>
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

  function handleBack() {
    if (currentTopicIndex !== 0) {
      setCurrentTopicIndex((currentIndex) => currentIndex - 1);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ReturnButton />
        <ThemedText style={styles.lessonTitle}>{lesson.title}</ThemedText>

        <ThemedText style={styles.progress}>
          Lição {currentTopicIndex + 1} de {lesson.topics.length}
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
          <ThemedText type="subtitle" style={styles.topicTitle}>
            {currentTopic.title}
          </ThemedText>

          <ThemedText style={styles.topicContent}>
            {currentTopic.content}
          </ThemedText>

          {currentTopic.pythonExample && (
            <ThemedView
              style={[
                styles.codeContainer,
                {
                  backgroundColor:
                    colorScheme === "dark" ? "#0D1117" : "#222222",
                },
              ]}
            >
              <ThemedText
                style={styles.codeTitle}
                lightColor="#FFFFFF"
                darkColor="#FFFFFF"
              >
                Exemplo em Python 🐍
              </ThemedText>

              <ThemedText
                style={styles.code}
                lightColor="#FFFFFF"
                darkColor="#FFFFFF"
              >
                {currentTopic.pythonExample}
              </ThemedText>
            </ThemedView>
          )}
        </ThemedView>

        <ThemedView style={styles.actionButtons}>
          <Pressable
            style={[
              styles.button,
              {
                backgroundColor: "#7A0A17",
              },
            ]}
            onPress={handleBack}
          >
            <ThemedText style={styles.buttonText}>Lição Anterior</ThemedText>
          </Pressable>
          <Pressable
            style={[
              styles.button,
              {
                backgroundColor: colors.tint,
              },
            ]}
            onPress={handleNext}
          >
            <ThemedText
              style={styles.buttonText}
              lightColor="#FFFFFF"
              darkColor="#FFFFFF"
            >
              {isLastTopic ? "Ir para os exercícios" : "Próxima lição"}
            </ThemedText>
          </Pressable>
        </ThemedView>
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
    borderWidth: 1,
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

  actionButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },

  button: {
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    padding: 15,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
