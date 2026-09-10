import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { login, logout } from "@/services/authService";

export default function LoginScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!name.trim()) {
      Alert.alert("Atenção", "Digite seu nome para continuar.");
      return;
    }

    try {
      setLoading(true);

      await login(name.trim());

      router.replace("/student");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível entrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <ThemedView style={styles.content}>
          <ThemedText type="title" style={styles.title}>
            Cidade Esperta
          </ThemedText>

          <ThemedText style={styles.subtitle}>
            Aprenda programação construindo uma cidade inteligente!
          </ThemedText>

          <ThemedText style={styles.label}>Qual é o seu nome?</ThemedText>

          <TextInput
            editable={!loading}
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="Digite seu nome"
            placeholderTextColor="grey"
            autoCapitalize="words"
            returnKeyType="done"
            onSubmitEditing={Keyboard.dismiss}
          />

          <Pressable
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            <ThemedText style={styles.buttonText}>
              {loading ? "Entrando..." : "Entrar"}
            </ThemedText>
          </Pressable>
          <Pressable
            onPress={async () => {
              await logout();
              router.replace("/login");
            }}
          >
            <ThemedText>Log-out Temporário</ThemedText>
          </Pressable>
        </ThemedView>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },

  content: {
    gap: 16,
    backgroundColor: "transparent",
  },

  title: {
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 24,
  },

  label: {
    fontWeight: "600",
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    color: "#000",
  },

  button: {
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E7D32",
    marginTop: 8,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
