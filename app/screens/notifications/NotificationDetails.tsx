import React from "react";
import { StatusBar, Text, View } from "react-native";

const NotificationDetails = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Text>NotificationDetails</Text>
    </View>
  );
};

export default NotificationDetails;
