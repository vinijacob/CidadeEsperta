import { StyleSheet, View } from "react-native";

import { getColors, Radius } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Student } from "@/models/Student";
import { getTodayPoints, getWeekActivity } from "@/services/progressService";
import { ProgressBar } from "./ProgressBar";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

const CHART_HEIGHT = 56;

export function DailyGoalCard({ student }: { student: Student }) {
  const colors = getColors(useColorScheme());

  const goal = student.dailyGoal ?? 50;
  const today = getTodayPoints(student);
  const reached = today >= goal;
  const week = getWeekActivity(student);
  const max = Math.max(goal, ...week.map((day) => day.points));

  return (
    <ThemedView
      type="backgroundElement"
      style={[styles.card, { borderColor: reached ? colors.success : colors.border }]}
    >
      <ThemedView style={styles.row}>
        <ThemedText type="subtitle">
          {reached ? "🎯 Meta de hoje batida!" : "🎯 Meta diária"}
        </ThemedText>
        <ThemedText type="small" style={{ color: colors.muted }}>
          {Math.min(today, goal)}/{goal} pts
        </ThemedText>
      </ThemedView>

      <ProgressBar progress={today / goal} />

      <View style={styles.chart}>
        {week.map((day, index) => (
          <View key={index} style={styles.column}>
            <View style={styles.barArea}>
              <View
                style={{
                  height: Math.max(4, (day.points / max) * CHART_HEIGHT),
                  borderRadius: 4,
                  backgroundColor:
                    day.points >= goal
                      ? colors.success
                      : day.points > 0
                        ? colors.tint
                        : colors.track,
                  opacity: day.isToday ? 1 : 0.75,
                }}
              />
            </View>
            <ThemedText
              type="small"
              style={{
                color: day.isToday ? colors.text : colors.muted,
                fontWeight: day.isToday ? "bold" : "normal",
              }}
            >
              {day.label}
            </ThemedText>
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: 12,
    padding: 18,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  chart: { flexDirection: "row", gap: 8, marginTop: 4 },
  column: { flex: 1, alignItems: "center", gap: 4 },
  barArea: { height: CHART_HEIGHT, width: "100%", justifyContent: "flex-end", paddingHorizontal: 6 },
});
