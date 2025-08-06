import {
  CalendarCheck2,
  CalendarSync,
  CircleCheck,
  ClockAlert,
  Hourglass,
  WalletCards,
} from "lucide-react-native";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import DashboardStatisticsSkeleton from "../skeletons/DashboardStatisticsSkeleton";

// Mapping icon names to Lucide components
const iconMap: Record<string, any> = {
  "wallet-cards": WalletCards,
  "circle-check": CircleCheck,
  "clock-alert": ClockAlert,
  "calendar-check": CalendarCheck2,
  "calendar-sync": CalendarSync,
  hourglass: Hourglass,
};

// Sample subscription data
const subscriptionData = [
  {
    id: 1,
    title: "Total Subs",
    value: "24",
    icon: "wallet-cards",
    iconColor: "#3B82F6",
    cardColor: "#d7d2ff",
  },
  {
    id: 2,
    title: "Active Subs",
    value: "18",
    icon: "circle-check",
    iconColor: "#10B981",
    cardColor: "#abe7d8",
  },
  {
    id: 3,
    title: "Expired Subs",
    value: "6",
    icon: "clock-alert",
    iconColor: "#EF4444",
    cardColor: "#f8d9d9",
  },
  {
    id: 6,
    title: "Expense/Year",
    value: "$1,245.18",
    subtitle: "EST",
    secondaryValue: "/14,948",
    icon: "calendar-check",
    iconColor: "#3B82F6",
    cardColor: "#ffecba",
  },
  {
    id: 4,
    title: "July Renewals",
    value: 23,
    icon: "calendar-sync",
    cardColor: "#f9e3fa",
  },
  {
    id: 5,
    title: " Remaining",
    value: "$2,450",
    icon: "hourglass",
    cardColor: "#a5ccff",
  },
];

// Single metric card component
const MetricCard = ({ item }: any) => {
  const IconComponent = iconMap[item.icon];
  // const lightIconBg = lightenColor(item.cardColor); // lighter icon background

  return (
    <View
      style={{
        backgroundColor: item.cardColor,
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 6,
      }}
    >
      <View className="flex-row items-center justify-between">
        <View
          style={{
            backgroundColor: "white",
            padding: 8,
            borderRadius: 999,
          }}
        >
          {IconComponent && (
            <IconComponent size={24} color={"#000"} strokeWidth={2.5} />
          )}
        </View>
        <View className="flex-1 ">
          <Text className="text-right text-gray-700 text-sm">{item.title}</Text>
          <Text className="text-right font-semibold text-lg">{item.value}</Text>
        </View>
      </View>
    </View>
  );
};

// Main dashboard statistics component
const DashboardStatistics = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <DashboardStatisticsSkeleton />;
  }
  return (
    <View className="pt-5">
      {/* Total Expense Card */}
      <View className="bg-[#e1f0d4] rounded-3xl px-4 py-3 flex-row items-center justify-between overflow-hidden">
        <View className="p-0">
          <Image
            source={require("../../assets/images/Dashboard-card.png")}
            style={{ width: 80, height: 80 }}
          />
        </View>
        <View className="ml-4">
          <View className="flex-row items-center justify-end">
            <Text className="text-black text-2xl font-bold mr-2">$</Text>
            <Text className="text-black text-2xl font-bold">1,234.56</Text>
          </View>
          <View>
            <Text className="text-slate-500 text-xs">
              Total Expenses for this month
            </Text>
            {/* <Text className="text-[#5a7d36] text-xs">
              Total Expenses for this month
            </Text> */}
          </View>
        </View>
      </View>

      {/* Metric Cards Grid */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          paddingBottom: 5,
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        {subscriptionData.map(item => (
          <View key={item.id} style={{ width: "50%", marginBottom: 10 }}>
            <MetricCard item={item} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default DashboardStatistics;
