import { StyleSheet } from "react-native";

import { getColors, Radius } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface StatTileProps {
  icon: string;
  value: string | number;
  label: string;
}

export function StatTile({ icon, value, label }: StatTileProps) {
  const colors = getColors(useColorScheme());

  return (
    <ThemedView
      type="backgroundElement"
      style={[styles.tile, { borderColor: colors.border }]}
    >
      <ThemedText style={styles.icon}>{icon}</ThemedText>
      <ThemedText style={styles.value}>{value}</ThemedText>
      <ThemedText type="small" style={{ color: colors.muted }}>
        {label}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    alignItems: "center",
    gap: 2,
    padding: 14,
    borderRadius: Radius.medium,
    borderWidth: 1,
  },
  icon: { fontSize: 24, lineHeight: 30 },
  value: { fontSize: 22, fontWeight: "bold", lineHeight: 28 },
});
