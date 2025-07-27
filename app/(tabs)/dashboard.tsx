import DashboardHeader from "@/components/dashboardComponents/DashboardHeader";
import DashboardStatistics from "@/components/dashboardComponents/DashboardStatistics";
import ExpireSoon from "@/components/dashboardComponents/ExpireSoon";
import React from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <StatusBar barStyle="dark-content" />
      <View className="px-4">
        {/* DashboardHeader Component */}
        <DashboardHeader />
        <ScrollView showsVerticalScrollIndicator={false} className="">
          {/* DashboardStatistics Component */}
          <DashboardStatistics />
          {/* ExpireSoon Component */}
          <ExpireSoon />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
