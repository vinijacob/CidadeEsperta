import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

import { Form, FormField } from "@/components/Form";
import { Screen } from "@/components/Screen";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@/components/Button";
import { getColors, Radius } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { hasAccount, register, signIn } from "@/services/authService";

export default function LoginScreen() {
  const router = useRouter();
  const colors = getColors(useColorScheme());

  const [mode, setMode] = useState<"signin" | "register">("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    hasAccount().then((exists) => exists && setMode("signin"));
  }, []);

  const isRegister = mode === "register";

  const fields: FormField[] = [
    ...(isRegister
      ? [
          {
            label: "Qual é o seu nome?",
            placeholder: "Digite seu nome",
            type: "text" as const,
            value: name,
            onChangeText: setName,
          },
        ]
      : []),
    {
      label: "E-mail",
      placeholder: "Digite seu e-mail",
      type: "email",
      value: email,
      onChangeText: setEmail,
    },
    {
      label: isRegister ? "Crie uma senha" : "Senha",
      placeholder: "Mínimo de 6 caracteres",
      type: "password",
      value: password,
      onChangeText: setPassword,
    },
    ...(isRegister
      ? [
          {
            label: "Repita sua senha",
            placeholder: "Digite sua senha novamente",
            type: "confirmPassword" as const,
            value: confirmPassword,
            onChangeText: setConfirmPassword,
          },
        ]
      : []),
  ];

  async function handleSubmit() {
    try {
      setLoading(true);

      if (isRegister) {
        await register(name.trim(), email.trim(), password);
      } else {
        await signIn(email.trim(), password);
      }

      router.replace("/student");
    } catch (error) {
      const code = error instanceof Error ? error.message : "";

      Alert.alert(
        "Erro",
        code === "INVALID_CREDENTIALS"
          ? "E-mail ou senha incorretos."
          : code === "NO_ACCOUNT"
            ? "Nenhuma conta encontrada. Crie uma nova."
            : "Não foi possível continuar. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Screen contentStyle={styles.content}>
        <ThemedView style={styles.hero}>
          <ThemedView
            style={[styles.logo, { backgroundColor: colors.tintSoft }]}
          >
            <ThemedText style={styles.logoEmoji}>🏙️</ThemedText>
          </ThemedView>

          <ThemedText type="title" style={styles.center}>
            Cidade Esperta
          </ThemedText>

          <ThemedText style={[styles.center, { color: colors.muted }]}>
            Aprenda programação construindo uma cidade inteligente!
          </ThemedText>
        </ThemedView>

        <ThemedView
          type="backgroundElement"
          style={[styles.card, { borderColor: colors.border }]}
        >
          <ThemedText type="subtitle">
            {isRegister ? "Criar conta" : "Bem-vindo de volta!"}
          </ThemedText>

          <Form
            key={mode}
            fields={fields}
            onSubmit={handleSubmit}
            submitText={isRegister ? "Começar" : "Entrar"}
            loading={loading}
          />
        </ThemedView>

        <Button
          variant="ghost"
          title={
            isRegister ? "Já tenho uma conta" : "Criar uma nova conta"
          }
          onPress={() => setMode(isRegister ? "signin" : "register")}
        />
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { justifyContent: "center", flexGrow: 1 },
  hero: { alignItems: "center", gap: 8, backgroundColor: "transparent" },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  logoEmoji: { fontSize: 48, lineHeight: 60 },
  center: { textAlign: "center" },
  card: {
    gap: 16,
    padding: 20,
    borderRadius: Radius.large,
    borderWidth: 1,
  },
});
