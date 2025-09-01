import { Clipboard } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const EmptySubscription = ({
  title = "No Subscription Found",
  message = "You don't have any active subscriptions at the moment.",
  showRetryButton = true,
  showBrowseButton = true,
}: any) => {
  return (
    <View className="flex-1 justify-center items-center px-6 py-8 bg-[#f3f4f6]">
      {/* Icon Container */}
      <View className="w-20 h-20 bg-gray-200 rounded-full justify-center items-center mb-6">
        <Clipboard size={30} color="#676767" />
      </View>

      {/* Title */}
      <Text className="text-xl font-bold text-gray-800 text-center mb-3">
        {title}
      </Text>

      {/* Message */}
      <Text className="text-base text-gray-600 text-center mb-8 leading-6">
        {message}
      </Text>

      {/* Action Buttons */}
      <View className="w-full space-y-3">
        {showBrowseButton && (
          <TouchableOpacity
            onPress={() => console.log("Browse Pressed")}
            className="bg-blue-600 rounded-lg py-4 px-6 w-full"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-center text-base">
              Browse Subscriptions
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default EmptySubscription;
