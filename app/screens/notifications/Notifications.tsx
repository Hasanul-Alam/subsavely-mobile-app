import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Fake Notification Data
const notifications = [
  {
    id: "1",
    type: "single",
    title: "Subscription Expire and Renew Alert",
    message: "Your Netflix subscription will renew tomorrow.",
    time: "2h ago",
    apps: [
      {
        name: "Netflix",
        icon: require("../../../assets/images/fakeDataImages/netflix.jpg"),
      },
    ],
  },
  {
    id: "2",
    type: "multi",
    title: "3 subscriptions are expiring soon.",
    message: "Please renew your subscriptions.",
    time: "5h ago",
    apps: [
      {
        name: "Spotify",
        icon: require("../../../assets/images/fakeDataImages/spotify.png"),
      },
      {
        name: "Amazon Prime",
        icon: require("../../../assets/images/fakeDataImages/disney+.png"),
      },
      {
        name: "YouTube Premium",
        icon: require("../../../assets/images/fakeDataImages/youTube.png"),
      },
      {
        name: "YouTube Premium",
        icon: require("../../../assets/images/fakeDataImages/youTube.png"),
      },
      {
        name: "YouTube Premium",
        icon: require("../../../assets/images/fakeDataImages/youTube.png"),
      },
    ],
  },
  {
    id: "3",
    type: "single",
    title: "Payment successful for Canva Pro.",
    message: "Thank you for your payment.",
    time: "1d ago",
    apps: [
      {
        name: "Canva",
        icon: require("../../../assets/images/fakeDataImages/dropbox.png"),
      },
    ],
  },
  {
    id: "4",
    type: "multi",
    title: "Multiple subscriptions were billed.",
    message: "Your accounts were charged successfully.",
    time: "1d ago",
    apps: [
      {
        name: "Netflix",
        icon: require("../../../assets/images/fakeDataImages/netflix.jpg"),
      },
      {
        name: "Spotify",
        icon: require("../../../assets/images/fakeDataImages/spotify.png"),
      },
      {
        name: "YouTube Premium",
        icon: require("../../../assets/images/fakeDataImages/youTube.png"),
      },
    ],
  },
  {
    id: "5",
    type: "single",
    title: "Your payment for Spotify is confirmed.",
    message: "Spotify Premium renewed successfully.",
    time: "2d ago",
    apps: [
      {
        name: "Spotify",
        icon: require("../../../assets/images/fakeDataImages/spotify.png"),
      },
    ],
  },
  {
    id: "6",
    type: "single",
    title: "Netflix auto-renew enabled.",
    message: "You have enabled auto-renewal.",
    time: "3d ago",
    apps: [
      {
        name: "Netflix",
        icon: require("../../../assets/images/fakeDataImages/netflix.jpg"),
      },
    ],
  },
  {
    id: "7",
    type: "multi",
    title: "Bundle renewal completed.",
    message: "All services have been successfully renewed.",
    time: "3d ago",
    apps: [
      {
        name: "Netflix",
        icon: require("../../../assets/images/fakeDataImages/netflix.jpg"),
      },
      {
        name: "Dropbox",
        icon: require("../../../assets/images/fakeDataImages/dropbox.png"),
      },
    ],
  },
  {
    id: "8",
    type: "single",
    title: "Payment failed for Disney+.",
    message: "Please update your billing information.",
    time: "4d ago",
    apps: [
      {
        name: "Disney+",
        icon: require("../../../assets/images/fakeDataImages/disney+.png"),
      },
    ],
  },
  {
    id: "9",
    type: "multi",
    title: "Services were paused due to payments.",
    message: "Reactivate your subscriptions now.",
    time: "4d ago",
    apps: [
      {
        name: "Spotify",
        icon: require("../../../assets/images/fakeDataImages/spotify.png"),
      },
      {
        name: "YouTube",
        icon: require("../../../assets/images/fakeDataImages/youTube.png"),
      },
      {
        name: "Dropbox",
        icon: require("../../../assets/images/fakeDataImages/dropbox.png"),
      },
    ],
  },
  {
    id: "10",
    type: "single",
    title: "Dropbox space upgraded.",
    message: "You now have 2TB of storage.",
    time: "5d ago",
    apps: [
      {
        name: "Dropbox",
        icon: require("../../../assets/images/fakeDataImages/dropbox.png"),
      },
    ],
  },
  {
    id: "11",
    type: "multi",
    title: "Free trials ending soon.",
    message: "Don’t forget to cancel if not needed.",
    time: "5d ago",
    apps: [
      {
        name: "Disney+",
        icon: require("../../../assets/images/fakeDataImages/disney+.png"),
      },
      {
        name: "Netflix",
        icon: require("../../../assets/images/fakeDataImages/netflix.jpg"),
      },
      {
        name: "Spotify",
        icon: require("../../../assets/images/fakeDataImages/spotify.png"),
      },
      {
        name: "YouTube Premium",
        icon: require("../../../assets/images/fakeDataImages/youTube.png"),
      },
    ],
  },
  {
    id: "12",
    type: "single",
    title: "YouTube Premium renewed.",
    message: "Enjoy ad-free experience!",
    time: "6d ago",
    apps: [
      {
        name: "YouTube Premium",
        icon: require("../../../assets/images/fakeDataImages/youTube.png"),
      },
    ],
  },
  {
    id: "13",
    type: "multi",
    title: "Family plan shared access updated.",
    message: "Your family members can now access Spotify and Disney+.",
    time: "6d ago",
    apps: [
      {
        name: "Spotify",
        icon: require("../../../assets/images/fakeDataImages/spotify.png"),
      },
      {
        name: "Disney+",
        icon: require("../../../assets/images/fakeDataImages/disney+.png"),
      },
    ],
  },
  {
    id: "14",
    type: "multi",
    title: "Popular services added to your account.",
    message: "New apps added successfully.",
    time: "6d ago",
    apps: [
      {
        name: "Netflix",
        icon: require("../../../assets/images/fakeDataImages/netflix.jpg"),
      },
      {
        name: "Dropbox",
        icon: require("../../../assets/images/fakeDataImages/dropbox.png"),
      },
      {
        name: "YouTube Premium",
        icon: require("../../../assets/images/fakeDataImages/youTube.png"),
      },
      {
        name: "Spotify",
        icon: require("../../../assets/images/fakeDataImages/spotify.png"),
      },
      {
        name: "Disney+",
        icon: require("../../../assets/images/fakeDataImages/disney+.png"),
      },
    ],
  },
  {
    id: "15",
    type: "single",
    title: "Disney+ annual billing successful.",
    message: "Your subscription is now active for a year.",
    time: "1w ago",
    apps: [
      {
        name: "Disney+",
        icon: require("../../../assets/images/fakeDataImages/disney+.png"),
      },
    ],
  },
  {
    id: "16",
    type: "single",
    title: "Dropbox sync issue detected.",
    message: "Please reconnect your account.",
    time: "1w ago",
    apps: [
      {
        name: "Dropbox",
        icon: require("../../../assets/images/fakeDataImages/dropbox.png"),
      },
    ],
  },
  {
    id: "17",
    type: "multi",
    title: "Limited time offers on streaming apps.",
    message: "Enjoy up to 50% off!",
    time: "1w ago",
    apps: [
      {
        name: "Netflix",
        icon: require("../../../assets/images/fakeDataImages/netflix.jpg"),
      },
      {
        name: "Spotify",
        icon: require("../../../assets/images/fakeDataImages/spotify.png"),
      },
    ],
  },
  {
    id: "18",
    type: "multi",
    title: "Your apps were updated.",
    message: "You are now using the latest versions.",
    time: "1w ago",
    apps: [
      {
        name: "Dropbox",
        icon: require("../../../assets/images/fakeDataImages/dropbox.png"),
      },
      {
        name: "YouTube",
        icon: require("../../../assets/images/fakeDataImages/youTube.png"),
      },
    ],
  },
  {
    id: "19",
    type: "multi",
    title: "Billing reminders for your apps.",
    message: "Pay before the due date to avoid late fees.",
    time: "1w ago",
    apps: [
      {
        name: "Disney+",
        icon: require("../../../assets/images/fakeDataImages/disney+.png"),
      },
      {
        name: "Spotify",
        icon: require("../../../assets/images/fakeDataImages/spotify.png"),
      },
      {
        name: "Dropbox",
        icon: require("../../../assets/images/fakeDataImages/dropbox.png"),
      },
    ],
  },
  {
    id: "20",
    type: "single",
    title: "Netflix billing successful.",
    message: "Thank you for continuing your subscription.",
    time: "1w ago",
    apps: [
      {
        name: "Netflix",
        icon: require("../../../assets/images/fakeDataImages/netflix.jpg"),
      },
    ],
  },
];

