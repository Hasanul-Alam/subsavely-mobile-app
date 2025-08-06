import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

interface LicenseKey {
  id: string;
  name: string;
  status: "Active" | "Inactive" | "Expired";
  key: string;
  createdAt?: string;
}

const LicenseKeys = () => {
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  // Sample license keys data - replace with your actual data
  const [licenseKeys, setLicenseKeys] = useState<LicenseKey[]>([
    {
      id: "1",
      name: "React native license key",
      status: "Active",
      key: "dsaf43dfaij",
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      name: "Web application license",
      status: "Active",
      key: "xyz789abc123",
      createdAt: "2024-01-10",
    },
    {
      id: "3",
      name: "Mobile app premium",
      status: "Expired",
      key: "exp456def789",
      createdAt: "2023-12-01",
    },
    {
      id: "4",
      name: "Development license",
      status: "Inactive",
      key: "dev123ghi456",
      createdAt: "2024-01-05",
    },
    {
      id: "5",
      name: "Cloud service license",
      status: "Active",
      key: "cloud987xyz",
      createdAt: "2024-02-01",
    },
    {
      id: "6",
      name: "Enterprise pack",
      status: "Expired",
      key: "entpack123xyz",
      createdAt: "2023-11-20",
    },
    {
      id: "7",
      name: "Test environment key",
      status: "Inactive",
      key: "testenv888aaa",
      createdAt: "2024-03-01",
    },
    {
      id: "8",
      name: "React pro license",
      status: "Active",
      key: "reactpro321abc",
      createdAt: "2024-01-25",
    },
    {
      id: "9",
      name: "Flutter trial license",
      status: "Expired",
      key: "fluttertrial987",
      createdAt: "2023-10-15",
    },
    {
      id: "10",
      name: "Vue premium license",
      status: "Active",
      key: "vue999pkg",
      createdAt: "2024-02-10",
    },
    {
      id: "11",
      name: "Backend API key",
      status: "Active",
      key: "api123backend",
      createdAt: "2024-02-15",
    },
    {
      id: "12",
      name: "iOS license key",
      status: "Inactive",
      key: "ioskey123456",
      createdAt: "2024-01-12",
    },
    {
      id: "13",
      name: "Android license key",
      status: "Expired",
      key: "android456key",
      createdAt: "2023-09-25",
    },
    {
      id: "14",
      name: "CRM system key",
      status: "Active",
      key: "crm456syskey",
      createdAt: "2024-03-05",
    },
    {
      id: "15",
      name: "POS system license",
      status: "Active",
      key: "possys987lkj",
      createdAt: "2024-03-10",
    },
    {
      id: "16",
      name: "Beta tester license",
      status: "Inactive",
      key: "beta123tester",
      createdAt: "2024-02-18",
    },
    {
      id: "17",
      name: "Legacy system key",
      status: "Expired",
      key: "legacykey001",
      createdAt: "2023-08-01",
    },
    {
      id: "18",
      name: "Demo license",
      status: "Active",
      key: "demo998877",
      createdAt: "2024-01-30",
    },
    {
      id: "19",
      name: "CI/CD integration key",
      status: "Inactive",
      key: "cicdkey999",
      createdAt: "2024-02-22",
    },
    {
      id: "20",
      name: "Analytics package",
      status: "Active",
      key: "analytics555pkg",
      createdAt: "2024-02-27",
    },
    {
      id: "21",
      name: "AI module license",
      status: "Active",
      key: "ai222module",
      createdAt: "2024-03-01",
    },
    {
      id: "22",
      name: "Design tool access",
      status: "Inactive",
      key: "designtoolkey",
      createdAt: "2024-01-17",
    },
    {
      id: "23",
      name: "Marketing platform",
      status: "Expired",
      key: "marketingx999",
      createdAt: "2023-12-22",
    },
    {
      id: "24",
      name: "Firebase integration",
      status: "Active",
      key: "firebaseintkey",
      createdAt: "2024-03-03",
    },
    {
      id: "25",
      name: "Webhooks license",
      status: "Active",
      key: "webhooky987",
      createdAt: "2024-03-07",
    },
    {
      id: "26",
      name: "Customer portal key",
      status: "Inactive",
      key: "custport444",
      createdAt: "2024-02-05",
    },
    {
      id: "27",
      name: "Admin dashboard",
      status: "Active",
      key: "admindash007",
      createdAt: "2024-02-09",
    },
    {
      id: "28",
      name: "Node.js license",
      status: "Expired",
      key: "node987xyz",
      createdAt: "2023-10-20",
    },
    {
      id: "29",
      name: "Email service key",
      status: "Active",
      key: "emailserve456",
      createdAt: "2024-01-08",
    },
    {
      id: "30",
      name: "DevOps pipeline license",
      status: "Inactive",
      key: "devopskey001",
      createdAt: "2024-02-20",
    },
  ]);
  // const [licenseKeys, setLicenseKeys] = useState<LicenseKey[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500";
      case "Inactive":
        return "bg-gray-400";
      case "Expired":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case "Active":
        return "text-green-700";
      case "Inactive":
        return "text-gray-600";
      case "Expired":
        return "text-red-700";
      default:
        return "text-gray-600";
    }
  };

  const handleAddLicense = () => {
    Alert.alert("Add License", "Add new license functionality would go here");
  };

  const handleActionMenu = (licenseKey: LicenseKey) => {
    Alert.alert("License Actions", `Actions for ${licenseKey.name}`, [
      { text: "Edit", onPress: () => console.log("Edit license") },
      { text: "Deactivate", onPress: () => console.log("Deactivate license") },
      {
        text: "Delete",
        onPress: () => console.log("Delete license"),
        style: "destructive",
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const copyToClipboard = async (key: string, id: string) => {
    setCopiedKeyId(id);
    await Clipboard.setStringAsync(key);
    setTimeout(() => setCopiedKeyId(null), 1000);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      <SafeAreaView className="flex-1 bg-[#f3f4f6]">
        {/* Modern Header with Shadow */}
        <View className="bg-[#f3f4f6] mb-2 rounded-2xl px-6 py-2">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-2xl font-bold text-gray-900 mb-1">
                License Keys
              </Text>
              <Text className="text-sm text-gray-500">
                Manage your active licenses
              </Text>
            </View>
            <TouchableOpacity
              onPress={handleAddLicense}
              className="bg-blue-600 px-4 py-3 rounded-xl flex-row items-center shadow-sm"
              activeOpacity={0.8}
            >
              <Ionicons name="add" size={18} color="white" />
              <Text className="text-white font-semibold ml-1">Add</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={licenseKeys}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View className="flex-1 justify-center items-center px-4 py-16">
              <Animated.View
                entering={FadeIn.duration(500)}
                className="items-center"
              >
                <View className="bg-blue-100 p-6 rounded-full mb-6">
                  <Ionicons name="key-outline" size={48} color="#3B82F6" />
                </View>
                <Text className="text-gray-800 text-xl font-bold mb-2">
                  No License Keys
                </Text>
                <Text className="text-gray-500 text-center mb-8 max-w-xs leading-6">
                  Create your first license key to get started with managing
                  your licenses
                </Text>
                <TouchableOpacity
                  onPress={handleAddLicense}
                  activeOpacity={0.8}
                  className="bg-blue-600 px-8 py-4 rounded-xl shadow-sm"
                >
                  <View className="flex-row items-center">
                    <Ionicons name="add" size={20} color="white" />
                    <Text className="text-white font-semibold ml-2 text-base">
                      Create License Key
                    </Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </View>
          }
          renderItem={({ item: license }) => (
            <Animated.View
              entering={FadeIn.duration(300)}
              className="bg-white rounded-2xl p-5 mb-3 shadow-sm border border-gray-100"
            >
              {/* Header Row */}
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1 mr-3">
                  <Text className="text-lg font-bold text-gray-900 mb-1">
                    {license.name}
                  </Text>
                  <View className={`self-start px-3 py-1 rounded-full `}>
                    <View className="flex-row items-center">
                      <View
                        className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(license.status)}`}
                      />
                      <Text
                        className={`text-xs font-semibold ${getStatusTextColor(license.status)}`}
                      >
                        {license.status.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => handleActionMenu(license)}
                  className="p-2 rounded-lg bg-gray-50"
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={20}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>

              {/* License Key Section */}
              <View className="bg-gray-50 rounded-xl p-4 mb-3">
                <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  License Key
                </Text>
                <TouchableOpacity
                  onPress={() => copyToClipboard(license.key, license.id)}
                  className="flex-row items-center justify-between"
                  activeOpacity={0.7}
                >
                  <Text className="text-base font-mono text-gray-800 flex-1">
                    {license.key}
                  </Text>
                  <View className="ml-3 bg-white p-2 rounded-lg">
                    {copiedKeyId === license.id ?
                      <Animated.View entering={FadeIn.duration(200)}>
                        <Ionicons
                          name="checkmark-done"
                          size={16}
                          color="green"
                        />
                      </Animated.View>
                    : <Ionicons name="copy-outline" size={16} color="#6B7280" />
                    }
                  </View>
                </TouchableOpacity>
              </View>

              {/* Footer */}
              {license.createdAt && (
                <View className="flex-row items-center">
                  <Ionicons name="calendar-outline" size={14} color="#9CA3AF" />
                  <Text className="text-xs text-gray-500 ml-2">
                    Created on{" "}
                    {new Date(license.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </Text>
                </View>
              )}
            </Animated.View>
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default LicenseKeys;
