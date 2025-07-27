import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Subscription {
  id: string;
  name: string;
  icon: string;
  price: string;
  lastCharged: string;
  backgroundColor: string;
}

const subscriptions: Subscription[] = [
  {
    id: "1",
    name: "Netflix",
    icon: "N",
    price: "$14.99",
    lastCharged: "Dec 25, 12:00 pm",
    backgroundColor: "#E50914",
  },
  {
    id: "2",
    name: "Spotify",
    icon: "♪",
    price: "$8.99",
    lastCharged: "Dec 22, 3:00 pm",
    backgroundColor: "#1DB954",
  },
  {
    id: "3",
    name: "Disney+",
    icon: "D+",
    price: "$7.99",
    lastCharged: "Dec 20, 9:15 am",
    backgroundColor: "#113CCF",
  },
  {
    id: "4",
    name: "YouTube Premium",
    icon: "▶",
    price: "$11.99",
    lastCharged: "Dec 18, 2:30 pm",
    backgroundColor: "#FF0000",
  },
  {
    id: "5",
    name: "Adobe Creative Cloud",
    icon: "Ae",
    price: "$52.99",
    lastCharged: "Dec 15, 11:45 am",
    backgroundColor: "#FF0050",
  },
  {
    id: "6",
    name: "Apple Music",
    icon: "🎵",
    price: "$9.99",
    lastCharged: "Dec 12, 4:20 pm",
    backgroundColor: "#FA243C",
  },
  {
    id: "7",
    name: "Dropbox",
    icon: "📦",
    price: "$9.99",
    lastCharged: "Dec 10, 8:00 am",
    backgroundColor: "#0061FF",
  },
  {
    id: "8",
    name: "Figma",
    icon: "F",
    price: "$12.00",
    lastCharged: "Dec 8, 1:15 pm",
    backgroundColor: "#F24E1E",
  },
  {
    id: "9",
    name: "GitHub Pro",
    icon: "G",
    price: "$4.00",
    lastCharged: "Dec 5, 6:30 pm",
    backgroundColor: "#24292e",
  },
  {
    id: "10",
    name: "Notion",
    icon: "N",
    price: "$8.00",
    lastCharged: "Dec 3, 10:45 am",
    backgroundColor: "#000000",
  },
];

const SubscriptionItem = ({ item }: { item: Subscription }) => (
  <View className="flex-row items-center bg-white px-4 mb-5 py-3 rounded-xl border-b border-gray-200">
    <View
      className="w-12 h-12 rounded-xl justify-center items-center mr-4"
      style={{ backgroundColor: item.backgroundColor }}
    >
      <Text className="text-white text-lg font-bold">{item.icon}</Text>
    </View>
    <View className="flex-1">
      <Text className="text-base font-semibold text-gray-900 mb-1">
        {item.name}
      </Text>
      <Text className="text-sm text-gray-500">{item.lastCharged}</Text>
    </View>
    <View className=" flex-row items-center gap-1">
      <View>
        <Text className="text-base font-semibold text-gray-900">
          {item.price}
        </Text>
      </View>
      <View>
        {/* Arrow Icon right */}

        <MaterialIcons name="keyboard-arrow-right" size={20} color="#6b7280" />
      </View>
    </View>
  </View>
);

export default function ExpireSoon() {
  const router = useRouter();
  return (
    <View className="flex-1 pb-10 pt-5">
      <Text className="text-lg font-semibold text-gray-900 px-4">
        Expire Soon
      </Text>
      {subscriptions.map((item) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.8}
          onPress={() => {
            // Handle subscription item press
            console.log(`Pressed on ${item.name}`);
            router.push(`/screens/subscriptionDetails/SubscriptionDetails`);
          }}
        >
          <SubscriptionItem item={item} />
        </TouchableOpacity>
      ))}
    </View>
  );
}
