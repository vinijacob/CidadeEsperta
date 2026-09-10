import { StyleSheet } from "react-native";

import { ThemedView } from "./themed-view";

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const safeProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <ThemedView style={styles.container}>
      <ThemedView
        style={[
          styles.progress,
          {
            width: `${safeProgress * 100}%`,
          },
        ]}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#DDD",
  },

  progress: {
    height: "100%",
    borderRadius: 10,
    backgroundColor: "#2E7D32",
  },
});
