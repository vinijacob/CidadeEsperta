import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import { ThemedText } from "./themed-text";

export function ProfileButton() {
  const router = useRouter();

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={() => router.push("/student/profile")}
    >
      <ThemedText style={styles.icon}>👤</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E7D32",
  },

  pressed: {
    opacity: 0.7,
  },

  icon: {
    fontSize: 22,
  },
});
