import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getCurrentStudent } from "@/services/authService";

export default function StudentHomeScreen() {
  const router = useRouter();

  const [studentName, setStudentName] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadStudent() {
    try {
      const student = await getCurrentStudent();

      if (!student) {
        router.replace("/login");
        return;
      }

      setStudentName(student.name);
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

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Carregando...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Olá, {studentName}! 👋
      </ThemedText>

      <ThemedText style={styles.subtitle}>
        Vamos aprender a construir uma cidade inteligente?
      </ThemedText>

      <Pressable
        style={styles.primaryButton}
        onPress={() => router.push("/student/lessons")}
      >
        <ThemedText style={styles.buttonText}>Começar a aprender</ThemedText>
      </Pressable>

      <Pressable
        style={styles.secondaryButton}
        onPress={() => router.push("/student/progress")}
      >
        <ThemedText style={styles.secondaryButtonText}>
          Meu progresso
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 16,
  },

  title: {
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 24,
  },

  primaryButton: {
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E7D32",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  secondaryButton: {
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2E7D32",
  },

  secondaryButtonText: {
    color: "#2E7D32",
    fontWeight: "bold",
  },
});
