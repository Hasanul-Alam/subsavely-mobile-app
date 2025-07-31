"use client";

import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
  const insets = useSafeAreaInsets();

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
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#ffffff",
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: Math.max(insets.bottom, 8), // Ensure minimum padding
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5, // For Android shadow
      }}
    >
      {tabs.map((tab) => {
        const active = isActive(tab.route);
        return (
          <TouchableOpacity
            key={tab.name}
            style={{
              flex: 1,
              alignItems: "center",
              paddingVertical: 8,
            }}
            onPress={() => handleTabPress(tab.route)}
            activeOpacity={0.7}
          >
            <View style={{ marginBottom: 4 }}>
              <Ionicons
                name={tab.icon}
                size={24}
                color={active ? "#8B5CF6" : "#6B7280"}
              />
            </View>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                color: active ? "#8B5CF6" : "#6B7280",
              }}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
