import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ActivityItem {
  id: string;
  message: string;
  timestamp?: string;
}

const ActivityLogs = () => {
  const router = useRouter();
  const colors = [
    "bg-purple-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-orange-500",
    "bg-red-500",
    "bg-pink-500",
    "bg-yellow-500",
    "bg-teal-500",
    "bg-indigo-500",
  ];

  const activityItems: ActivityItem[] = [
    {
      id: "1",
      message: "Subscription has been created",
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      message: "Profile updated successfully",
      timestamp: "1 day ago",
    },
    { id: "3", message: "Payment method added", timestamp: "3 days ago" },
    {
      id: "4",
      message: "Account verification completed",
      timestamp: "1 week ago",
    },
    { id: "5", message: "Welcome email sent", timestamp: "1 week ago" },
    { id: "6", message: "Password changed", timestamp: "2 weeks ago" },
    { id: "7", message: "New login from Chrome", timestamp: "3 weeks ago" },
    {
      id: "8",
      message: "Billing information updated",
      timestamp: "4 weeks ago",
    },
    {
      id: "9",
      message: "Two-factor authentication enabled",
      timestamp: "1 month ago",
    },
    { id: "10", message: "Payment failed", timestamp: "2 months ago" },
    { id: "11", message: "Payment succeeded", timestamp: "2 months ago" },
    { id: "12", message: "Contact info updated", timestamp: "2 months ago" },
    { id: "13", message: "Account deactivated", timestamp: "3 months ago" },
    { id: "14", message: "Account reactivated", timestamp: "3 months ago" },
    {
      id: "15",
      message: "Email preferences changed",
      timestamp: "3 months ago",
    },
    {
      id: "16",
      message: "Subscribed to newsletter",
      timestamp: "3 months ago",
    },
    {
      id: "17",
      message: "Unsubscribed from newsletter",
      timestamp: "4 months ago",
    },
    { id: "18", message: "Connected with support", timestamp: "4 months ago" },
    { id: "19", message: "Security alert sent", timestamp: "4 months ago" },
    { id: "20", message: "Subscription renewed", timestamp: "5 months ago" },
    { id: "21", message: "Subscription cancelled", timestamp: "5 months ago" },
    { id: "22", message: "Trial period started", timestamp: "5 months ago" },
    { id: "23", message: "Trial ended", timestamp: "6 months ago" },
    { id: "24", message: "App updated", timestamp: "6 months ago" },
    { id: "25", message: "Bug reported", timestamp: "6 months ago" },
    { id: "26", message: "Bug fixed", timestamp: "6 months ago" },
    { id: "27", message: "Feature requested", timestamp: "6 months ago" },
    { id: "28", message: "Feature released", timestamp: "7 months ago" },
    { id: "29", message: "Invitation sent", timestamp: "7 months ago" },
    { id: "30", message: "Invitation accepted", timestamp: "7 months ago" },
  ];

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      <SafeAreaView className="flex-1 bg-[#f3f4f6]">
        <View className="flex-row items-center justify-between px-6 bg-[#f3f4f6]">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.8}
            className="p-2 rounded-full"
          >
            <Ionicons name="arrow-back" size={22} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold text-gray-900">
            Activity Logs
          </Text>
          <View className="w-8" />
        </View>

        <FlatList
          data={activityItems}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingVertical: 16,
            paddingBottom: 40,
          }}
          renderItem={({ item, index }) => (
            <View className="flex-row items-start bg-white px-4 py-3 rounded-xl shadow-sm mb-2 gap-2">
              <View
                className={`w-3 h-3 rounded-full mt-1.5 ${colors[index % colors.length]}`}
              />
              <View>
                <Text className="text-base text-gray-900 font-medium">
                  {item.message}
                </Text>
                {item.timestamp && (
                  <Text className="text-sm text-gray-500 mt-1">
                    {item.timestamp}
                  </Text>
                )}
              </View>
            </View>
          )}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center py-20">
              <Ionicons
                name="notifications-off-outline"
                size={60}
                color="#9CA3AF"
              />
              <Text className="text-gray-500 text-base text-center mt-4">
                No activity to show yet
              </Text>
            </View>
          }
        />
      </SafeAreaView>
    </>
  );
};

export default ActivityLogs;
