import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ExpireSoonSkeleton from "../skeletons/ExpireSoonSkeleton";
// import "" from "../../assets/images/fake-data-images/adobe-creative-cloud.jpg";

interface Subscription {
  id: string;
  name: string;
  icon: string;
  price: string;
  planType: string;
  renewalType: string;
}

const subscriptions: Subscription[] = [
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
  // {
  //   id: "6",
  //   name: "Apple Music",
  //   icon: "apple-music.png",
  //   price: "$9.99",
  //   planType: "Student",
  //   renewalType: "Monthly",
  // },
  // {
  //   id: "7",
  //   name: "Dropbox",
  //   icon: "dropbox.png",
  //   price: "$9.99",
  //   planType: "Plus",
  //   renewalType: "Monthly",
  // },
  // {
  //   id: "8",
  //   name: "Figma",
  //   icon: "figma.png",
  //   price: "$12.00",
  //   planType: "Professional",
  //   renewalType: "Monthly",
  // },
  // {
  //   id: "9",
  //   name: "GitHub Pro",
  //   icon: "apple-music.png",
  //   price: "$4.00",
  //   planType: "Pro",
  //   renewalType: "Monthly",
  // },
];

// Map icon filenames to static imports
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

const SubscriptionItem = ({
  item,
  isLast,
}: {
  item: Subscription;
  isLast: boolean;
}) => (
  <View
    className={`flex-row items-center bg-white px-2  rounded-xl ${
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

export default function ExpireSoon() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("ExpireSoon component mounted");
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  // Simulate loading state
  if (isLoading) {
    return <ExpireSoonSkeleton />;
  }

  return (
    <>
      <Text className="text-lg font-semibold text-gray-900 pl-2 mb-2">
        Expires Soon
      </Text>
      <View className="flex-1 bg-white rounded-3xl overflow-hidden py-3 px-2 mb-10">
        {subscriptions.map((item, index) => {
          const isLast = index === subscriptions.length - 1;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() =>
                router.push(`/screens/subscriptionDetails/SubscriptionDetails`)
              }
            >
              <SubscriptionItem item={item} isLast={isLast} />
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}
