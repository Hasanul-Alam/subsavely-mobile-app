import { getItem } from "@/utils/useSecureStorage";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import OnboardingScreen from "./screens/onboardingScreens/OnboardingScreen1";

export default function HomeScreen() {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null); // null = loading

  const handleShowOnboarding = async () => {
    const onboarded = await getItem("isOnboarded");
    console.log("Onboarding status:", onboarded);
    setIsOnboarded(onboarded === "true");
  };

  useEffect(() => {
    handleShowOnboarding();
  }, []);

  // Optional: show nothing while loading
  if (isOnboarded === null) return null;

  if (!isOnboarded) {
    return <OnboardingScreen />;
  }

  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text className="text-2xl font-bold text-red-400">
        Welcome to Expo Router!
      </Text>
    </View>
  );
}
