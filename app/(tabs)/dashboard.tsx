import DashboardHeader from "@/components/dashboardComponents/DashboardHeader";
import DashboardStatistics from "@/components/dashboardComponents/DashboardStatistics";
import ExpireSoon from "@/components/dashboardComponents/ExpireSoon";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Dashboard = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate an async data reload (e.g., API call or state update)
    setTimeout(() => {
      // Add your real data reload logic here
      setRefreshing(false);
    }, 1500); // Delay for demo purpose
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100 pb-10">
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      <View className="px-4">
        <DashboardHeader />
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <DashboardStatistics />
          <ExpireSoon />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
