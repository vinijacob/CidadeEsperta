import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import * as Haptics from "expo-haptics";
import { StyleSheet } from "react-native";

import { Button } from "@/components/Button";
import { ExercisePlayer } from "@/components/ExercisePlayer";
import { ProgressBar } from "@/components/ProgressBar";
import { ReturnButton } from "@/components/ReturnButton";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getColors } from "@/constants/theme";
import { isAnswerCorrect } from "@/rules/exerciseRules";
import { lessons } from "@/data/lessons";
import { Answer } from "@/models/Exercise";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { completeExercise, completeLesson } from "@/services/progressService";

const POINTS = 10;

export default function ExercisesScreen() {
  const router = useRouter();
  const colors = getColors(useColorScheme());

  const { id } = useLocalSearchParams<{ id: string }>();
  const lesson = lessons.find((item) => item.id === id);

  // Fila de exercícios: os erros voltam ao final para serem revisados.
  const [queue, setQueue] = useState<number[]>(
    () => lesson?.exercises.map((_, i) => i) ?? [],
  );
  const [position, setPosition] = useState(0);
  const [selected, setSelected] = useState<Answer>(null);
  const [answered, setAnswered] = useState(false);
  const [correctFirstTry, setCorrectFirstTry] = useState(0);
  const [retried, setRetried] = useState<number[]>([]);
  const [finished, setFinished] = useState(false);

  if (!lesson) {
    return (
      <Screen>
        <ReturnButton />
        <ThemedText type="title">Aula não encontrada</ThemedText>
      </Screen>
    );
  }

  const total = lesson.exercises.length;
  const exerciseIndex = queue[position];
  const exercise = lesson.exercises[exerciseIndex];
  const isReview = retried.includes(exerciseIndex);
  const isLast = position === queue.length - 1;

  async function handleConfirm() {
    if (selected === null || answered) {
      return;
    }

    setAnswered(true);

    Haptics.notificationAsync(
      isAnswerCorrect(exercise, selected)
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Error,
    ).catch(() => {});

    if (isAnswerCorrect(exercise, selected)) {
      if (!isReview) {
        setCorrectFirstTry((count) => count + 1);
      }

      await completeExercise(exercise.id, isReview ? 0 : POINTS, true);
    } else {
      // Erros voltam ao final da fila (uma vez) para revisão.
      if (!isReview) {
        setQueue((current) => [...current, exerciseIndex]);
        setRetried((current) => [...current, exerciseIndex]);
      }

      await completeExercise(exercise.id, 0, false);
    }
  }

  async function handleNext() {
    const wrongNow = !isAnswerCorrect(exercise, selected) && !isReview;
    const nothingLeft = isLast && !wrongNow;

    if (nothingLeft) {
      await completeLesson(lesson!.id);
      setFinished(true);
      return;
    }

    setPosition(position + 1);
    setSelected(null);
    setAnswered(false);
  }

  if (finished) {
    const stars =
      correctFirstTry === total ? "⭐⭐⭐" : correctFirstTry >= total / 2 ? "⭐⭐" : "⭐";

    return (
      <Screen scroll={false} contentStyle={styles.result}>
        <ThemedText style={styles.stars}>{stars}</ThemedText>
        <ThemedText type="title" style={styles.center}>
          Aula concluída! 🎉
        </ThemedText>
        <ThemedText style={[styles.center, { color: colors.muted }]}>
          Você acertou {correctFirstTry} de {total} de primeira.
        </ThemedText>
        <ThemedText style={styles.score}>
          +{correctFirstTry * POINTS} pontos
        </ThemedText>

        <ThemedView style={styles.actions}>
          <Button
            title="Voltar para as aulas"
            onPress={() => router.replace("/student/lessons")}
          />
          <Button
            variant="secondary"
            title="Refazer lição"
            onPress={() => router.replace(`/lesson/${lesson.id}`)}
          />
        </ThemedView>
      </Screen>
    );
  }

  return (
    <Screen>
      <ReturnButton />

      <ThemedText type="title">Exercícios</ThemedText>
      <ThemedText style={styles.lessonTitle}>{lesson.title}</ThemedText>

      <ThemedView style={styles.progressRow}>
        <ThemedText type="small" style={{ color: colors.muted }}>
          {isReview ? "🔁 Revisão • " : ""}
          Exercício {position + 1} de {queue.length}
        </ThemedText>
        <ProgressBar progress={position / queue.length} />
      </ThemedView>

      <ExercisePlayer
        key={position}
        exercise={exercise}
        answer={selected}
        answered={answered}
        onChange={setSelected}
      />

      <Button
        title={
          answered
            ? isLast && isAnswerCorrect(exercise, selected)
              ? "Finalizar aula"
              : "Próximo exercício"
            : "Confirmar resposta"
        }
        disabled={selected === null}
        onPress={answered ? handleNext : handleConfirm}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  lessonTitle: { fontSize: 18, fontWeight: "600" },
  progressRow: { gap: 8, backgroundColor: "transparent" },
  result: { justifyContent: "center", alignItems: "center", gap: 14 },
  center: { textAlign: "center" },
  stars: { fontSize: 56, lineHeight: 70 },
  score: { fontSize: 24, fontWeight: "bold" },
  actions: {
    alignSelf: "stretch",
    gap: 12,
    marginTop: 12,
    backgroundColor: "transparent",
  },
});
