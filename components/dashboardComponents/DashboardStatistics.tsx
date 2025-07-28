import {
  CalendarCheck2,
  CircleCheck,
  ClockAlert,
  WalletCards,
} from "lucide-react-native";
import React, { useState } from "react";
import { Text, View } from "react-native";
import DashboardStatisticsSkeleton from "../skeletons/DashboardStatisticsSkeleton";

// Mapping icon names to Lucide components
const iconMap: Record<string, any> = {
  "wallet-cards": WalletCards,
  "circle-check": CircleCheck,
  "clock-alert": ClockAlert,
  "calendar-sync": CalendarCheck2,
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
    icon: "calendar-sync",
    iconColor: "#3B82F6",
    cardColor: "#ffecba",
  },
];

// Utility to lighten a hex color
// const lightenColor = (hex: string, amount = 0.3) => {
//   let normalizedHex = hex.replace("#", "");

//   if (normalizedHex.length === 3) {
//     normalizedHex = normalizedHex
//       .split("")
//       .map((char) => char + char)
//       .join("");
//   }

//   const num = parseInt(normalizedHex, 16);
//   const r = Math.min(255, ((num >> 16) & 0xff) + 255 * amount);
//   const g = Math.min(255, ((num >> 8) & 0xff) + 255 * amount);
//   const b = Math.min(255, (num & 0xff) + 255 * amount);

//   return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
// };

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
    <View className="pt-10">
      {/* Total Expense Card */}
      <View className="bg-black rounded-xl p-4 flex-row items-center justify-between">
        <View className="p-3">
          <Text className="text-black text-lg font-bold">💰</Text>
        </View>
        <View className="ml-4">
          <View className="flex-row items-center justify-end">
            <Text className="text-white text-2xl font-bold mr-2">$</Text>
            <Text className="text-white text-2xl font-bold">1,234.56</Text>
          </View>
          <View>
            <Text className="text-gray-400 text-xs">
              Total Expenses for this month
            </Text>
          </View>
        </View>
      </View>

      {/* Metric Cards Grid */}
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
