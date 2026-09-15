import { useState } from "react";
import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";

import { ThemedText } from "@/components/themed-text";

export type FormFieldType = "text" | "email" | "password" | "confirmPassword";

export type FormField = {
  label: string;
  placeholder?: string;
  type: FormFieldType;
  value: string;
  onChangeText: (value: string) => void;
};

type FormProps = {
  fields: FormField[];
  onSubmit: () => void;
  submitText?: string;
  loading?: boolean;
};

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

export function Form({
  fields,
  onSubmit,
  submitText = "Enviar",
  loading = false,
}: FormProps) {
  const [visiblePasswords, setVisiblePasswords] = useState<
    Record<string, boolean>
  >({});

  function togglePasswordVisibility(index: number) {
    setVisiblePasswords((current) => ({
      ...current,
      [index]: !current[index],
    }));
  }

  function validateFields() {
    for (const field of fields) {
      if (!field.value.trim()) {
        Alert.alert("Atenção", `Preencha o campo "${field.label}".`);
        return false;
      }

      if (field.type === "email" && !isValidEmail(field.value.trim())) {
        Alert.alert("E-mail inválido", "Digite um endereço de e-mail válido.");
        return false;
      }
    }

    const password = fields.find((field) => field.type === "password");

    const confirmPassword = fields.find(
      (field) => field.type === "confirmPassword",
    );

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      Alert.alert(
        "Senhas diferentes",
        "A senha e a confirmação de senha precisam ser iguais.",
      );
      return false;
    }

    return true;
  }

  function handleSubmit() {
    if (!validateFields()) {
      return;
    }

    onSubmit();
  }

  return (
    <View style={styles.container}>
      {fields.map((field, index) => {
        const isPassword =
          field.type === "password" || field.type === "confirmPassword";

        const passwordVisible = visiblePasswords[index];

        return (
          <View key={`${field.label}-${index}`} style={styles.field}>
            <ThemedText style={styles.label}>{field.label}</ThemedText>

            <View style={styles.inputContainer}>
              <TextInput
                editable={!loading}
                value={field.value}
                onChangeText={field.onChangeText}
                style={[styles.input, isPassword && styles.passwordInput]}
                placeholder={field.placeholder}
                placeholderTextColor="grey"
                autoCapitalize={field.type === "email" ? "none" : "words"}
                keyboardType={
                  field.type === "email" ? "email-address" : "default"
                }
                secureTextEntry={isPassword && !passwordVisible}
                returnKeyType="done"
              />

              {isPassword && (
                <Pressable
                  style={styles.eyeButton}
                  onPress={() => togglePasswordVisibility(index)}
                  disabled={loading}
                  hitSlop={10}
                >
                  <ThemedText style={styles.eyeText}>
                    {passwordVisible ? "🙈" : "👁️"}
                  </ThemedText>
                </Pressable>
              )}
            </View>
          </View>
        );
      })}

      <Pressable
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <ThemedText style={styles.buttonText}>
          {loading ? "Enviando..." : submitText}
        </ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },

  field: {
    gap: 6,
  },

  label: {
    fontWeight: "600",
  },

  inputContainer: {
    position: "relative",
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

  passwordInput: {
    paddingRight: 55,
  },

  eyeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  eyeText: {
    fontSize: 20,
  },

  button: {
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2E7D32",
    marginTop: 8,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
