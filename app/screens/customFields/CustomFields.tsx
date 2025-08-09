import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const customFields = [
  { keyName: "Greetings", value: "Hello" },
  { keyName: "Country", value: "Bangladesh" },
  { keyName: "Weather", value: "Sunny" },
];

const renderItem = ({ item }: { item: { keyName: string; value: string } }) => (
  <View className="flex-row justify-between px-4 py-3 border-b border-gray-100">
    <Text className="text-base text-gray-800">{item.keyName}</Text>
    <Text className="text-base text-gray-600">{item.value}</Text>
  </View>
);

const CustomFields = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#f3f4f6]">
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />
      <View className=" border-b border-gray-300 px-4 pb-3 pt-2">
        <View className="flex-row items-center justify-between">
          {/* back button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <Text className="text-2xl font-bold text-gray-900">
              Custom Fields
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => console.log("Add Custom Field")}
            className=""
            activeOpacity={0.8}
          >
            <Plus size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="bg-white rounded-xl shadow mx-3 my-4 overflow-hidden">
        {/* Header
        <Text className="text-lg font-semibold px-4 py-3 border-b border-gray-200">
          Custom Fields
        </Text> */}

        {/* Table header row */}
        <View className="flex-row justify-between px-4 py-2 bg-white border-b border-gray-200">
          <Text className="text-base font-semibold">Key</Text>
          <Text className="text-base font-semibold">Value</Text>
        </View>

        {/* Data rows */}
        <FlatList
          data={customFields}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
};

export default CustomFields;
