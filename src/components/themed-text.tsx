import { StyleSheet, Text, type TextProps } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "subtitle" | "small" | "code";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const colorScheme = useColorScheme();

  const color =
    colorScheme === "dark"
      ? (darkColor ?? Colors.dark.text)
      : (lightColor ?? Colors.light.text);

  return (
    <Text
      style={[
        { color },

        type === "default" && styles.default,
        type === "title" && styles.title,
        type === "subtitle" && styles.subtitle,
        type === "small" && styles.small,
        type === "code" && styles.code,

        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 38,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 26,
  },

  small: {
    fontSize: 13,
    lineHeight: 18,
  },

  code: {
    fontFamily: "monospace",
    fontSize: 14,
  },
});
