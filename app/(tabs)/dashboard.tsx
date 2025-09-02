import DashboardHeader from "@/components/dashboardComponents/DashboardHeader";
import DashboardStatistics from "@/components/dashboardComponents/DashboardStatistics";
import ExpireSoon from "@/components/dashboardComponents/ExpireSoon";
import axiosInstance from "@/utils/axiosInstance";
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
  const [expireSoonSubs, setExpireSoonSubs] = useState([]);
  const [expireSoonLoading, setExpireSoonLoading] = useState(false);
  const [dashboardStatsLoading, setDashboardStatsLoading] = useState(false);
  const [dashboardStats, setDashboardStats] = useState([]);
  const insets = useSafeAreaInsets();
  const isNavBarVisible = insets.bottom > 0;

  const encodedToken = useSelector((state: any) => state.auth.token);
  const token = decodeToken(encodedToken);

  const getDashboardStats = async () => {
    try {
      setDashboardStatsLoading(true);
      const response = await axiosInstance.get(`/mobile/workspaces/analytics`);
      if (response.status === 200) {
        setDashboardStats(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDashboardStatsLoading(false);
    }
  };

  const getExpireSoonSubs = async () => {
    try {
      setExpireSoonLoading(true);
      const response = await axiosInstance.get(
        `/mobile/workspaces/product-subscriptions/expire-soon`
      );
      if (response.status === 200) {
        setExpireSoonSubs(response.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setExpireSoonLoading(false);
    }
  };

  useEffect(() => {
    getDashboardStats();
    getExpireSoonSubs();
  }, [token]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    const runRefresh = () => {
      try {
        getExpireSoonSubs();
        getDashboardStats();
      } catch (error) {
        console.error("Error refreshing dashboard:", error);
      } finally {
        setRefreshing(false);
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
            <DashboardStatistics
              loading={dashboardStatsLoading}
              analytics={dashboardStats}
            />
            <ExpireSoon
              loading={expireSoonLoading}
              subscriptions={expireSoonSubs}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Dashboard;
