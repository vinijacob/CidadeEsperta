import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { getCurrentStudent } from "@/services/authService";

export default function StudentHomeScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

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
        style={[
          styles.primaryButton,
          {
            backgroundColor: colors.tint,
          },
        ]}
        onPress={() => router.push("/student/lessons")}
      >
        <ThemedText
          style={styles.buttonText}
          lightColor="#FFFFFF"
          darkColor="#FFFFFF"
        >
          Começar a aprender
        </ThemedText>
      </Pressable>

      <Pressable
        style={[
          styles.secondaryButton,
          {
            borderColor: colors.tint,
          },
        ]}
        onPress={() => router.push("/student/progress")}
      >
        <ThemedText
          style={styles.secondaryButtonText}
          lightColor={Colors.light.tint}
          darkColor={Colors.dark.tint}
        >
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
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  secondaryButton: {
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },

  secondaryButtonText: {
    fontWeight: "bold",
  },
});
