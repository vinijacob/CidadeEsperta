import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
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
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Answer, Exercise } from "@/models/Exercise";
import { getCurrentStudent } from "@/services/authService";
import { addBonusPoints, isLessonUnlocked } from "@/services/progressService";

const QUESTIONS = 5;
const POINTS = 5;

function shuffle<T>(items: T[]): T[] {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export default function ReviewScreen() {
  const router = useRouter();
  const colors = getColors(useColorScheme());

  const [questions, setQuestions] = useState<Exercise[] | null>(null);
  const [position, setPosition] = useState(0);
  const [selected, setSelected] = useState<Answer>(null);
  const [answered, setAnswered] = useState(false);
  const [hits, setHits] = useState(0);
  const [finished, setFinished] = useState(false);

  function start() {
    getCurrentStudent().then((student) => {
      if (!student) {
        router.replace("/login");
        return;
      }

      const pool = lessons
        .filter((lesson, index) => isLessonUnlocked(student, index))
        .flatMap((lesson) => lesson.exercises);

      setQuestions(shuffle(pool).slice(0, QUESTIONS));
      setPosition(0);
      setSelected(null);
      setAnswered(false);
      setHits(0);
      setFinished(false);
    });
  }

  useFocusEffect(useCallback(start, []));

  if (!questions) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText>Preparando revisão...</ThemedText>
      </ThemedView>
    );
  }

  const exercise = questions[position];
  const isLast = position === questions.length - 1;

  function handleConfirm() {
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
      setHits((count) => count + 1);
    }
  }

  async function handleNext() {
    if (isLast) {
      await addBonusPoints(hits * POINTS);
      setFinished(true);
      return;
    }

    setPosition(position + 1);
    setSelected(null);
    setAnswered(false);
  }

  if (finished) {
    return (
      <Screen scroll={false} contentStyle={styles.result}>
        <ThemedText style={styles.emoji}>{hits >= 4 ? "🏅" : "💪"}</ThemedText>
        <ThemedText type="title" style={styles.centerText}>
          Revisão concluída!
        </ThemedText>
        <ThemedText style={[styles.centerText, { color: colors.muted }]}>
          Você acertou {hits} de {questions.length}.
        </ThemedText>
        <ThemedText style={styles.score}>+{hits * POINTS} pontos</ThemedText>

        <ThemedView style={styles.actions}>
          <Button title="Nova revisão" onPress={start} />
          <Button
            variant="secondary"
            title="Voltar ao início"
            onPress={() => router.replace("/student")}
          />
        </ThemedView>
      </Screen>
    );
  }

  return (
    <Screen>
      <ReturnButton />

      <ThemedText type="title">Revisão rápida</ThemedText>

      <ThemedView style={styles.progress}>
        <ThemedText type="small" style={{ color: colors.muted }}>
          Pergunta {position + 1} de {questions.length} • +{POINTS} pts por acerto
        </ThemedText>
        <ProgressBar progress={position / questions.length} />
      </ThemedView>

      <ExercisePlayer
        key={position}
        exercise={exercise}
        answer={selected}
        answered={answered}
        points={POINTS}
        onChange={setSelected}
      />

      <Button
        title={
          answered
            ? isLast
              ? "Finalizar"
              : "Próxima pergunta"
            : "Confirmar resposta"
        }
        disabled={selected === null}
        onPress={answered ? handleNext : handleConfirm}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  centerText: { textAlign: "center" },
  progress: { gap: 8, backgroundColor: "transparent" },
  result: { justifyContent: "center", alignItems: "center", gap: 14 },
  emoji: { fontSize: 56, lineHeight: 70 },
  score: { fontSize: 24, fontWeight: "bold" },
  actions: {
    alignSelf: "stretch",
    gap: 12,
    marginTop: 12,
    backgroundColor: "transparent",
  },
});
