import { ScrollView, StyleSheet, type ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MaxContentWidth } from "@/constants/theme";
import { ThemedView } from "./themed-view";

interface ScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  contentStyle?: ViewStyle;
}

export function Screen({ children, scroll = true, contentStyle }: ScreenProps) {
  const insets = useSafeAreaInsets();

  const padding = {
    paddingTop: insets.top + 16,
    paddingBottom: insets.bottom + 24,
  };

  return (
    <ThemedView style={styles.root}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={[
            styles.content,
            padding,
            contentStyle,
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <ThemedView style={[styles.content, styles.fill, padding, contentStyle]}>
          {children}
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  fill: { flex: 1 },
  content: {
    width: "100%",
    maxWidth: MaxContentWidth,
    alignSelf: "center",
    paddingHorizontal: 20,
    gap: 16,
  },
});
