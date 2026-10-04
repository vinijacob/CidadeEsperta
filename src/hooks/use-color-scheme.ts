import { useColorScheme as useRNColorScheme } from "react-native";

import { useThemePreference } from "./theme-preference";

export function useColorScheme(): "light" | "dark" {
  const preference = useThemePreference();
  const system = useRNColorScheme();

  return preference === "system" ? (system === "dark" ? "dark" : "light") : preference;
}
