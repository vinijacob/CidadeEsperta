import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

import { getColors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ThemedText } from "./themed-text";

export function ProfileButton({ avatar = "🙂" }: { avatar?: string }) {
  const router = useRouter();
  const colors = getColors(useColorScheme());

  return (
    <Pressable
      accessibilityLabel="Abrir perfil"
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: colors.tintSoft, borderColor: colors.tint },
        pressed && styles.pressed,
      ]}
      onPress={() => router.push("/student/profile")}
    >
      <ThemedText style={styles.icon}>{avatar}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { opacity: 0.7 },
  icon: { fontSize: 22, lineHeight: 28 },
});
