import { View, type ViewProps } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "background" | "backgroundElement";
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  type = "background",
  ...rest
}: ThemedViewProps) {
  const colorScheme = useColorScheme();

  const backgroundColor =
    colorScheme === "dark"
      ? (darkColor ??
        (type === "background" ? Colors.dark.background : Colors.dark.card))
      : (lightColor ??
        (type === "background" ? Colors.light.background : Colors.light.card));

  return (
    <View
      style={[
        {
          backgroundColor,
        },
        style,
      ]}
      {...rest}
    />
  );
}
