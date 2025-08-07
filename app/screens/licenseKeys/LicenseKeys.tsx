import DeleteModal from "@/components/reusableComponents/DeleteModal";
import AddLicenseModal from "@/components/subscriptionComponents/licenseKeyComponents/AddLicenseModal";
import EditLicenseModal from "@/components/subscriptionComponents/licenseKeyComponents/EditLicenseModal";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  findNodeHandle,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

// License key type
interface LicenseKey {
  id: string;
  name: string;
  status: "Active" | "Inactive" | "Expired";
  key: string;
  createdAt?: string;
}

const LicenseKeys = () => {
  // State: License keys
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
  ]);

  // Modal states
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  // Other states
  const [selectedLicense, setSelectedLicense] = useState<LicenseKey | null>(
    null
  );
  const [copiedLicenseId, setCopiedLicenseId] = useState<string | null>(null);

  // Dropdown menu states
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  const router = useRouter();

  // Refs
  const iconRefs = useRef<Record<string, any>>({});
  const screenHeight = Dimensions.get("window").height;

  // Helpers: Get status color classes
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

  // Handle dropdown toggle and position calculation
  const showActionDropdown = (license: LicenseKey) => {
    const iconRef = iconRefs.current[license.id];
    if (!iconRef) return;

    const node = findNodeHandle(iconRef);
    if (!node) return;

    UIManager.measure(node, (x, y, width, height, pageX, pageY) => {
      const dropdownHeight = 120;
      const positionY =
        pageY + height + dropdownHeight > screenHeight ?
          pageY - dropdownHeight
        : pageY + height;

      setDropdownPosition({ x: pageX, y: positionY });
      setSelectedLicense(license);
      setIsOptionsVisible(true);
    });
  };

  // Copy license key to clipboard
  const handleCopyKey = async (key: string, id: string) => {
    setCopiedLicenseId(id);
    await Clipboard.setStringAsync(key);
    setTimeout(() => setCopiedLicenseId(null), 1000);
  };

  // Handle add license
  const handleAddLicense = () => {
    Alert.alert("Add License", "Add new license functionality would go here");
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      <SafeAreaView className="flex-1 bg-[#f3f4f6]">
        {/* Header */}
        <View className="bg-[#f3f4f6] pt-2 pb-3 border-b border-gray-300">
          <View className="flex-row items-center justify-between px-5">
            <View>
              <TouchableOpacity
                onPress={() => router.back()}
                className=" rounded-full"
                activeOpacity={0.8}
              >
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <View>
              <Text className="text-2xl font-bold text-gray-900 mb-1">
                License Keys
              </Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setIsAddModalVisible(true)}
                className=""
                activeOpacity={0.8}
              >
                <Plus size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* License List */}
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
              className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mt-3"
            >
              {/* Title and Dropdown Icon */}
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1 mr-3">
                  <Text className="text-lg font-bold text-gray-900 mb-1">
                    {license.name}
                  </Text>
                  <View className="self-start px-3 py-1 rounded-full">
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
                  ref={ref => {
                    if (ref) iconRefs.current[license.id] = ref;
                  }}
                  onPress={() => showActionDropdown(license)}
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

              {/* Key Display Section */}
              <View className="bg-gray-50 rounded-xl p-4 mb-3">
                <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  License Key
                </Text>
                <TouchableOpacity
                  onPress={() => handleCopyKey(license.key, license.id)}
                  className="flex-row items-center justify-between"
                  activeOpacity={0.7}
                >
                  <Text className="text-base font-mono text-gray-800 flex-1">
                    {license.key}
                  </Text>
                  <View className="ml-3 bg-white p-2 rounded-lg">
                    {copiedLicenseId === license.id ?
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

              {/* Footer Date */}
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

      {/* Add Modal */}
      <AddLicenseModal
        isVisible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAdd={newLicense => {
          const newEntry: LicenseKey = {
            id: `${Date.now()}`,
            name: newLicense.name,
            key: newLicense.key,
            status: "Active",
            createdAt: new Date().toISOString().split("T")[0],
          };
          setLicenseKeys(prev => [newEntry, ...prev]);
        }}
      />

      {/* Edit Modal */}
      <EditLicenseModal
        isVisible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        onUpdate={() => {
          console.log("Updated license");
        }}
        license={selectedLicense}
      />

      {/* Dropdown options (Edit/Delete) */}
      {isOptionsVisible && (
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setIsOptionsVisible(false)}
          className="absolute top-0 left-0 right-0 bottom-0"
        >
          <View
            className="absolute bg-white rounded-md shadow-md border border-gray-200"
            style={{
              top: dropdownPosition.y + 4,
              left: dropdownPosition.x - 120,
              width: 140,
              zIndex: 1000,
            }}
          >
            <TouchableOpacity
              className="px-4 py-3 border-b border-gray-100"
              onPress={() => {
                setIsOptionsVisible(false);
                setIsEditModalVisible(true);
              }}
            >
              <Text className="text-black">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-4 py-3"
              onPress={() => {
                setIsOptionsVisible(false);
                setIsDeleteModalVisible(true);
              }}
            >
              <Text className="text-red-600">Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}

      {isDeleteModalVisible && (
        <DeleteModal
          visible={isDeleteModalVisible}
          onClose={() => setIsDeleteModalVisible(false)}
          onDelete={() => {
            setLicenseKeys(prev =>
              prev.filter(license => license.id !== selectedLicense?.id)
            );
            setIsDeleteModalVisible(false);
          }}
        />
      )}
    </>
  );
};

export default LicenseKeys;
