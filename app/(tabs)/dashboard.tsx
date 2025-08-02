import DashboardHeader from "@/components/dashboardComponents/DashboardHeader";
import DashboardStatistics from "@/components/dashboardComponents/DashboardStatistics";
import ExpireSoon from "@/components/dashboardComponents/ExpireSoon";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, StatusBar, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const Dashboard = () => {
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();
  const isNavBarVisible = insets.bottom > 0;

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate an async data reload (e.g., API call or state update)
    setTimeout(() => {
      // Add your real data reload logic here
      setRefreshing(false);
    }, 1500); // Delay for demo purpose
  }, []);

  return (
    <SafeAreaView
      className={`flex-1 bg-[#f3f4f6]`}
      style={{ paddingBottom: isNavBarVisible ? insets.bottom + 20 : 50 }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View className="px-4">
          <DashboardHeader />
          <DashboardStatistics />
          <ExpireSoon />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
