"use client";

import { useColorScheme } from "@/hooks/useColorScheme";
import store from "@/redux/store/store";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import "react-native-reanimated";
import { Provider } from "react-redux";
import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", nextAppState => {
      setAppState(nextAppState);
    });

    // Set navigation bar color using dynamic imports
    const setNavigationBarColor = async () => {
      if (Platform.OS === "android") {
        try {
          // Method 1: expo-navigation-bar with dynamic import
          const NavigationBar = await import("expo-navigation-bar");
          await NavigationBar.setBackgroundColorAsync("#000000");
          await NavigationBar.setButtonStyleAsync("light");
          console.log("Navigation bar set via expo-navigation-bar");
        } catch (error) {
          try {
            // Method 2: expo-system-ui with dynamic import
            const SystemUI = await import("expo-system-ui");
            await SystemUI.setBackgroundColorAsync("#000000");
          } catch (error2) {
            console.log("Navigation bar styling not available:", error2);
          }
        }
      }
    };

    setNavigationBarColor();

    return () => {
      subscription.remove();
    };
  }, []);

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const theme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

  return (
    <Provider store={store}>
      <ThemeProvider value={theme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}
