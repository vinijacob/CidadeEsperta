import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";

import { AvatarPicker } from "@/components/AvatarPicker";
import { Button } from "@/components/Button";
import { ProgressBar } from "@/components/ProgressBar";
import { ReturnButton } from "@/components/ReturnButton";
import { Screen } from "@/components/Screen";
import { StatTile } from "@/components/StatTile";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getColors, Radius } from "@/constants/theme";
import { lessons } from "@/data/lessons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Student } from "@/models/Student";
import {
  setThemePreference,
  ThemePreference,
  useThemePreference,
} from "@/hooks/theme-preference";
import { dailyGoalOptions, getLevel } from "@/rules/lessonRules";
import {
  deleteAccount,
  getCurrentStudent,
  logout,
  resetProgress,
  updateStudent,
} from "@/services/authService";

const learningAreas = [
  { id: "programacao", title: "Lógica de Programação", description: "Aprenda os fundamentos da programação", icon: "💻", available: true },
  { id: "ingles", title: "Inglês", description: "Vocabulário e conversação", icon: "🇺🇸", available: false },
  { id: "portugues", title: "Português", description: "Leitura e escrita", icon: "📚", available: false },
  { id: "matematica", title: "Matemática", description: "Matemática de forma divertida", icon: "🔢", available: false },
  { id: "ciencias", title: "Ciências", description: "Explore o mundo da ciência", icon: "🔬", available: false },
  { id: "historia", title: "História", description: "Acontecimentos do passado", icon: "🏛️", available: false },
  { id: "geografia", title: "Geografia", description: "Países, cidades e o planeta", icon: "🌎", available: false },
];

