import CustomTabBar from "@/components/tabBar/CustomTabBar";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
// import CustomTabBar from "../../components/CustomTabBar";

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="subscriptions" options={{ headerShown: false }} />
        <Stack.Screen name="settings" options={{ headerShown: false }} />
        <Stack.Screen name="cart" options={{ headerShown: false }} />
        <Stack.Screen name="search" options={{ headerShown: false }} />
      </Stack>
      <CustomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
