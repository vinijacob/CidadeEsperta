import { useRouter } from "expo-router";
import { useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { ThemedText } from "./themed-text";

export function ReturnButton() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const colors = colorScheme === "dark" ? Colors.dark : Colors.light;

  const scale = useRef(new Animated.Value(1)).current;

  const opacity = useRef(new Animated.Value(1)).current;

  function handlePressIn() {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.9,
        useNativeDriver: true,
        speed: 20,
        bounciness: 8,
      }),
      Animated.timing(opacity, {
        toValue: 0.65,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function handlePressOut() {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 8,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }

  function handlePress() {
    router.back();
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale }],
          opacity,
        },
      ]}
    >
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        hitSlop={10}
        style={[
          styles.button,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <ThemedText
          style={styles.arrow}
          lightColor={colors.text}
          darkColor={colors.text}
        >
          ‹
        </ThemedText>

        <ThemedText
          style={styles.text}
          lightColor={colors.text}
          darkColor={colors.text}
        >
          Voltar
        </ThemedText>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
  },

  button: {
    minHeight: 42,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  arrow: {
    fontSize: 30,
    lineHeight: 30,
    marginTop: -2,
  },

  text: {
    fontSize: 15,
    fontWeight: "600",
  },
});
