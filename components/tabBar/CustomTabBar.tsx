import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface TabItem {
  name: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
}

const tabs: TabItem[] = [
  {
    name: "home",
    label: "Home",
    icon: "home-outline",
    route: "/dashboard",
  },
  {
    name: "subscriptions",
    label: "Subscriptions",
    icon: "bag-outline",
    route: "/subscriptions",
  },
  {
    name: "settings",
    label: "Settings",
    icon: "settings-outline",
    route: "/settings",
  },
];

export default function CustomTabBar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleTabPress = (route: string) => {
    if (pathname !== route) {
      // @ts-ignore
      router.push(route);
    }
  };

  const isActive = (route: string) => {
    if (route === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(route);
  };

  return (
    <View className="flex-row bg-white py-2 px-4 border-t border-gray-200 shadow-top shadow-black shadow-opacity-10">
      {tabs.map((tab) => {
        const active = isActive(tab.route);
        return (
          <TouchableOpacity
            key={tab.name}
            className="flex-1 items-center py-2 relative"
            onPress={() => handleTabPress(tab.route)}
            activeOpacity={0.7}
          >
            <View className="mb-1">
              <Ionicons
                name={tab.icon}
                size={24}
                color={active ? "#8B5CF6" : "#6B7280"}
              />
            </View>
            <Text
              className={`text-xs font-medium ${active ? "text-violet-500" : "text-gray-500"}`}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
