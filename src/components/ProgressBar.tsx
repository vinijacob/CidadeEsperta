import { StyleSheet, View } from "react-native";

import { getColors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

interface ProgressBarProps {
  progress: number;
  height?: number;
}

export function ProgressBar({ progress, height = 12 }: ProgressBarProps) {
  const colors = getColors(useColorScheme());

  const safeProgress = Math.min(Math.max(progress, 0), 1);

  return (
    <View
      style={[
        styles.container,
        { height, backgroundColor: colors.track, borderRadius: height },
      ]}
    >
      <View
        style={{
          width: `${safeProgress * 100}%`,
          height: "100%",
          borderRadius: height,
          backgroundColor: colors.tint,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
});
