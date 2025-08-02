import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from "react";
import { AppState, Platform } from "react-native";

export function useNavigationBar({ backgroundColor, buttonStyle }: any) {
  useEffect(() => {
    if (Platform.OS === "android") {
      const setNavigationBar = async () => {
        try {
          await NavigationBar.setBackgroundColorAsync(backgroundColor);
          await NavigationBar.setButtonStyleAsync(buttonStyle);
        } catch (error) {
          console.log("Error setting navigation bar:", error);
        }
      };

      setNavigationBar();

      // Handle app state changes
      const handleAppStateChange = (nextAppState: any) => {
        if (nextAppState === "active") {
          // Reapply navigation bar settings when app becomes active
          setNavigationBar();
        }
      };

      const subscription = AppState.addEventListener(
        "change",
        handleAppStateChange
      );

      return () => {
        subscription?.remove();
      };
    }
  }, [backgroundColor, buttonStyle]);
}
