import { Picker } from "@react-native-picker/picker";
import { Platform, StyleSheet } from "react-native";

import { getColors, Radius } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { avatarOptions } from "@/rules/lessonRules";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface AvatarPickerProps {
  value: string;
  onChange: (avatar: string) => void;
}

export function AvatarPicker({ value, onChange }: AvatarPickerProps) {
  const colors = getColors(useColorScheme());

  return (
    <ThemedView
      type="backgroundElement"
      style={[styles.container, { borderColor: colors.border }]}
    >
      <ThemedText type="subtitle">Foto de perfil</ThemedText>

      <Picker
        selectedValue={value}
        onValueChange={(item) => onChange(String(item))}
        mode="dropdown"
        dropdownIconColor={colors.tint}
        itemStyle={{ color: colors.text, fontSize: 22, height: 150 }}
        style={[
          styles.picker,
          Platform.OS !== "ios" && {
            color: colors.text,
            backgroundColor: colors.input,
          },
        ]}
      >
        {avatarOptions.map((option) => (
          <Picker.Item
            key={option.emoji}
            label={`${option.emoji}  ${option.name}`}
            value={option.emoji}
            color={colors.text}
          />
        ))}
      </Picker>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: Radius.medium,
    borderWidth: 1,
    gap: 4,
    overflow: "hidden",
  },
  picker: Platform.select({
    web: { height: 48, borderRadius: Radius.small, paddingHorizontal: 8, fontSize: 18 },
    default: {},
  }),
});
