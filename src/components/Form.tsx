import { useState } from "react";
import { Alert, Pressable, StyleSheet, TextInput, View } from "react-native";

import { Button } from "@/components/Button";
import { ThemedText } from "@/components/themed-text";
import { getColors, Radius } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

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
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function Form({
  fields,
  onSubmit,
  submitText = "Enviar",
  loading = false,
}: FormProps) {
  const colors = getColors(useColorScheme());

  const [visiblePasswords, setVisiblePasswords] = useState<
    Record<string, boolean>
  >({});
  const [focused, setFocused] = useState<number | null>(null);

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
    const confirm = fields.find((field) => field.type === "confirmPassword");

    if (password && password.value.length < 6) {
      Alert.alert("Senha curta", "Use pelo menos 6 caracteres.");
      return false;
    }

    if (password && confirm && password.value !== confirm.value) {
      Alert.alert(
        "Senhas diferentes",
        "A senha e a confirmação de senha precisam ser iguais.",
      );
      return false;
    }

    return true;
  }

  function handleSubmit() {
    if (validateFields()) {
      onSubmit();
    }
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

            <View>
              <TextInput
                editable={!loading}
                value={field.value}
                onChangeText={field.onChangeText}
                onFocus={() => setFocused(index)}
                onBlur={() => setFocused(null)}
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.input,
                    color: colors.text,
                    borderColor: focused === index ? colors.tint : colors.border,
                  },
                  isPassword && styles.passwordInput,
                ]}
                placeholder={field.placeholder}
                placeholderTextColor={colors.muted}
                autoCapitalize={
                  field.type === "text" ? "words" : "none"
                }
                autoCorrect={false}
                keyboardType={
                  field.type === "email" ? "email-address" : "default"
                }
                secureTextEntry={isPassword && !passwordVisible}
                returnKeyType={index === fields.length - 1 ? "done" : "next"}
                onSubmitEditing={
                  index === fields.length - 1 ? handleSubmit : undefined
                }
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

      <Button title={submitText} onPress={handleSubmit} loading={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 16 },
  field: { gap: 6 },
  label: { fontWeight: "600" },
  input: {
    height: 52,
    borderWidth: 1.5,
    borderRadius: Radius.medium,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  passwordInput: { paddingRight: 55 },
  eyeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    height: 52,
    width: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  eyeText: { fontSize: 20 },
});
