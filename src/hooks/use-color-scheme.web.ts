import { useEffect, useState } from "react";
import { useColorScheme as useRNColorScheme } from "react-native";

import { useThemePreference } from "./theme-preference";

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme(): "light" | "dark" {
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const preference = useThemePreference();
  const system = useRNColorScheme();

  if (!hasHydrated) {
    return "light";
  }

  return preference === "system" ? (system === "dark" ? "dark" : "light") : preference;
}
