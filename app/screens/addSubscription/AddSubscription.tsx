import SubscriptionBillingPeriod from "@/components/addSubscriptionComponents/SubscriptionBillingPeriod";
import SubscriptionCategory from "@/components/addSubscriptionComponents/SubscriptionCategory";
import SubscriptionName from "@/components/addSubscriptionComponents/SubscriptionName";
import SubscriptionPlan from "@/components/addSubscriptionComponents/SubscriptionPlan";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Helper components moved outside to prevent re-creation on every render
const InputField = ({
  label,
  required = false,
  children,
  info = false,
  style = {},
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  info?: boolean;
  style?: any;
}) => (
  <View style={[{ marginBottom: 20 }, style]}>
    <View className="flex-row items-center mb-2">
      <Text className="text-base font-semibold text-gray-900">{label}</Text>
      {required && <Text className="text-red-500 ml-1 text-base">*</Text>}
      {info && (
        <TouchableOpacity className="ml-2">
          <Ionicons
            name="information-circle-outline"
            size={16}
            color="#6B7280"
          />
        </TouchableOpacity>
      )}
    </View>
    {children}
  </View>
);

const Card = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: any;
}) => (
  <View
    style={[
      {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
      },
      style,
    ]}
  >
    {children}
  </View>
);

const AddSubscription = () => {
  const [category, setCategory] = useState("");
  const [plan, setPlan] = useState("");
  const [billingPeriod, setBillingPeriod] = useState("");
  const [price, setPrice] = useState("0.00");
  const [currency, setCurrency] = useState("$");
  const [startDate, setStartDate] = useState(new Date());
  const [autoRenew, setAutoRenew] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  const router = useRouter();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowDatePicker(Platform.OS === "ios");
    setStartDate(currentDate);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      <SafeAreaView className="flex-1" style={{ backgroundColor: "#F8FAFC" }}>
        {/* Enhanced Header with Gradient */}
        <LinearGradient
          colors={["#1F2937", "#374151"]}
          className="px-4 pb-6 pt-4"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
          }}
        >
          <View className="flex-row items-center justify-between mb-2">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 rounded-full"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-white">
              New Subscription
            </Text>
            <View className="w-10" />
          </View>
          <Text className="text-gray-300 text-center text-sm">
            Add and manage your subscriptions
          </Text>
        </LinearGradient>
        <ScrollView
          className="flex-1 px-4"
          style={{ paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Subscription Name */}
          <InputField label="Subscription Name" required>
            <SubscriptionName />
          </InputField>

          {/* Category and Plan Row */}
          <View className="flex-row gap-3">
            {/* Category */}
            <InputField label="Category" style={{ flex: 1 }}>
              <SubscriptionCategory />
            </InputField>

            {/* Plan */}
            <InputField label="Plan" required info style={{ flex: 1 }}>
              <SubscriptionPlan setPlan={setPlan} plan={plan} />
            </InputField>
          </View>

          {/* Billing Period and Price Row */}
          <View className="flex-row gap-3">
            {/* Billing Period */}
            <InputField label="Billing Period" required style={{ flex: 1 }}>
              <SubscriptionBillingPeriod
                billingPeriod={billingPeriod}
                setBillingPeriod={setBillingPeriod}
              />
            </InputField>
            {/* Price */}
            <InputField label="Price" style={{ flex: 1 }}>
              <Card>
                <View className="flex-row items-center h-[48px]">
                  <TextInput
                    className="flex-1 px-4 py-4 text-base text-gray-800"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="numeric"
                    placeholder="0.00"
                  />
                  <View className="border-l border-gray-200 pl-3 pr-4">
                    <TouchableOpacity className="flex-row items-center">
                      <Text className="text-base text-gray-800 mr-1 font-semibold">
                        {currency}
                      </Text>
                      <Ionicons name="chevron-down" size={14} color="#6B7280" />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            </InputField>
          </View>
          {/* Start Date and Auto Renew Row */}
          <View className="flex-row gap-3">
            <InputField label="Start Date" required style={{ flex: 1 }}>
              <Card>
                <TouchableOpacity
                  className="px-3 py-4 flex-row items-center justify-between h-[48px]"
                  onPress={() => setShowDatePicker(true)}
                >
                  <View className="flex-row items-center">
                    <View className="w-7 h-7 rounded-full bg-green-100 items-center justify-center mr-2">
                      <Ionicons name="today" size={14} color="#10B981" />
                    </View>
                    <Text className="text-base text-gray-800 font-medium">
                      {formatDate(startDate)}
                    </Text>
                  </View>
                  <Ionicons name="calendar-outline" size={18} color="#6B7280" />
                </TouchableOpacity>
              </Card>
            </InputField>
            <InputField label="Auto Renew" style={{ flex: 1 }}>
              <Card>
                <View className="px-3 py-1 flex-row items-center justify-between h-[48px]">
                  <View className="flex-row items-center">
                    <View className="w-7 h-7 rounded-full bg-orange-100 items-center justify-center mr-2">
                      <Ionicons name="refresh" size={14} color="#F59E0B" />
                    </View>
                    <Text className="text-base text-gray-600">
                      {autoRenew ? "Enabled" : "Disabled"}
                    </Text>
                  </View>
                  <Switch
                    value={autoRenew}
                    onValueChange={setAutoRenew}
                    trackColor={{ false: "#E5E7EB", true: "#4F46E5" }}
                    thumbColor="#FFFFFF"
                    ios_backgroundColor="#E5E7EB"
                  />
                </View>
              </Card>
            </InputField>
          </View>
          {/* Payment Method */}
          <InputField label="Payment Method">
            <Card>
              <TouchableOpacity className="px-4 py-4 flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 items-center justify-center mr-3">
                    <Ionicons name="card" size={18} color="#1e3d62" />
                  </View>
                  <View>
                    <Text className="text-base text-gray-800 font-medium mb-0.5">
                      {paymentMethod || "Select payment method"}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      Credit card, PayPal, Bank transfer
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#6B7280" />
              </TouchableOpacity>
            </Card>
          </InputField>
          {/* Enhanced Action Links */}
          <View className="mb-6 space-y-3">
            <Card>
              <TouchableOpacity className="px-4 py-3 flex-row items-center">
                <View className="w-7 h-7 rounded-full bg-indigo-100 items-center justify-center mr-2">
                  <Ionicons name="add" size={16} color="#4F46E5" />
                </View>
                <Text className="text-indigo-600 text-base font-semibold">
                  Add Payment Method
                </Text>
              </TouchableOpacity>
            </Card>
            <Card style={{ marginTop: 10 }}>
              <TouchableOpacity className="px-4 py-3 flex-row items-center">
                <View className="w-7 h-7 rounded-full bg-purple-100 items-center justify-center mr-2">
                  <Ionicons name="options" size={16} color="#7C3AED" />
                </View>
                <Text className="text-purple-600 text-base font-semibold">
                  Add Custom Field
                </Text>
              </TouchableOpacity>
            </Card>
          </View>
          {/* Date Picker Modal */}
          {showDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onDateChange}
            />
          )}
          {/* Bottom spacing */}
          <View style={{ height: 20 }} />
        </ScrollView>
        {/* Enhanced Bottom Buttons */}
        <View
          className="px-4 pb-4"
          // style={{ backgroundColor: "#FFFFFF" }}
        >
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="flex-1 py-3 rounded-xl border-2 border-gray-200"
              style={{ backgroundColor: "#FFFFFF" }}
              activeOpacity={0.8}
            >
              <Text className="text-center text-base font-semibold text-gray-700">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 py-3 rounded-xl"
              style={{
                backgroundColor: "#1F2937",
              }}
              activeOpacity={0.9}
            >
              <View className="flex-row items-center justify-center">
                <Ionicons
                  name="checkmark-circle"
                  size={18}
                  color="#FFFFFF"
                  style={{ marginRight: 6 }}
                />
                <Text className="text-center text-base font-bold text-white">
                  Save Subscription
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default AddSubscription;
