import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
} from "react-native";

import { Form, FormField } from "@/components/Form";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { login } from "@/services/authService";

export default function LoginScreen() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const fields: FormField[] = [
    {
      label: "Qual é o seu nome?",
      placeholder: "Digite seu nome",
      type: "text",
      value: name,
      onChangeText: setName,
    },
    {
      label: "Qual é o seu e-mail?",
      placeholder: "Digite seu e-mail",
      type: "email",
      value: email,
      onChangeText: setEmail,
    },
    {
      label: "Crie uma senha",
      placeholder: "Digite sua senha",
      type: "password",
      value: password,
      onChangeText: setPassword,
    },
    {
      label: "Repita sua senha",
      placeholder: "Digite sua senha novamente",
      type: "confirmPassword",
      value: confirmPassword,
      onChangeText: setConfirmPassword,
    },
  ];

  async function handleLogin() {
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

          <Form
            fields={fields}
            onSubmit={handleLogin}
            submitText="Entrar"
            loading={loading}
          />
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
});
