import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ExpireSoonSkeleton from "../skeletons/ExpireSoonSkeleton";
import EmptySubscription from "./EmptySubscription";

const SubscriptionItem = ({ item, isLast }: { item: any; isLast: boolean }) => (
  <View
    className={`flex-row items-center bg-white px-2  rounded-xl ${
      isLast ? "" : "border-b border-gray-100 mb-3 pb-3"
    }`}
  >
    <View className="w-11 h-11 rounded-full justify-center items-center mr-3">
      <Image
        source={{ uri: item.relationships.app.attributes.icon }}
        className="w-full h-full rounded-full"
      />
    </View>
    <View className="flex-1">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-gray-900">
          {item.relationships.app.attributes.name}
        </Text>
        <View className="flex-row items-center justify-end -mr-2">
          <Text className="text-base text-gray-900">
            ${item.attributes.price}
          </Text>
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
          <Text className="text-sm text-gray-500">{item.attributes.plan}</Text>
          <Entypo name="dot-single" size={20} color="#6b7280" />
          <Text className="text-sm text-gray-500 capitalize">
            {item.attributes.billingPeriod}
          </Text>
        </View>
        <View>
          <Text className="text-xs text-gray-400">
            Exp in {item.attributes.remainingDays} days
          </Text>
        </View>
      </View>
    </View>
  </View>
);

export default function ExpireSoon({ loading, subscriptions }: any) {
  const router = useRouter();

  // Simulate loading state
  if (loading) {
    return <ExpireSoonSkeleton />;
  }

  if (!loading && subscriptions.length === 0) {
    return (
      <>
        <Text className="text-lg font-semibold text-gray-900 pl-2 mb-2">
          Expires Soon
        </Text>
        <EmptySubscription
          showBrowseButton={false}
          title="No Subscription Found"
          message="You don't have any expire soon subscriptions at the moment."
        />
      </>
    );
  }

  return (
    <>
      <Text className="text-lg font-semibold text-gray-900 pl-2 mb-2">
        Expires Soon
      </Text>
      <View className="flex-1 bg-white rounded-3xl overflow-hidden py-3 px-2 mb-10">
        {subscriptions.map((item: any, index: any) => {
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
