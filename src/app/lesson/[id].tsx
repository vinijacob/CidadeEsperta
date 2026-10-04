import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";

import { Button } from "@/components/Button";
import { ProgressBar } from "@/components/ProgressBar";
import { ReturnButton } from "@/components/ReturnButton";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getColors, Radius } from "@/constants/theme";
import { lessons } from "@/data/lessons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { completeTopic } from "@/services/progressService";

export default function LessonScreen() {
  const router = useRouter();
  const colors = getColors(useColorScheme());

  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessons.find((item) => item.id === id);

  const [index, setIndex] = useState(0);

  if (!lesson) {
    return (
      <Screen>
        <ReturnButton />
        <ThemedText type="title">Aula não encontrada</ThemedText>
      </Screen>
    );
  }

  const topic = lesson.topics[index];
  const isLast = index === lesson.topics.length - 1;

  async function handleNext() {
    await completeTopic(topic.id);

    if (isLast) {
      router.push(`/exercises/${lesson!.id}`);
    } else {
      setIndex(index + 1);
    }
  }

  return (
    <Screen>
      <ReturnButton />

      <ThemedText style={styles.lessonTitle}>{lesson.title}</ThemedText>

      <ThemedView style={styles.progressRow}>
        <ThemedText type="small" style={{ color: colors.muted }}>
          Lição {index + 1} de {lesson.topics.length}
        </ThemedText>
        <ProgressBar progress={(index + 1) / lesson.topics.length} />
      </ThemedView>

      <ThemedView
        type="backgroundElement"
        style={[styles.card, { borderColor: colors.border }]}
      >
        <ThemedText type="subtitle" style={styles.topicTitle}>
          {topic.title}
        </ThemedText>

        <ThemedText style={styles.topicContent}>{topic.content}</ThemedText>

        {topic.pythonExample && (
          <ThemedView
            style={[styles.code, { backgroundColor: "#0D1117" }]}
          >
            <ThemedText
              type="small"
              style={styles.codeTitle}
              lightColor="#8B949E"
              darkColor="#8B949E"
            >
              🐍 EXEMPLO EM PYTHON
            </ThemedText>

            <ThemedText
              type="code"
              lightColor="#E6EDF3"
              darkColor="#E6EDF3"
              style={styles.codeText}
            >
              {topic.pythonExample}
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      <ThemedView style={styles.actions}>
        <Button
          flex
          variant="secondary"
          title="◀ Anterior"
          disabled={index === 0}
          onPress={() => setIndex(index - 1)}
        />
        <Button
          flex
          title={isLast ? "Exercícios ▶" : "Próxima ▶"}
          onPress={handleNext}
        />
      </ThemedView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  lessonTitle: { fontSize: 24, fontWeight: "bold", lineHeight: 30 },
  progressRow: { gap: 8, backgroundColor: "transparent" },
  card: {
    borderRadius: Radius.large,
    padding: 20,
    gap: 16,
    borderWidth: 1,
  },
  topicTitle: { fontSize: 22 },
  topicContent: { fontSize: 16, lineHeight: 26 },
  code: { borderRadius: Radius.small, padding: 16, gap: 10 },
  codeTitle: { fontWeight: "bold", letterSpacing: 1 },
  codeText: { lineHeight: 22 },
  actions: { flexDirection: "row", gap: 12, backgroundColor: "transparent" },
});
