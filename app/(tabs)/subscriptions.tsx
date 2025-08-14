"use client";

import SubscriptionSkeleton from "@/components/skeletons/SubscriptionsSkeleton";
import FilterModal from "@/components/subscriptionComponents/filterModal";
import { subscriptions as mockSubscriptions } from "@/fakeData/fakeSubscriptions";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Settings2 } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

//----------------------------
// Icon mapping for subscription logos
//----------------------------
const subscriptionIcons: Record<string, any> = {
  "netflix.jpg": require("../../assets/images/fakeDataImages/netflix.jpg"),
  "spotify.png": require("../../assets/images/fakeDataImages/spotify.png"),
  "disney+.png": require("../../assets/images/fakeDataImages/disney+.png"),
  "youTube.png": require("../../assets/images/fakeDataImages/youTube.png"),
  "adobe-creative-cloud.jpg": require("../../assets/images/fakeDataImages/adobe-creative-cloud.jpg"),
  "apple-music.png": require("../../assets/images/fakeDataImages/apple-music.png"),
  "dropbox.png": require("../../assets/images/fakeDataImages/dropbox.png"),
  "figma.png": require("../../assets/images/fakeDataImages/figma.png"),
};

//----------------------------
// Filter options
//----------------------------
const FILTER_CATEGORIES = {
  status: ["Active", "Expired", "Cancelled"],
  billing: ["Trail", "Monthly", "Yearly", "Lifetime"],
};

