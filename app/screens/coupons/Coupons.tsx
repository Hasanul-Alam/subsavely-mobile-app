import AddCouponModal from "@/components/subscriptionComponents/couponsComponents/AddCouponModal";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Coupon {
  id: string;
  name: string;
  discountAmount: string;
  code: string;
  expiryDate: string;
  notes: string;
}

const Coupons = () => {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const router = useRouter();
  // Sample coupon data
  const coupons: Coupon[] = [
    {
      id: "1",
      name: "Summer Sale",
      discountAmount: "20% OFF",
      code: "SUMMER20",
      expiryDate: "2028-08-31",
      notes: "Valid on all summer collection items",
    },
    {
      id: "2",
      name: "First Time Buyer",
      discountAmount: "$10 OFF",
      code: "WELCOME10",
      expiryDate: "2028-12-31",
      notes: "Minimum purchase of $50 required",
    },
    {
      id: "3",
      name: "Flash Deal",
      discountAmount: "30% OFF",
      code: "FLASH30",
      expiryDate: "2024-08-15",
      notes: "Limited time offer - expires soon!",
    },
    {
      id: "4",
      name: "Student Discount",
      discountAmount: "15% OFF",
      code: "STUDENT15",
      expiryDate: "2028-09-30",
      notes: "Valid student ID required",
    },
    {
      id: "5",
      name: "Free Shipping",
      discountAmount: "10% OFF",
      code: "FREESHIP10",
      expiryDate: "2028-10-15",
      notes: "Get the free shipping discount",
    },
  ];

  const handleEdit = (couponId: string) => {
    console.log(`Edit coupon ${couponId}`);
    // Navigate to edit screen or show edit modal
  };

  const handleDelete = (couponId: string) => {
    console.log(`Delete coupon ${couponId}`);
    // Show confirmation dialog and delete coupon
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isExpired = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  const renderCouponItem = ({ item }: { item: Coupon }) => (
    <View className="bg-white mx-4 mb-4 rounded-xl shadow-sm border border-gray-100">
      {/* Header with name */}
      <View className="p-4 pb-2">
        <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
      </View>

      {/* Discount amount */}
      <View className="px-4 pb-2">
        <View className="bg-green-100 self-start px-3 py-1 rounded-full">
          <Text className="text-green-700 font-semibold text-sm">
            {item.discountAmount}
          </Text>
        </View>
      </View>

      {/* Code with Copy button */}
      <View className="px-4 my-3">
        <View className="p-4 flex-row items-center justify-between rounded-lg border-2 border-dashed border-gray-300 bg-gray-100">
          <View className=" rounded">
            <Text className="text-center font-mono text-lg font-bold text-gray-800">
              {item.code}
            </Text>
          </View>
          {/* Copy button */}
          <View>
            <TouchableOpacity
              className="flex-row items-center gap-1"
              onPress={() => console.log("copied")}
              activeOpacity={0.5}
            >
              <Ionicons name="copy-outline" size={16} color="#6B7280" />
              <Text className="text-sm text-gray-600">Copy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Expiry date */}
      <View className="px-4 pb-2">
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={16} color="#6B7280" />
          <Text
            className={`ml-2 text-sm ${isExpired(item.expiryDate) ? "text-red-500" : "text-gray-600"}`}
          >
            Expires: {formatDate(item.expiryDate)}
            {isExpired(item.expiryDate) && " (Expired)"}
          </Text>
        </View>
      </View>

      {/* Notes */}
      <View className="px-4 pb-3">
        <Text className="text-gray-600 text-sm leading-5">{item.notes}</Text>
      </View>

      {/* Action buttons */}
      <View className="flex-row justify-end items-center px-4 pb-4 pt-2 border-t border-gray-100">
        <TouchableOpacity
          onPress={() => handleEdit(item.id)}
          className="flex-row items-center bg-blue-50 px-4 py-2 rounded-lg mr-3"
          disabled={isExpired(item.expiryDate)}
        >
          <Ionicons
            name="pencil-outline"
            size={16}
            color={isExpired(item.expiryDate) ? "#9CA3AF" : "#3B82F6"}
          />
          <Text
            className={`ml-2 text-sm font-medium ${isExpired(item.expiryDate) ? "text-gray-400" : "text-blue-600"}`}
          >
            Edit
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          className="flex-row items-center bg-red-50 px-4 py-2 rounded-lg"
        >
          <Ionicons name="trash-outline" size={16} color="#EF4444" />
          <Text className="ml-2 text-sm font-medium text-red-600">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

        {/* Header and Back Button */}
        <View className="bg-[#F9FAFB] border-b border-gray-200 px-4 py-3 flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800">Coupons</Text>
          <TouchableOpacity
            onPress={() => setIsAddModalVisible(!isAddModalVisible)}
            activeOpacity={0.8}
            className="bg-blue-200 px-2 py-1 rounded flex-row items-center gap-1"
          >
            <Ionicons name="add-outline" size={16} color="#3B82F6" />
            <Text className="text-md font-semibold text-blue-600">Add</Text>
          </TouchableOpacity>
        </View>

        {/* Coupons List */}
        <FlatList
          data={coupons}
          renderItem={renderCouponItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        />

        {
          // Add Modal
          isAddModalVisible && (
            <AddCouponModal
              isVisible={isAddModalVisible}
              onClose={() => setIsAddModalVisible(false)}
            />
          )
        }
      </SafeAreaView>
    </>
  );
};

export default Coupons;
