"use client";

import { useEffect } from "react";
import { Platform } from "react-native";

interface NavigationBarOptions {
  backgroundColor?: string;
  buttonStyle?: "light" | "dark";
}

export function useNavigationBar(options: NavigationBarOptions = {}) {
  const { backgroundColor = "#000000", buttonStyle = "light" } = options;

  useEffect(() => {
    const setNavigationBarColor = async () => {
      if (Platform.OS === "android") {
        try {
          const NavigationBar = await import("expo-navigation-bar");

          if (backgroundColor) {
            await NavigationBar.setBackgroundColorAsync(backgroundColor);
          }

          if (buttonStyle) {
            await NavigationBar.setButtonStyleAsync(buttonStyle);
          }

          console.log("Navigation bar styled successfully");
        } catch (error) {
          console.log("Navigation bar styling failed:", error);
        }
      }
    };

    setNavigationBarColor();
  }, [backgroundColor, buttonStyle]);
}
