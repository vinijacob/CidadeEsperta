import { useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { getColors, Radius } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { OrderExercise } from "@/models/Exercise";
import { isAnswerCorrect } from "@/rules/exerciseRules";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface OrderCardProps {
  exercise: OrderExercise;
  answered: boolean;
  points?: number;
  onChange: (answer: string[] | null) => void;
}

function shuffled(lines: string[]): { id: number; text: string }[] {
  const items = lines.map((text, id) => ({ id, text }));

  // Embaralha até a ordem ficar diferente da solução (quando possível).
  for (let attempt = 0; attempt < 10; attempt++) {
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }

    if (items.some((item, index) => item.id !== index)) {
      break;
    }
  }

  return items;
}

export function OrderCard({
  exercise,
  answered,
  points = 10,
  onChange,
}: OrderCardProps) {
  const colors = getColors(useColorScheme());

  const pool = useMemo(() => shuffled(exercise.solution), [exercise.id]);
  const [chosen, setChosen] = useState<number[]>([]);

  const textOf = (id: number) => exercise.solution[id];
  const answer = chosen.map(textOf);
  const complete = chosen.length === pool.length;
  const correct = answered && isAnswerCorrect(exercise, answer);

  function update(next: number[]) {
    setChosen(next);
    onChange(next.length === pool.length ? next.map(textOf) : null);
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.question}>
        {exercise.question}
      </ThemedText>

      <ThemedText type="small" style={{ color: colors.muted }}>
        Toque nas linhas para montar o código na ordem certa.
      </ThemedText>

      <View
        style={[
          styles.editor,
          {
            borderColor: answered
              ? correct
                ? colors.success
                : colors.danger
              : colors.border,
          },
        ]}
      >
        {chosen.length === 0 && (
          <ThemedText type="small" style={{ color: colors.muted }}>
            Seu código aparece aqui…
          </ThemedText>
        )}

        {chosen.map((id, position) => (
          <Pressable
            key={id}
            disabled={answered}
            onPress={() => update(chosen.filter((item) => item !== id))}
            style={styles.codeLine}
          >
            <ThemedText type="small" style={styles.lineNumber} lightColor="#8B949E" darkColor="#8B949E">
              {position + 1}
            </ThemedText>
            <ThemedText type="code" lightColor="#E6EDF3" darkColor="#E6EDF3">
              {textOf(id)}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      {!answered && (
        <View style={styles.pool}>
          {pool
            .filter((item) => !chosen.includes(item.id))
            .map((item) => (
              <Pressable
                key={item.id}
                onPress={() => update([...chosen, item.id])}
                style={({ pressed }) => [
                  styles.chip,
                  { backgroundColor: colors.card, borderColor: colors.tint },
                  pressed && { opacity: 0.7 },
                ]}
              >
                <ThemedText type="code">{item.text}</ThemedText>
              </Pressable>
            ))}

          {chosen.length > 0 && !complete && (
            <ThemedText type="small" style={{ color: colors.muted }}>
              Toque numa linha do código para removê-la.
            </ThemedText>
          )}
        </View>
      )}

      {answered && (
        <ThemedView
          style={[
            styles.feedback,
            {
              backgroundColor: correct ? colors.successSoft : colors.dangerSoft,
              borderColor: correct ? colors.success : colors.danger,
            },
          ]}
        >
          <ThemedText type="subtitle">
            {correct ? `🎉 Código correto! +${points} pontos` : "😅 Quase! Veja a ordem certa:"}
          </ThemedText>

          {!correct && (
            <ThemedText type="code">{exercise.solution.join("\n")}</ThemedText>
          )}

          <ThemedText>{exercise.explanation}</ThemedText>
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { gap: 14, backgroundColor: "transparent" },
  question: { fontSize: 20, lineHeight: 28 },
  editor: {
    minHeight: 96,
    backgroundColor: "#0D1117",
    borderRadius: Radius.medium,
    borderWidth: 1.5,
    padding: 14,
    gap: 6,
  },
  codeLine: { flexDirection: "row", gap: 12, alignItems: "center" },
  lineNumber: { width: 16, textAlign: "right" },
  pool: { flexDirection: "row", flexWrap: "wrap", gap: 10, alignItems: "center" },
  chip: {
    borderWidth: 1.5,
    borderRadius: Radius.small,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  feedback: { gap: 8, padding: 16, borderRadius: Radius.medium, borderWidth: 1.5 },
});