// Notification item renderer
const renderNotification = ({ item }: { item: any }, router: any) => {
  const isMulti = item.type === "multi";
  const firstIcon = isMulti ? item.apps.slice(0, 1) : item.apps;
  const otherIcons = isMulti ? item.apps.slice(1) : [];
  const visibleIcons = otherIcons.slice(0, 3);
  const remainingCount = otherIcons.length - visibleIcons.length;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push("./NotificationDetails")}
      className="flex-row items-center gap-3 px-4 py-4 border-b border-gray-200"
    >
      {/* App Icons */}
      <View className="flex-row items-center">
        {firstIcon.map((app: any, index: any) => (
          <Image
            key={index}
            source={app.icon}
            className="w-8 h-8 rounded-full border-2 border-white -ml-2 first:ml-0 bg-gray-200"
            resizeMode="cover"
          />
        ))}
      </View>

      {/* Content */}
      <View className="flex-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-gray-900 font-semibold">{item.title}</Text>
          <Text className="text-gray-500 text-xs">{item.time}</Text>
        </View>
        <Text className="text-gray-500 text-xs mt-1">{item.message}</Text>

        {/* Other icons + counter */}
        <View className="flex-row items-center gap-0 mt-1">
          {visibleIcons.map((app: any, index: any) => (
            <Image
              key={index}
              source={app.icon}
              className="w-5 h-5 rounded-full border-2 border-white -ml-2 first:ml-0 bg-gray-200"
              resizeMode="cover"
            />
          ))}

          {remainingCount > 0 && (
            <View className="w-5 h-5 rounded-full bg-gray-300 ml-0 items-center justify-center ">
              <Text className="text-[10px] text-gray-800 font-semibold">
                +{remainingCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Notifications = () => {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    // Simulate an async data reload (e.g., API call or state update)
    setTimeout(() => {
      // Add your real data reload logic here
      setRefreshing(false);
    }, 1500); // Delay for demo purpose
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#f3f4f6]">
      {/* Status Bar */}
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

      {/* Header Section */}
      <View className="border-b border-gray-300 py-3">
        <View className="flex-row items-center justify-between px-4">
          {/* Back Button */}
          <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          {/* Heading */}
          <Text className="text-2xl font-semibold text-gray-900">
            Notifications
          </Text>

          {/* Mark all as read */}
          <TouchableOpacity activeOpacity={0.8}>
            <Ionicons name="checkmark-done-sharp" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Notification List */}
      <FlatList
        className=""
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={(item) => renderNotification(item, router)}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            progressViewOffset={-40}
            colors={["#388E3C", "#1565C0", "#B91C1C", "#f5c971", "#4181c2"]}
            progressBackgroundColor="#fff"
          />
        }
      />
    </SafeAreaView>
  );
};

export default Notifications;
