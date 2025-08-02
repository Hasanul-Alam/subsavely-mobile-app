import { useNavigationBar } from "@/hooks/useNavigationBar";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  // Use the custom hook to set navigation bar color
  useNavigationBar({
    backgroundColor: "#000000",
    buttonStyle: "light",
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0,
          height: Platform.OS === "android" ? 70 + insets.bottom : 70,
          paddingTop: 5,
          paddingBottom: Platform.OS === "android" ? insets.bottom : 0,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarActiveTintColor: "#000000",
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="home"
              size={24}
              color={focused ? "#6385b2" : "black"}
            />
          ),
          tabBarActiveTintColor: "#6385b2",
        }}
      />
      <Tabs.Screen
        name="subscriptions"
        options={{
          headerShown: false,
          tabBarLabel: "Subscriptions",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="subscriptions"
              size={24}
              color={focused ? "#6385b2" : "black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarLabel: "Settings",
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="settings"
              size={24}
              color={focused ? "#6385b2" : "black"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
