import { Ionicons, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubscriptionDetails() {
  const router = useRouter();
  const paymentHistory = [
    { id: 1, amount: "$7.80", plan: "Premium", date: "27 Aug 2024" },
    { id: 2, amount: "$7.80", plan: "Premium", date: "27 Jul 2024" },
    { id: 3, amount: "$5.98", plan: "Premium", date: "27 Jun 2024" },
    { id: 4, amount: "$5.98", plan: "Premium", date: "27 Jun 2024" },
    { id: 5, amount: "$5.98", plan: "Premium", date: "27 Jun 2024" },
    { id: 6, amount: "$5.98", plan: "Premium", date: "27 Jun 2024" },
    { id: 7, amount: "$5.98", plan: "Premium", date: "27 Jun 2024" },
  ];

  return (
    <>
      <SafeAreaView
        className="bg-[#14171f]"
        style={{ minHeight: Dimensions.get("window").height / 2 }}
      >
        {/* Status bar */}
        <StatusBar barStyle="light-content" />

        {/* Back button and settings icon */}
        <View className="flex-row items-center justify-between px-5">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <Octicons name="gear" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Netflix Logo and Premium Badge */}
        <View className="items-center mt-8">
          <Text className="text-5xl font-bold text-[#e50914] tracking-widest">
            NETFLIX
          </Text>
          <View className="mt-2 px-3 py-1 rounded-xl border border-[#666]">
            <Text className="text-xs text-[#ccc]">Premium</Text>
          </View>
        </View>

        {/* Details Section */}
        <View className="px-5">
          {/* Horizontal line with Details title */}
          <View className="flex-row items-center justify-between mt-5">
            <View className="flex-1 border-b border-[#666] mr-2" />
            <Text className="text-center text-[#ccc] text-base">Details</Text>
            <View className="flex-1 border-b border-[#666] ml-2" />
          </View>

          {/* Grid content */}
          <View className="mt-5 space-y-4">
            {/* First row */}
            <View className="flex-row space-x-4 gap-3">
              <View className="flex-1 bg-[#14171f] rounded-xl px-5 py-4 border border-[#3a3a3a]">
                <Text className="text-sm text-[#888888] font-normal mb-2">
                  Due Date
                </Text>
                <Text className="text-lg text-[#f1f1f1] font-semibold">
                  27 Sep 2024
                </Text>
              </View>
              <View className="flex-1 bg-[#14171f] rounded-xl px-5 py-4 border border-[#3a3a3a]">
                <Text className="text-sm text-[#888888] font-normal mb-2">
                  Billing Cycle
                </Text>
                <Text className="text-lg text-[#f1f1f1] font-semibold">
                  Monthly
                </Text>
              </View>
            </View>

            {/* Second row */}
            <View className="flex-row space-x-4 gap-3 mt-4">
              <View className="flex-1 bg-[#14171f] rounded-xl px-5 py-4 border border-[#3a3a3a]">
                <Text className="text-sm text-[#888888] font-normal mb-2">
                  Status
                </Text>
                <Text className="text-lg text-[#f1f1f1] font-semibold">
                  Active
                </Text>
              </View>
              <View className="flex-1 bg-[#14171f] rounded-xl px-5 py-4 border border-[#3a3a3a]">
                <Text className="text-sm text-[#888888] font-normal mb-2">
                  Payment Due
                </Text>
                <Text className="text-2xl text-[#f1f1f1] font-bold">
                  $ 7.80
                </Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>

      {/* White Bottom Half ScrollView */}
      <ScrollView
        className="flex-1 bg-white px-5 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="pb-10">
          {paymentHistory.map((payment) => (
            <View
              key={payment.id}
              className="flex-row items-center justify-between py-4 border-b border-[#f0f0f0]"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 rounded-full bg-[#e50914] items-center justify-center mr-3">
                  <Text className="text-white text-lg font-bold">N</Text>
                </View>
                <View>
                  <Text className="text-base font-semibold text-[#333]">
                    {payment.amount}
                  </Text>
                  <Text className="text-xs text-[#888] mt-1">
                    {payment.plan}
                  </Text>
                </View>
              </View>
              <Text className="text-sm text-[#666]">{payment.date}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}
