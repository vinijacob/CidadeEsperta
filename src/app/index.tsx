import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

import { ThemedView } from "@/components/themed-view";
import { getCurrentStudent } from "@/services/authService";

export default function HomeScreen() {
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      async function checkLogin() {
        const student = await getCurrentStudent();

        if (student) {
          router.replace("/student/lessons");
        } else {
          router.replace("/login");
        }
      }

      checkLogin();
    }, []),
  );

  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator size="large" />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
