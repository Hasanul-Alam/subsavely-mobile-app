import AddPaymentMethod from "@/components/addSubscriptionComponents/AddPaymentMethod";
import SubscriptionBillingPeriod from "@/components/addSubscriptionComponents/SubscriptionBillingPeriod";
import SubscriptionCategory from "@/components/addSubscriptionComponents/SubscriptionCategory";
import SubscriptionCustomField from "@/components/addSubscriptionComponents/SubscriptionCustomField";
import SubscriptionName from "@/components/addSubscriptionComponents/SubscriptionName";
import SubscriptionPaymentMethods from "@/components/addSubscriptionComponents/SubscriptionPaymentMethods";
import SubscriptionPlan from "@/components/addSubscriptionComponents/SubscriptionPlan";
import SubscriptionPrice from "@/components/addSubscriptionComponents/SubscriptionPrice";
import Card from "@/components/reusableComponents/Card";
import { Fontisto, Ionicons } from "@expo/vector-icons";
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

const AddSubscription = () => {
  const [plan, setPlan] = useState("");
  const [billingPeriod, setBillingPeriod] = useState("");
  const [price, setPrice] = useState(0);
  const [currency, setCurrency] = useState({
    name: "USD",
    symbol: "$",
    code: "840",
  });
  const [startDate, setStartDate] = useState(new Date());
  const [trialEndDate, setTrialEndDate] = useState(new Date());
  const [autoRenew, setAutoRenew] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showTrialEndDatePicker, setShowTrialEndDatePicker] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const router = useRouter();

  const formatStartDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTrialEndDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });
  };

  const onDateChange = (event: any, selectedDate?: Date, type?: string) => {
    if (event.type === "dismissed") {
      setShowStartDatePicker(false);
      setShowTrialEndDatePicker(false);
      return;
    }
    if (type === "startDate") {
      const currentDate = selectedDate || startDate;
      setShowStartDatePicker(Platform.OS === "ios");
      setStartDate(currentDate);
    } else if (type === "trialEndDate") {
      const currentDate = selectedDate || trialEndDate;
      setShowTrialEndDatePicker(Platform.OS === "ios");
      setTrialEndDate(currentDate);
    }
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
            <InputField label="Category" style={{ flex: 1 }}>
              <SubscriptionCategory />
            </InputField>

            <InputField label="Plan" required info style={{ flex: 1 }}>
              <SubscriptionPlan setPlan={setPlan} plan={plan} />
            </InputField>
          </View>

          {/* Billing Period and Price Row */}
          <View className="flex-row gap-3">
            <InputField label="Billing Period" required style={{ flex: 1 }}>
              <SubscriptionBillingPeriod
                billingPeriod={billingPeriod}
                setBillingPeriod={setBillingPeriod}
              />
            </InputField>

            <InputField label="Price" style={{ flex: 1 }}>
              <SubscriptionPrice
                currency={currency}
                setPrice={setPrice}
                price={price}
                setCurrency={setCurrency}
              />
            </InputField>
          </View>

          {/* Start Date and Auto Renew Row */}
          <View className="flex-row gap-3">
            <InputField label="Start Date" required style={{ flex: 1 }}>
              <Card>
                <TouchableOpacity
                  className="px-3 py-4 flex-row items-center justify-between h-[48px]"
                  onPress={() => setShowStartDatePicker(true)}
                >
                  <View className="flex-row items-center">
                    <View className="w-7 h-7 rounded-full bg-green-100 items-center justify-center mr-2">
                      <Ionicons name="today" size={14} color="#10B981" />
                    </View>
                    <Text className="text-base text-gray-800 font-medium">
                      {formatStartDate(startDate)}
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

          {/* Trial End Date */}
          {(billingPeriod === "Monthly-(trial)" ||
            billingPeriod === "Yearly-(trial)") && (
            <InputField label="Trial End Date" style={{ flex: 1 }}>
              <Card>
                <TouchableOpacity
                  onPress={() => setShowTrialEndDatePicker(true)}
                >
                  <View className="px-3 py-1 flex-row items-center justify-between h-[60px]">
                    <View className="flex-row items-center">
                      <View className="w-7 h-7 rounded-full bg-red-100 items-center justify-center mr-2">
                        <Fontisto name="date" size={12} color="#ff6666" />
                      </View>
                      <Text className="text-base text-gray-800 font-medium">
                        {formatTrialEndDate(trialEndDate)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Card>
            </InputField>
          )}

          {/* Payment Method */}
          <InputField label="Payment Method">
            <SubscriptionPaymentMethods
              paymentMethod={selectedPaymentMethod}
              onSelect={setSelectedPaymentMethod}
            />
          </InputField>

          {/* Action Links */}
          <View className="mb-6 space-y-3">
            {/* Add Payment Method */}
            <Card>
              <AddPaymentMethod />
            </Card>

            {/* Add Custom Field */}
            <SubscriptionCustomField />
          </View>

          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Bottom Buttons */}
        <View className="px-4 pb-4">
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

      {/* Date Pickers */}
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, date) => onDateChange(event, date, "startDate")}
        />
      )}

      {showTrialEndDatePicker && (
        <DateTimePicker
          value={trialEndDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, date) => onDateChange(event, date, "trialEndDate")}
        />
      )}
    </>
  );
};

export default AddSubscription;
