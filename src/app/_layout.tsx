import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />

      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="login/index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="student/index"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="student/lessons"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="student/progress"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="lesson/[id]"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="exercises/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
