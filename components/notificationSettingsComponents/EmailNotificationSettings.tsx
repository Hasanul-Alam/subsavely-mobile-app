import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";

const EmailNotificationSettings = () => {
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] =
    useState(false);
  return (
    <View className="bg-white rounded-2xl p-5 mb-5 shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-1 pr-4">
          <Text className="text-lg font-semibold text-gray-900">
            Email Notifications
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            Get important updates and reminders via email
          </Text>
        </View>
        <Switch
          value={emailNotificationsEnabled}
          onValueChange={setEmailNotificationsEnabled}
          trackColor={{ false: "#D1D5DB", true: "#22c065" }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#D1D5DB"
        />
      </View>

      {/* Emails List */}
      <Text className="text-base font-semibold text-gray-800 mb-2">
        Notification Emails
      </Text>
      <View className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
        <Text className="text-gray-500 text-sm">
          No email addresses added yet
        </Text>
      </View>

      {/* Add Email Button */}
      <TouchableOpacity className="bg-primary flex-row items-center justify-center py-3 rounded-lg active:opacity-80">
        <Feather name="plus" size={18} color="white" />
        <Text className="text-white text-base font-semibold ml-2">
          Add New Email
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmailNotificationSettings;
