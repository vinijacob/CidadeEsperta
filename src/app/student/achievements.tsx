import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

import { ReturnButton } from "@/components/ReturnButton";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getColors, Radius } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Student } from "@/models/Student";
import { badges } from "@/rules/lessonRules";
import { getCurrentStudent } from "@/services/authService";

export default function AchievementsScreen() {
  const colors = getColors(useColorScheme());

  const [student, setStudent] = useState<Student | null>(null);

  useFocusEffect(
    useCallback(() => {
      getCurrentStudent().then(setStudent);
    }, []),
  );

  if (!student) {
    return (
      <ThemedView style={styles.loading}>
        <ThemedText>Carregando...</ThemedText>
      </ThemedView>
    );
  }

  const earnedCount = badges.filter((b) => b.earned(student)).length;

  return (
    <Screen>
      <ReturnButton />
      <ThemedText type="title">Conquistas</ThemedText>
      <ThemedText style={{ color: colors.muted }}>
        {earnedCount} de {badges.length} desbloqueadas
      </ThemedText>

      {badges.map((badge) => {
        const earned = badge.earned(student);

        return (
          <View
            key={badge.id}
            style={[
              styles.card,
              {
                backgroundColor: earned ? colors.tintSoft : colors.card,
                borderColor: earned ? colors.tint : colors.border,
              },
              !earned && styles.locked,
            ]}
          >
            <ThemedText style={styles.icon}>{earned ? badge.icon : "🔒"}</ThemedText>

            <View style={styles.text}>
              <ThemedText type="subtitle" style={styles.title}>
                {badge.title}
              </ThemedText>
              <ThemedText style={{ color: colors.muted }}>
                {badge.description}
              </ThemedText>
            </View>
          </View>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
  },
  locked: { opacity: 0.6 },
  icon: { fontSize: 36, lineHeight: 44 },
  text: { flex: 1, gap: 2 },
  title: { fontSize: 18 },
});
