import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet } from "react-native";

import { ExerciseCard } from "@/components/ExerciseCard";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { lessons } from "@/data/lessons";
import { completeExercise, completeLesson } from "@/services/progressService";

export default function ExercisesScreen() {
  const router = useRouter();

  const { id } = useLocalSearchParams<{ id: string }>();

  const lesson = lessons.find((item) => item.id === id);

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

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

  const currentExercise = lesson.exercises[currentExerciseIndex];

  function handleAnswer(answerIndex: number) {
    if (answered) {
      return;
    }

    setSelectedAnswer(answerIndex);
  }

  async function handleConfirmAnswer() {
    if (selectedAnswer === null) {
      Alert.alert("Atenção", "Escolha uma resposta antes de confirmar.");

      return;
    }

    if (answered) {
      return;
    }

    setAnswered(true);

    const isCorrect = selectedAnswer === currentExercise.correctAnswer;

    if (isCorrect) {
      setScore((currentScore) => currentScore + 10);

      await completeExercise(currentExercise.id, 10);
    } else {
      await completeExercise(currentExercise.id, 0);
    }
  }

  async function handleNext() {
    const isLastExercise =
      currentExerciseIndex === lesson!.exercises.length - 1;

    if (isLastExercise) {
      await completeLesson(lesson!.id);

      setFinished(true);

      return;
    }

    setCurrentExerciseIndex((currentIndex) => currentIndex + 1);

    setSelectedAnswer(null);
    setAnswered(false);
  }

  if (finished) {
    return (
      <ThemedView style={styles.container}>
        <ThemedView style={styles.result}>
          <ThemedText type="title" style={styles.resultTitle}>
            Aula concluída! 🎉
          </ThemedText>

          <ThemedText style={styles.resultText}>
            Você terminou os exercícios.
          </ThemedText>

          <ThemedText style={styles.score}>
            Pontuação: {score} pontos
          </ThemedText>

          <Pressable
            style={styles.button}
            onPress={() => router.replace("/student/lessons")}
          >
            <ThemedText style={styles.buttonText}>
              Voltar para as aulas
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title">Exercícios</ThemedText>

        <ThemedText style={styles.lessonTitle}>{lesson.title}</ThemedText>

        <ThemedText style={styles.progress}>
          Exercício {currentExerciseIndex + 1} de {lesson.exercises.length}
        </ThemedText>

        <ExerciseCard
          exercise={currentExercise}
          selectedAnswer={selectedAnswer}
          answered={answered}
          onSelectAnswer={handleAnswer}
        />

        <Pressable
          style={[
            styles.button,
            selectedAnswer === null && styles.disabledButton,
          ]}
          onPress={answered ? handleNext : handleConfirmAnswer}
          disabled={selectedAnswer === null}
        >
          <ThemedText style={styles.buttonText}>
            {answered
              ? currentExerciseIndex === lesson.exercises.length - 1
                ? "Finalizar aula"
                : "Próximo exercício"
              : "Confirmar resposta"}
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
    fontSize: 18,
    fontWeight: "600",
  },

  progress: {
    opacity: 0.7,
  },

  button: {
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E7D32",
    marginTop: 8,
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    padding: 10,
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  result: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
    backgroundColor: "transparent",
  },

  resultTitle: {
    textAlign: "center",
  },

  resultText: {
    textAlign: "center",
  },

  score: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
