import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { Checkbox } from "expo-checkbox";
import { useRouter } from "expo-router";
import { Settings2 } from "lucide-react-native";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const subscriptions = [
  {
    id: "1",
    name: "Netflix",
    icon: "netflix.jpg",
    price: "$14.99",
    planType: "Premium",
    renewalType: "Monthly",
  },
  {
    id: "2",
    name: "Spotify",
    icon: "spotify.png",
    price: "$8.99",
    planType: "Individual",
    renewalType: "Monthly",
  },
  {
    id: "3",
    name: "Disney+",
    icon: "disney+.png",
    price: "$7.99",
    planType: "Standard",
    renewalType: "Monthly",
  },
  {
    id: "4",
    name: "YouTube Premium",
    icon: "youTube.png",
    price: "$11.99",
    planType: "Premium",
    renewalType: "Monthly",
  },
  {
    id: "5",
    name: "Adobe Creative Cloud",
    icon: "adobe-creative-cloud.jpg",
    price: "$52.99",
    planType: "All Apps",
    renewalType: "Monthly",
  },
  {
    id: "6",
    name: "Apple Music",
    icon: "apple-music.png",
    price: "$9.99",
    planType: "Student",
    renewalType: "Monthly",
  },
  {
    id: "7",
    name: "Dropbox",
    icon: "dropbox.png",
    price: "$9.99",
    planType: "Plus",
    renewalType: "Monthly",
  },
  {
    id: "8",
    name: "Figma",
    icon: "figma.png",
    price: "$12.00",
    planType: "Professional",
    renewalType: "Monthly",
  },
  {
    id: "9",
    name: "GitHub Pro",
    icon: "apple-music.png",
    price: "$4.00",
    planType: "Pro",
    renewalType: "Monthly",
  },
];

const iconImages: { [key: string]: any } = {
  "netflix.jpg": require("../../assets/images/fakeDataImages/netflix.jpg"),
  "spotify.png": require("../../assets/images/fakeDataImages/spotify.png"),
  "disney+.png": require("../../assets/images/fakeDataImages/disney+.png"),
  "youTube.png": require("../../assets/images/fakeDataImages/youTube.png"),
  "adobe-creative-cloud.jpg": require("../../assets/images/fakeDataImages/adobe-creative-cloud.jpg"),
  "apple-music.png": require("../../assets/images/fakeDataImages/apple-music.png"),
  "dropbox.png": require("../../assets/images/fakeDataImages/dropbox.png"),
  "figma.png": require("../../assets/images/fakeDataImages/figma.png"),
};

const FILTER_STATUS = ["Active", "Paused", "Cancelled"];
const BILLING_PERIOD = ["Monthly", "Quarterly", "Yearly", "One-Time"];

const SubscriptionItem = ({ item, isLast }: { item: any; isLast: boolean }) => (
  <View
    className={`flex-row items-center rounded-xl ${
      isLast ? "" : "border-b border-gray-100 mb-3 pb-3"
    }`}
  >
    <View className="w-11 h-11 rounded-full justify-center items-center mr-3">
      <Image
        source={iconImages[item.icon]}
        className="w-full h-full rounded-full"
      />
    </View>
    <View className="flex-1">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-900">{item.name}</Text>
        <View className="flex-row items-center justify-end -mr-2">
          <Text className="text-base text-gray-900">{item.price}</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="#4b42a4"
            className="-ml-1"
          />
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-0">
          <Text className="text-sm text-gray-500">{item.planType}</Text>
          <Entypo name="dot-single" size={20} color="#6b7280" />
          <Text className="text-sm text-gray-500">{item.renewalType}</Text>
        </View>
        <View>
          <Text className="text-xs text-gray-400">Exp in 10 days</Text>
        </View>
      </View>
    </View>
  </View>
);

const CheckboxItem = ({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) => (
  <Pressable
    onPress={onToggle}
    className="flex-row items-center mb-3"
    hitSlop={10}
  >
    <Checkbox
      value={checked}
      onValueChange={onToggle}
      color={checked ? "#7c3aed" : undefined}
      className="mr-3"
    />
    <Text className="text-base text-gray-700">{label}</Text>
  </Pressable>
);

const Subscriptions = () => {
  const router = useRouter();
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [status, setStatus] = useState<string[]>([]);
  const [billing, setBilling] = useState<string[]>([]);

  const toggleSelection = (
    current: string[],
    setFn: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    if (current.includes(value)) {
      setFn(current.filter((v) => v !== value));
    } else {
      setFn([...current, value]);
    }
  };

  const resetFilters = () => {
    setStatus([]);
    setBilling([]);
  };

  const applyFilters = () => {
    console.log("Apply filters: ", { status, billing });
    setFilterVisible(false);
  };

  return (
    <>
      <SafeAreaView className="flex-1 pb-3 px-4 mb-10 bg-[#f3f4f6] min-h-screen">
        {/* Search Bar and Filter Options */}
        <View className="flex-row items-center gap-3 mb-5">
          <View className="flex-1 flex-row items-center rounded-full border border-slate-300 px-2">
            <Feather name="search" size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 text-base text-gray-700 ml-2"
              placeholder=" Search subscriptions"
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <TouchableOpacity
            onPress={() => setFilterVisible(true)}
            className="w-12 h-12 border border-slate-300 rounded-full items-center justify-center"
            activeOpacity={0.8}
          >
            <Settings2 size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={subscriptions}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                router.push(`/screens/subscriptionDetails/SubscriptionDetails`)
              }
            >
              <SubscriptionItem
                item={item}
                isLast={index === subscriptions.length - 1}
              />
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>

      {/* Bottom Sheet Modal */}
      <Modal
        visible={isFilterVisible}
        onRequestClose={() => setFilterVisible(false)}
        transparent
        animationType="fade"
      >
        <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
          {/* Close modal when pressing outside */}
          <TouchableWithoutFeedback onPress={() => setFilterVisible(false)}>
            <View style={{ flex: 1 }} />
          </TouchableWithoutFeedback>

          {/* Bottom Sheet Content */}
          <View className="bg-white rounded-t-2xl p-4">
            <Text className="text-base font-semibold mb-3 text-gray-900">
              Filter by Status
            </Text>
            {FILTER_STATUS.map((item) => (
              <CheckboxItem
                key={item}
                label={item}
                checked={status.includes(item)}
                onToggle={() => toggleSelection(status, setStatus, item)}
              />
            ))}

            <Text className="text-base font-semibold mb-3 mt-4 text-gray-900">
              Filter by Billing Period
            </Text>
            {BILLING_PERIOD.map((item) => (
              <CheckboxItem
                key={item}
                label={item}
                checked={billing.includes(item)}
                onToggle={() => toggleSelection(billing, setBilling, item)}
              />
            ))}

            <View className="flex-row justify-between mt-6">
              <TouchableOpacity
                onPress={resetFilters}
                className="px-4 py-2 rounded-md bg-gray-200"
              >
                <Text className="text-gray-700 font-medium">Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={applyFilters}
                className="px-4 py-2 rounded-md bg-violet-600"
              >
                <Text className="text-white font-medium">Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Subscriptions;
