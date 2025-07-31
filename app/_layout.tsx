"use client";

import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { AppState, Platform } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
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
            console.log("Navigation bar set via expo-system-ui");
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
    <SafeAreaProvider>
      <ThemeProvider value={theme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="screens/login/LoginScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/subscriptionDetails/SubscriptionDetails"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/notifications/Notifications"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/notifications/NotificationDetails"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar
          style="light"
          translucent={false}
          backgroundColor="#000000"
        />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
