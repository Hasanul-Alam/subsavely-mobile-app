/* eslint-disable react-hooks/exhaustive-deps */
import useInternetCheck from "@/hooks/useInternetCheck";
import { getItem } from "@/utils/useSecureStorage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import LoginScreen from "./screens/login/LoginScreen";
import OnboardingScreen from "./screens/onboardingScreens/OnboardingScreen1";

export default function HomeScreen() {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState<boolean | null>(
    null
  );
  const router = useRouter();

  // Check internet connection
  useInternetCheck();

  // Get onboarding status
  const handleShowOnboarding = async () => {
    const onboarded = await getItem("isOnboarded");
    console.log("Onboarding status:", onboarded);
    setIsOnboarded(onboarded === "true");
  };

  // Get login status
  const handleGetLoginStatus = async () => {
    const token = await getItem("token");
    setIsAlreadyLoggedIn(!!token);
  };

  useEffect(() => {
    handleShowOnboarding();
    handleGetLoginStatus();
  }, []);

  // Navigate if already logged in
  useEffect(() => {
    if (isAlreadyLoggedIn) {
      router.replace("/(tabs)/dashboard");
    }
  }, [isAlreadyLoggedIn]);

  // Show loading while checking
  if (isOnboarded === null || isAlreadyLoggedIn === null) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#f87171" />
        <Text className="mt-2 text-gray-500">Loading...</Text>
      </View>
    );
  }

  // If onboarding not done yet
  if (!isOnboarded) {
    return <OnboardingScreen />;
  }

  // If user not logged in
  if (!isAlreadyLoggedIn) {
    return (
      <View className="pt-10 bg-white flex-1">
        <LoginScreen />
      </View>
    );
  }

  // If logged in, navigation effect will handle redirection
  return null;
}
