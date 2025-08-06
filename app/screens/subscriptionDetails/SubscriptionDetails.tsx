import OptionsModal from "@/components/subscriptionComponents/OptionsModal";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SubscriptionDetails() {
  const [showOptions, setShowOptions] = useState(false);
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
    <SafeAreaView className="flex-1 bg-[#14171f]">
      <StatusBar barStyle="light-content" backgroundColor="#14171f" />

      {/* Top Dark Half */}
      <View
        style={{ minHeight: Dimensions.get("window").height / 3 }}
        className="pb-10"
      >
        <View className="flex-row items-center justify-between px-5">
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowOptions(!showOptions)}
          >
            <Octicons name="gear" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* Logo and Badge */}
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
          <View className="flex-row items-center justify-between mt-5">
            <View className="flex-1 border-b border-[#666] mr-2" />
            <Text className="text-center text-[#ccc] text-base">Details</Text>
            <View className="flex-1 border-b border-[#666] ml-2" />
          </View>

          <View className="mt-5 space-y-4">
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
      </View>

      {/* Bottom FlatList (white background) */}
      <FlatList
        data={paymentHistory}
        keyExtractor={item => item.id.toString()}
        className="bg-white px-5 pt-2"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }} // optional if you want a little spacing
        renderItem={({ item }) => (
          <View className="flex-row items-center justify-between py-4 border-b border-[#f0f0f0]">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-[#e50914] items-center justify-center mr-3">
                <Text className="text-white text-lg font-bold">N</Text>
              </View>
              <View>
                <Text className="text-base font-semibold text-[#333]">
                  {item.amount}
                </Text>
                <Text className="text-xs text-[#888] mt-1">{item.plan}</Text>
              </View>
            </View>
            <Text className="text-sm text-[#666]">{item.date}</Text>
          </View>
        )}
      />

      {/* Modal */}
      <OptionsModal
        visible={showOptions}
        onClose={() => setShowOptions(false)}
        onCancel={() => {
          // Handle cancel logic
          console.log("Cancel Subscription clicked");
        }}
      />
    </SafeAreaView>
  );
}
