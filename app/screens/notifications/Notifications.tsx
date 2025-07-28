import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Notifications = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Status Bar */}
      <StatusBar barStyle="dark-content" />

      {/* Header Section */}
      <View className="border-b border-gray-300 py-3">
        <View className="flex-row items-center justify-between px-4">
          {/* Back Button */}
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          {/* Heading */}
          <Text className="text-2xl font-semibold text-gray-900">
            Notifications
          </Text>
          {/* Mark as all button */}
          <TouchableOpacity activeOpacity={0.8}>
            <Ionicons name="checkmark-done-sharp" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Notifications;
