import { ActivityIndicator, Pressable, StyleSheet } from "react-native";

import { getColors, Radius } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ThemedText } from "./themed-text";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost" | "inverse";
  disabled?: boolean;
  loading?: boolean;
  flex?: boolean;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  flex = false,
}: ButtonProps) {
  const colors = getColors(useColorScheme());

  const isFilled = variant === "primary" || variant === "danger";
  const fill = variant === "danger" ? colors.danger : colors.tint;
  const textColor =
    variant === "primary"
      ? colors.background
      : variant === "danger"
        ? "#FFFFFF"
        : variant === "ghost"
          ? colors.muted
          : variant === "inverse"
            ? colors.success
            : colors.tint;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.button,
        flex && styles.flex,
        isFilled && { backgroundColor: disabled ? colors.track : fill },
        variant === "inverse" && { backgroundColor: "#FFFFFF" },
        variant === "secondary" && {
          borderWidth: 1.5,
          borderColor: colors.tint,
        },
        (disabled || loading) && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <ThemedText
          style={styles.text}
          lightColor={textColor}
          darkColor={textColor}
        >
          {title}
        </ThemedText>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: Radius.medium,
    paddingHorizontal: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  flex: { flex: 1 },
  disabled: { opacity: 0.55 },
  pressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  text: { fontWeight: "bold", fontSize: 16, textAlign: "center" },
});