//----------------------------
// Component: Subscription Row (list item)
//----------------------------
const SubscriptionItem = ({ item, isLast }: { item: any; isLast: boolean }) => (
  <View
    className={`flex-row items-center rounded-xl ${
      isLast ? "" : "border-b border-gray-100 mb-3 pb-3"
    }`}
  >
    {/* Subscription logo */}
    <View className="w-11 h-11 rounded-full justify-center items-center mr-3">
      <Image
        source={subscriptionIcons[item.icon]}
        className="w-full h-full rounded-full"
      />
    </View>

    {/* Subscription details */}
    <View className="flex-1">
      {/* Top row: Name & Price */}
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

      {/* Bottom row: Plan & Renewal */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-0">
          <Text className="text-sm text-gray-500">{item.planType}</Text>
          <Entypo name="dot-single" size={20} color="#6b7280" />
          <Text className="text-sm text-gray-500">{item.renewalType}</Text>
        </View>
        <Text className="text-xs text-gray-400">Exp in 10 days</Text>
      </View>
    </View>
  </View>
);

//----------------------------
// Main Screen: Subscriptions
//----------------------------
const Subscriptions = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const params = useLocalSearchParams();

  //----------------------------
  // State variables
  //----------------------------
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [billingFilter, setBillingFilter] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<
    typeof mockSubscriptions
  >([]);
  const [isRefreshing, setRefreshing] = useState(false);
  const [isLoading, setLoading] = useState(false);

  //----------------------------
  // Handle incoming navigation params for filters
  //----------------------------
  useEffect(() => {
    if (params.status) {
      setStatusFilter([String(params.status)]);
    }
    if (params.billing) {
      setBillingFilter([String(params.billing)]);
    }
  }, [params.status, params.billing]);

  //----------------------------
  // Reset filters
  //----------------------------
  const resetAllFilters = () => {
    setStatusFilter([]);
    setBillingFilter([]);
  };

  //----------------------------
  // Apply filter action
  //----------------------------
  const applySelectedFilters = () => {
    console.log("Applying filters:", {
      statusFilter,
      billingFilter,
    });
    setFilterModalVisible(false);
  };

  //----------------------------
  // Search with debounce
  //----------------------------
  useEffect(() => {
    const delay = setTimeout(() => {
      const keyword = searchQuery.toLowerCase();
      setFilteredSubscriptions(
        mockSubscriptions.filter(item =>
          item.name.toLowerCase().includes(keyword)
        )
      );
    }, 500);
    return () => clearTimeout(delay);
  }, [searchQuery]);

  //----------------------------
  // Choose data to display (filtered vs all)
  //----------------------------
  const subscriptionsToDisplay =
    searchQuery.length > 0 ? filteredSubscriptions : mockSubscriptions;

  //----------------------------
  // Pull-to-refresh handler
  //----------------------------
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setSearchQuery("");
      resetAllFilters();
      setRefreshing(false);
    }, 1500);
  }, []);

  //----------------------------
  // Initial loading state
  //----------------------------
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  //----------------------------
  // Show skeleton while loading
  //----------------------------
  if (isLoading) {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <SubscriptionSkeleton />
      </>
    );
  }

  return (
    <>
      {/* Status Bar */}
      {isFocused && (
        <StatusBar
          barStyle="dark-content"
          backgroundColor="white"
          translucent={true}
        />
      )}

      {/* <StatusBar
        barStyle="dark-content"
        backgroundColor="white"
        translucent={true}
      /> */}

      <View
        className="flex-1 bg-white"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 px-2">
              {/*----------------------------
                Header
              ----------------------------*/}
              <View className=" pt-3">
                <Text className="text-2xl font-semibold text-gray-900 text-center">
                  Subscriptions
                </Text>
              </View>

              {/*----------------------------
                Search bar & Filter button
              ----------------------------*/}
              <View className="flex-row items-center gap-3 py-5 px-2">
                <View className="flex-1 flex-row items-center rounded-lg px-2 max-h-11 bg-[#f3f4f6]">
                  <Feather name="search" size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-base text-gray-700 ml-2"
                    placeholder=" Search subscriptions"
                    placeholderTextColor="#9CA3AF"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setFilterModalVisible(true)}
                  className="w-11 h-11 rounded-lg items-center justify-center bg-[#f3f4f6]"
                  activeOpacity={0.8}
                >
                  {(billingFilter.length > 0 || statusFilter.length > 0) && (
                    <View className="w-3 h-3 rounded-full bg-[#2770f0] absolute -top-1 right-0" />
                  )}
                  <Settings2 size={20} color="#000" />
                </TouchableOpacity>
              </View>

              {/*----------------------------
                Subscription List
              ----------------------------*/}
              <View className="bg-[#fff] px-3 rounded-2xl pb-28 min-h-full">
                <FlatList
                  className="pt-2"
                  data={subscriptionsToDisplay}
                  keyExtractor={item => item.id}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 80 }}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        router.push(
                          `/screens/subscriptionDetails/SubscriptionDetails`
                        )
                      }
                    >
                      <SubscriptionItem
                        item={item}
                        isLast={index === subscriptionsToDisplay.length - 1}
                      />
                    </TouchableOpacity>
                  )}
                  ListEmptyComponent={() => (
                    <View className="flex-1 items-center justify-center mt-20 px-6">
                      <View className="w-20 h-20 mb-4 rounded-full bg-violet-100 items-center justify-center">
                        <Text className="text-4xl">📦</Text>
                      </View>
                      <Text className="text-lg font-semibold text-gray-800 mb-1">
                        Nothing Here Yet
                      </Text>
                      <Text className="text-center text-gray-500">
                        {searchQuery.length > 0 ?
                          "We could not find any subscriptions matching your search."
                        : "We could not find any subscriptions"}
                      </Text>
                    </View>
                  )}
                  refreshControl={
                    <RefreshControl
                      refreshing={isRefreshing}
                      onRefresh={handleRefresh}
                      tintColor="#9CA3AF"
                      colors={[
                        "green",
                        "blue",
                        "red",
                        "orange",
                        "yellow",
                        "pink",
                      ]}
                    />
                  }
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        {/*----------------------------
          Floating Action Button
        ----------------------------*/}
        <TouchableOpacity
          onPress={() =>
            router.push("/screens/addSubscription/AddSubscription")
          }
          activeOpacity={1}
          style={{
            position: "absolute",
            bottom: 90 + insets.bottom,
            right: 20,
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: "#000",
            justifyContent: "center",
            alignItems: "center",
            elevation: 3,
            zIndex: 1000,
          }}
        >
          <MaterialIcons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/*----------------------------
        Filter Modal
      ----------------------------*/}
      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        status={statusFilter}
        billing={billingFilter}
        setStatus={setStatusFilter}
        setBilling={setBillingFilter}
        resetFilters={resetAllFilters}
        applyFilters={applySelectedFilters}
        FILTER_STATUS={FILTER_CATEGORIES.status}
        BILLING_PERIOD={FILTER_CATEGORIES.billing}
      />
    </>
  );
};

export default Subscriptions;
