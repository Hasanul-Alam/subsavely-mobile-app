import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

const subscriptionData = [
  {
    id: 1,
    title: "Total Subs",
    value: "24",
    icon: "list",
    iconColor: "#3B82F6",
    iconBg: "#EFF6FF",
  },
  {
    id: 2,
    title: "Active Subs",
    value: "18",
    icon: "refresh",
    iconColor: "#10B981",
    iconBg: "#F0FDF4",
  },
  {
    id: 3,
    title: "Expired Subs",
    value: "6",
    icon: "warning",
    iconColor: "#EF4444",
    iconBg: "#FEF2F2",
  },
  {
    id: 4,
    title: "July Renewals",
    value: "12",
    icon: "calendar",
    iconColor: "#3B82F6",
    iconBg: "#EFF6FF",
  },
  {
    id: 5,
    title: "July Remaining",
    value: "$2,450",
    icon: "hourglass",
    iconColor: "#8B5CF6",
    iconBg: "#F5F3FF",
  },
  {
    id: 6,
    title: "Expense/Yearly",
    value: "$1,245.67",
    subtitle: "EST",
    secondaryValue: "/14,948",
    icon: "cash",
    iconColor: "#F59E0B",
    iconBg: "#FFFBEB",
  },
];

const MetricCard = ({ item }: any) => (
  <View className="bg-white rounded-lg p-[16px] ml-0 border border-gray-200 mx-3">
    <View className="flex-row items-center gap-2 justify-between">
      <View>
        <Ionicons name={item.icon} size={30} color={item.iconColor} />
      </View>
      <View className="flex-1">
        <Text className="text-right text-gray-500 text-sm">{item.title}</Text>
        <Text className="text-right font-semibold text-lg">{item.value}</Text>
      </View>
    </View>
  </View>
);

const DashboardStatistics = () => {
  return (
    <View className="pt-10">
      <View className="bg-black rounded-xl p-4 flex-row items-center justify-between">
        {/* expense icon */}
        <View className=" p-3">
          <Text className="text-black text-lg font-bold">💰</Text>
        </View>
        {/* expense amount */}
        <View className="ml-4">
          <View className="flex-row items-center justify-end">
            {/* Dollar icon */}
            <Text className="text-white text-2xl font-bold mr-2">$</Text>
            {/* Amount */}
            <Text className="text-white text-2xl font-bold">1,234.56</Text>
          </View>
          <View>
            <Text className="text-gray-400 text-xs">
              Total Expenses for this month
            </Text>
          </View>
        </View>
      </View>
      {/* Metric Cards */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          paddingVertical: 5,
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        {subscriptionData.map((item) => (
          <View key={item.id} style={{ width: "50%", marginBottom: 10 }}>
            <MetricCard item={item} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default DashboardStatistics;
