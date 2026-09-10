import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, View } from "react-native";

import { ProgressBar } from "@/components/ProgressBar";
import { ReturnButton } from "@/components/ReturnButton";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { lessons } from "@/data/lessons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Student } from "@/models/Student";
import { getCurrentStudent, logout } from "@/services/authService";
import { clearStorage } from "@/services/storageService";

const learningAreas = [
  {
    id: "programacao",
    title: "Lógica de Programação",
    description: "Aprenda os fundamentos da programação",
    icon: "💻",
    available: true,
  },
  {
    id: "ingles",
    title: "Inglês",
    description: "Aprenda vocabulário e conversação em inglês",
    icon: "🇺🇸",
    available: false,
  },
  {
    id: "portugues",
    title: "Português",
    description: "Melhore sua leitura e escrita",
    icon: "📚",
    available: false,
  },
  {
    id: "matematica",
    title: "Matemática",
    description: "Aprenda matemática de forma divertida",
    icon: "🔢",
    available: false,
  },
  {
    id: "ciencias",
    title: "Ciências",
    description: "Explore o mundo da ciência",
    icon: "🔬",
    available: false,
  },
  {
    id: "historia",
    title: "História",
    description: "Conheça acontecimentos importantes do passado",
    icon: "🏛️",
    available: false,
  },
  {
    id: "geografia",
    title: "Geografia",
    description: "Explore países, cidades e o nosso planeta",
    icon: "🌎",
    available: false,
  },
];

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadStudent() {
    try {
      const currentStudent = await getCurrentStudent();

      setStudent(currentStudent);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadStudent();
    }, []),
  );

  if (loading || !student) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ThemedText>Carregando perfil...</ThemedText>
      </ThemedView>
    );
  }

  const totalLessons = lessons.length;

  const completedLessons = student.completedLessons.length;

  const totalExercises = lessons.reduce(
    (total, lesson) => total + lesson.exercises.length,
    0,
  );

  const completedExercises = student.completedExercises.length;

  const progress = totalLessons === 0 ? 0 : completedLessons / totalLessons;

  function handlePress() {
    router.replace("/student/lessons");
  }
  async function handleLogout() {
    Alert.alert(
      "Sair da conta",
      "Isso apagará todos os dados da sua conta. Tem certeza que deseja sair?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            await logout();
            await clearStorage();
            router.replace("/login");
          },
        },
      ],
    );
  }

  function handleLearningAreaPress(area: (typeof learningAreas)[number]) {
    if (!area.available) {
      return;
    }

    router.replace("/student/lessons");
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      >
        <ReturnButton />
        <ThemedView style={styles.profileHeader}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor: colors.tint,
              },
            ]}
          >
            <ThemedText
              style={styles.avatarText}
              lightColor="#FFFFFF"
              darkColor="#FFFFFF"
            >
              {student.name.charAt(0).toUpperCase()}
            </ThemedText>
          </View>

          <ThemedText type="title" style={styles.name}>
            {student.name}
          </ThemedText>

          <ThemedText style={styles.subtitle}>
            Aluno da Cidade Esperta
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.statsContainer}>
          <ThemedView
            type="backgroundElement"
            style={[
              styles.stat,
              {
                borderColor: colors.border,
              },
            ]}
          >
            <ThemedText style={styles.statIcon}>📚</ThemedText>

            <ThemedText style={styles.statNumber}>
              {completedLessons}/{totalLessons}
            </ThemedText>

            <ThemedText style={styles.statLabel}>Aulas</ThemedText>
          </ThemedView>

          <ThemedView
            type="backgroundElement"
            style={[
              styles.stat,
              {
                borderColor: colors.border,
              },
            ]}
          >
            <ThemedText style={styles.statIcon}>📝</ThemedText>

            <ThemedText style={styles.statNumber}>
              {completedExercises}/{totalExercises}
            </ThemedText>

            <ThemedText style={styles.statLabel}>Exercícios</ThemedText>
          </ThemedView>

          <ThemedView
            type="backgroundElement"
            style={[
              styles.stat,
              {
                borderColor: colors.border,
              },
            ]}
          >
            <ThemedText style={styles.statIcon}>🏆</ThemedText>

            <ThemedText style={styles.statNumber}>{student.score}</ThemedText>

            <ThemedText style={styles.statLabel}>Pontos</ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedView
          type="backgroundElement"
          style={[
            styles.progressCard,
            {
              borderColor: colors.border,
            },
          ]}
        >
          <ThemedText type="subtitle">Meu progresso</ThemedText>

          <ThemedText>
            Você já concluiu {completedLessons} de {totalLessons} aulas.
          </ThemedText>

          <ProgressBar progress={progress} />
        </ThemedView>

        <ThemedView style={styles.learningSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            O que você pode aprender
          </ThemedText>

          <ThemedText style={styles.sectionDescription}>
            Explore as áreas disponíveis na Cidade Esperta.
          </ThemedText>

          <View
            style={[
              styles.learningListContainer,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <ScrollView
              style={styles.learningList}
              contentContainerStyle={styles.learningListContent}
              nestedScrollEnabled
              showsVerticalScrollIndicator
            >
              {learningAreas.map((area) => (
                <Pressable
                  key={area.id}
                  onPress={() => handleLearningAreaPress(area)}
                  disabled={!area.available}
                  style={[
                    styles.learningCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                    },
                    !area.available && styles.learningCardDisabled,
                  ]}
                >
                  <View
                    style={[
                      styles.learningIconContainer,
                      {
                        backgroundColor:
                          colorScheme === "dark" ? "#2A2A2A" : "#F5F5F5",
                      },
                    ]}
                  >
                    <ThemedText style={styles.learningIcon}>
                      {area.icon}
                    </ThemedText>
                  </View>

                  <View style={styles.learningInfo}>
                    <ThemedText
                      style={[
                        styles.learningTitle,
                        !area.available && styles.disabledText,
                      ]}
                    >
                      {area.title}
                    </ThemedText>

                    <ThemedText
                      style={[
                        styles.learningDescription,
                        !area.available && styles.disabledText,
                      ]}
                    >
                      {area.description}
                    </ThemedText>

                    {area.available ? (
                      <ThemedText
                        style={styles.availableText}
                        lightColor="#2E7D32"
                        darkColor="#81C784"
                      >
                        Disponível agora
                      </ThemedText>
                    ) : (
                      <ThemedText style={styles.lockedText}>
                        🔒 Em breve
                      </ThemedText>
                    )}
                  </View>

                  <ThemedText
                    style={[
                      styles.arrow,
                      !area.available && styles.disabledText,
                    ]}
                  >
                    ›
                  </ThemedText>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </ThemedView>

        <Pressable
          style={[
            styles.button,
            {
              backgroundColor: colors.tint,
            },
          ]}
          onPress={handlePress}
        >
          <ThemedText
            style={styles.buttonText}
            lightColor="#FFFFFF"
            darkColor="#FFFFFF"
          >
            Voltar para Aulas
          </ThemedText>
        </Pressable>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <ThemedText
            style={styles.buttonText}
            lightColor="#FFFFFF"
            darkColor="#FFFFFF"
          >
            Sair da conta
          </ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    gap: 16,
    padding: 20,
    paddingTop: 80,
    paddingBottom: 30,
  },

  profileHeader: {
    alignItems: "center",
    gap: 8,
    backgroundColor: "transparent",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "bold",
  },

  name: {
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    opacity: 0.7,
  },

  statsContainer: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: "transparent",
  },

  stat: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 12,
    gap: 4,
    borderWidth: 1,
  },

  statIcon: {
    fontSize: 24,
  },

  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
  },

  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },

  progressCard: {
    padding: 20,
    borderRadius: 12,
    gap: 12,
    borderWidth: 1,
  },

  learningSection: {
    backgroundColor: "transparent",
    gap: 8,
  },

  sectionTitle: {
    marginTop: 4,
  },

  sectionDescription: {
    opacity: 0.7,
    marginBottom: 4,
  },

  learningListContainer: {
    height: 280,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
  },

  learningList: {
    flex: 1,
  },

  learningListContent: {
    padding: 10,
    gap: 10,
  },

  learningCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
  },

  learningCardDisabled: {
    opacity: 0.42,
  },

  learningIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  learningIcon: {
    fontSize: 25,
  },

  learningInfo: {
    flex: 1,
    gap: 3,
  },

  learningTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  learningDescription: {
    fontSize: 12,
    opacity: 0.7,
  },

  availableText: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 2,
  },

  lockedText: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 2,
  },

  disabledText: {
    opacity: 0.7,
  },

  arrow: {
    fontSize: 30,
    marginLeft: 8,
    opacity: 0.5,
  },

  button: {
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    padding: 15,
  },

  logoutButton: {
    height: 52,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7A0A17",
    marginTop: 8,
    padding: 15,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
