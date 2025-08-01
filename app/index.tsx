import useInternetCheck from "@/hooks/useInternetCheck";
import { getItem } from "@/utils/useSecureStorage";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import LoginScreen from "./screens/login/LoginScreen";
import OnboardingScreen from "./screens/onboardingScreens/OnboardingScreen1";

export default function HomeScreen() {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null); // null = loading
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);

  const handleShowOnboarding = async () => {
    const onboarded = await getItem("isOnboarded");
    console.log("Onboarding status:", onboarded);
    setIsOnboarded(onboarded === "true");
  };

  const handleGetLoginStatus = async () => {
    const loginStatus = await getItem("isLoggedIn");
    setIsAlreadyLoggedIn(loginStatus === "true");
    console.log("Login status:", loginStatus);
  };

  // Check internet connection
  useInternetCheck();

  useEffect(() => {
    handleShowOnboarding();
    handleGetLoginStatus();
  }, []);

  // Optional: show nothing while loading
  if (isOnboarded === null) return null;

  if (!isOnboarded) {
    return <OnboardingScreen />;
  }

  if (!isAlreadyLoggedIn) {
    return (
      <View className="pt-10 bg-white flex-1">
        <LoginScreen />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text className="text-2xl font-bold text-red-400">
        Welcome to Expo Router!
      </Text>
    </View>
  );
}
