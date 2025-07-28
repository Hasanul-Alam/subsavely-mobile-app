// hooks/useInternetCheck.ts
import * as Network from "expo-network";
import { useEffect } from "react";
import { Alert, AppState, BackHandler, Platform } from "react-native";

export default function useInternetCheck() {
  useEffect(() => {
    const checkInternet = async () => {
      const state = await Network.getNetworkStateAsync();
      const isValid = state.isConnected && state.isInternetReachable;

      if (!isValid) {
        Alert.alert(
          "No Internet",
          "Check your internet connection and try again.",
          [
            {
              text: "OK",
              onPress: () => {
                if (Platform.OS === "android") {
                  BackHandler.exitApp();
                }
              },
            },
          ],
          { cancelable: false }
        );
      }
    };

    // Check on mount
    checkInternet();

    // Optional: Check when app returns to foreground
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        checkInternet();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);
}
