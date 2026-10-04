import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSyncExternalStore } from "react";

export type ThemePreference = "system" | "light" | "dark";

const KEY = "@cidade_esperta_theme";

let current: ThemePreference = "system";
const listeners = new Set<() => void>();

AsyncStorage.getItem(KEY)
  .then((value) => {
    if (value === "light" || value === "dark" || value === "system") {
      current = value;
      listeners.forEach((listener) => listener());
    }
  })
  .catch(() => {});

export function setThemePreference(value: ThemePreference) {
  current = value;
  listeners.forEach((listener) => listener());
  AsyncStorage.setItem(KEY, value).catch(() => {});
}

export function useThemePreference(): ThemePreference {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => current,
    () => "system" as ThemePreference,
  );
}
