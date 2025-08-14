import DashboardHeader from "@/components/dashboardComponents/DashboardHeader";
import DashboardStatistics from "@/components/dashboardComponents/DashboardStatistics";
import ExpireSoon from "@/components/dashboardComponents/ExpireSoon";
import { decodeToken } from "@/utils/tokenEncoderDecoder";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, StatusBar, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();
  const isNavBarVisible = insets.bottom > 0;

  const encodedToken = useSelector((state: any) => state.auth.token);
  const token = decodeToken(encodedToken);

  const getDashboardStats = () => {
    console.log("getting dashboard info with token: ");
  };

  const getExpireSoon = () => {
    console.log("getting expire soon info with token: ");
  };

  useEffect(() => {
    getDashboardStats();
    getExpireSoon();
  }, [token]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true); // optional: show skeletons/spinner in child components

    const runRefresh = async () => {
      try {
        await getDashboardStats(); // call API or update state
        await getExpireSoon(); // call API or update state
      } catch (error) {
        console.error("Error refreshing dashboard:", error);
      } finally {
        setRefreshing(false);
        setLoading(false);
      }
    };

    runRefresh();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      <SafeAreaView
        className={`flex-1 bg-[#f3f4f6]`}
        style={{ paddingBottom: isNavBarVisible ? insets.bottom + 20 : 50 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["green", "blue", "red", "brown"]}
            />
          }
        >
          <View className="px-4">
            <DashboardHeader />
            <DashboardStatistics loading={loading} />
            <ExpireSoon loading={loading} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Dashboard;