export default function ProfileScreen() {
  const colors = getColors(useColorScheme());

  const themePreference = useThemePreference();
  const [student, setStudent] = useState<Student | null>(null);
  const [editing, setEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState("");

  useFocusEffect(
    useCallback(() => {
      getCurrentStudent().then(setStudent);
    }, []),
  );

  if (!student) {
    return (
      <ThemedView style={styles.loading}>
        <ThemedText>Carregando perfil...</ThemedText>
      </ThemedView>
    );
  }

  const level = getLevel(student.score);
  const progress = student.completedLessons.length / lessons.length;

  async function saveName() {
    const name = nameDraft.trim();

    if (!name) {
      Alert.alert("Atenção", "O nome não pode ficar vazio.");
      return;
    }

    setStudent(await updateStudent({ name }));
    setEditing(false);
  }

  async function chooseAvatar(avatar: string) {
    // Atualiza na hora (otimista) para a roleta não voltar ao valor antigo
    // enquanto o salvamento assíncrono termina.
    setStudent((current) => (current ? { ...current, avatar } : current));
    await updateStudent({ avatar });
  }

  function confirm(title: string, message: string, action: () => Promise<void>) {
    Alert.alert(title, message, [
      { text: "Cancelar", style: "cancel" },
      { text: "Confirmar", style: "destructive", onPress: action },
    ]);
  }

  return (
    <Screen>
      <ReturnButton />

      <ThemedView style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.tintSoft, borderColor: colors.tint }]}>
          <ThemedText style={styles.avatarText}>{student.avatar ?? "🙂"}</ThemedText>
        </View>

        {editing ? (
          <ThemedView style={styles.editRow}>
            <TextInput
              value={nameDraft}
              onChangeText={setNameDraft}
              autoFocus
              style={[
                styles.input,
                { color: colors.text, borderColor: colors.tint, backgroundColor: colors.input },
              ]}
              onSubmitEditing={saveName}
            />
            <Button title="Salvar" onPress={saveName} />
          </ThemedView>
        ) : (
          <Pressable
            onPress={() => {
              setNameDraft(student.name);
              setEditing(true);
            }}
          >
            <ThemedText type="title" style={styles.center}>
              {student.name} ✏️
            </ThemedText>
          </Pressable>
        )}

        <ThemedText style={{ color: colors.muted }}>
          {student.email ?? "Aluno da Cidade Esperta"} • Nível {level.level}
        </ThemedText>
      </ThemedView>

      <AvatarPicker
        value={student.avatar ?? "🙂"}
        onChange={chooseAvatar}
      />

      <ThemedView style={styles.row}>
        <StatTile icon="📚" value={`${student.completedLessons.length}/${lessons.length}`} label="Aulas" />
        <StatTile icon="🔥" value={student.streak ?? 0} label="Sequência" />
        <StatTile icon="🏆" value={student.score} label="Pontos" />
      </ThemedView>

      <ThemedView type="backgroundElement" style={[styles.card, { borderColor: colors.border }]}>
        <ThemedText type="subtitle">Meu progresso</ThemedText>
        <ProgressBar progress={progress} />
        <ThemedText type="small" style={{ color: colors.muted }}>
          {Math.round(progress * 100)}% da trilha concluída
        </ThemedText>
      </ThemedView>

      <Button variant="secondary" title="🎖️ Ver conquistas" onPress={() => router.push("/student/achievements")} />

      <ThemedText type="subtitle">O que você pode aprender</ThemedText>

      {learningAreas.map((area) => (
        <Pressable
          key={area.id}
          disabled={!area.available}
          onPress={() => router.push("/student/lessons")}
          style={[
            styles.area,
            { backgroundColor: colors.card, borderColor: area.available ? colors.tint : colors.border },
            !area.available && styles.disabled,
          ]}
        >
          <ThemedText style={styles.areaIcon}>{area.icon}</ThemedText>
          <View style={styles.areaInfo}>
            <ThemedText style={styles.bold}>{area.title}</ThemedText>
            <ThemedText type="small" style={{ color: colors.muted }}>
              {area.description}
            </ThemedText>
            <ThemedText
              type="small"
              style={styles.bold}
              lightColor={area.available ? colors.tint : colors.muted}
              darkColor={area.available ? colors.tint : colors.muted}
            >
              {area.available ? "Disponível agora" : "🔒 Em breve"}
            </ThemedText>
          </View>
        </Pressable>
      ))}

      <ThemedText type="subtitle" style={styles.section}>
        Meta diária
      </ThemedText>

      <ThemedView style={styles.row}>
        {dailyGoalOptions.map((goal) => {
          const active = (student.dailyGoal ?? 50) === goal;

          return (
            <Pressable
              key={goal}
              onPress={async () => {
                setStudent((current) =>
                  current ? { ...current, dailyGoal: goal } : current,
                );
                await updateStudent({ dailyGoal: goal });
              }}
              style={[
                styles.themeOption,
                {
                  borderColor: active ? colors.tint : colors.border,
                  backgroundColor: active ? colors.tintSoft : colors.card,
                },
              ]}
            >
              <ThemedText type="small" style={styles.bold}>
                {goal} pts
              </ThemedText>
            </Pressable>
          );
        })}
      </ThemedView>

      <ThemedText type="subtitle" style={styles.section}>
        Aparência
      </ThemedText>

      <ThemedView style={styles.row}>
        {(
          [
            ["system", "📱 Sistema"],
            ["light", "☀️ Claro"],
            ["dark", "🌙 Escuro"],
          ] as [ThemePreference, string][]
        ).map(([value, label]) => (
          <Pressable
            key={value}
            onPress={() => setThemePreference(value)}
            style={[
              styles.themeOption,
              {
                borderColor: themePreference === value ? colors.tint : colors.border,
                backgroundColor: themePreference === value ? colors.tintSoft : colors.card,
              },
            ]}
          >
            <ThemedText type="small" style={styles.bold}>
              {label}
            </ThemedText>
          </Pressable>
        ))}
      </ThemedView>

      <ThemedText type="subtitle" style={styles.section}>
        Conta
      </ThemedText>

      <Button
        variant="secondary"
        title="Sair da conta"
        onPress={() =>
          confirm("Sair da conta", "Seu progresso fica salvo neste aparelho.", async () => {
            await logout();
            router.replace("/login");
          })
        }
      />
      <Button
        variant="ghost"
        title="Reiniciar progresso"
        onPress={() =>
          confirm("Reiniciar progresso", "Todas as aulas, pontos e conquistas serão apagados.", async () => {
            await resetProgress();
            setStudent(await getCurrentStudent());
          })
        }
      />
      <Button
        variant="danger"
        title="Excluir conta"
        onPress={() =>
          confirm("Excluir conta", "Isso apaga todos os seus dados. Não é possível desfazer.", async () => {
            await deleteAccount();
            router.replace("/login");
          })
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { alignItems: "center", gap: 8, backgroundColor: "transparent" },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: 46, lineHeight: 58 },
  center: { textAlign: "center" },
  editRow: { alignSelf: "stretch", gap: 10, backgroundColor: "transparent" },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderRadius: Radius.medium,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  row: { flexDirection: "row", gap: 12, backgroundColor: "transparent" },
  card: { padding: 18, borderRadius: Radius.medium, gap: 12, borderWidth: 1 },
  area: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
  },
  disabled: { opacity: 0.5 },
  areaIcon: { fontSize: 30, lineHeight: 38 },
  areaInfo: { flex: 1, gap: 2 },
  bold: { fontWeight: "bold" },
  section: { marginTop: 8 },
  themeOption: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: Radius.medium,
    borderWidth: 1.5,
  },
});
