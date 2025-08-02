"use client";
import FilterModal from "@/components/subscriptionComponents/filterModal";
import { subscriptions as allSubscriptions } from "@/fakeData/fakeSubscriptions";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Settings2 } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// Subscription logo image mapping
const icons: { [key: string]: any } = {
  "netflix.jpg": require("../../assets/images/fakeDataImages/netflix.jpg"),
  "spotify.png": require("../../assets/images/fakeDataImages/spotify.png"),
  "disney+.png": require("../../assets/images/fakeDataImages/disney+.png"),
  "youTube.png": require("../../assets/images/fakeDataImages/youTube.png"),
  "adobe-creative-cloud.jpg": require("../../assets/images/fakeDataImages/adobe-creative-cloud.jpg"),
  "apple-music.png": require("../../assets/images/fakeDataImages/apple-music.png"),
  "dropbox.png": require("../../assets/images/fakeDataImages/dropbox.png"),
  "figma.png": require("../../assets/images/fakeDataImages/figma.png"),
};

const FILTER_OPTIONS = {
  status: ["Active", "Paused", "Cancelled"],
  billing: ["Monthly", "Quarterly", "Yearly", "One-Time"],
};

// Renders each subscription item row
const SubscriptionRow = ({ item, isLast }: { item: any; isLast: boolean }) => (
  <View
    className={`flex-row items-center rounded-xl ${isLast ? "" : "border-b border-gray-100 mb-3 pb-3"}`}
  >
    <View className="w-11 h-11 rounded-full justify-center items-center mr-3">
      <Image source={icons[item.icon]} className="w-full h-full rounded-full" />
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
        <Text className="text-xs text-gray-400">Exp in 10 days</Text>
      </View>
    </View>
  </View>
);

const Subscriptions = () => {
  const router = useRouter();
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedBilling, setSelectedBilling] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<typeof allSubscriptions>([]);
  const [refreshing, setRefreshing] = useState(false); // State for refresh control

  // Reset filter selections
  const clearFilters = () => {
    setSelectedStatus([]);
    setSelectedBilling([]);
  };

  // Apply filter logic (currently just closes modal)
  const handleFilterApply = () => {
    console.log("Applying filters:", { selectedStatus, selectedBilling });
    setFilterVisible(false);
  };

  // Search logic with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      const keyword = search.toLowerCase();
      setFilteredData(
        allSubscriptions.filter((item) =>
          item.name.toLowerCase().includes(keyword)
        )
      );
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const displayList = search.length > 0 ? filteredData : allSubscriptions;

  // Function to handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a network request or data fetch
    setTimeout(() => {
      // In a real app, you would refetch your subscriptions here
      // For now, we just reset the search and filters if needed, or simply stop refreshing
      setSearch(""); // Optionally clear search on refresh
      clearFilters(); // Optionally clear filters on refresh
      setRefreshing(false);
    }, 1500); // Simulate a 1.5 second refresh
  }, []);

  return (
    <>
      {/* Ensure SafeAreaView is the outermost layout component and takes full space */}
      <View className="flex-1 bg-[#f3f4f6]">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={0}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {/* This inner View also needs to take full space */}
            <View className="flex-1 px-4 pb-0">
              {/* Search Bar and Filter Icon */}
              <View className="flex-row items-center gap-3 pb-2">
                <View className="flex-1 flex-row items-center rounded-full border border-slate-300 px-2">
                  <Feather name="search" size={20} color="#9CA3AF" />
                  <TextInput
                    className="flex-1 text-base text-gray-700 ml-2"
                    placeholder=" Search subscriptions"
                    placeholderTextColor="#9CA3AF"
                    value={search}
                    onChangeText={setSearch}
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
              {/* Subscriptions List */}
              <FlatList
                data={displayList}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                      router.push(
                        `/screens/subscriptionDetails/SubscriptionDetails`
                      )
                    }
                  >
                    <SubscriptionRow
                      item={item}
                      isLast={index === displayList.length - 1}
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
                      {search.length > 0
                        ? "We could not find any subscriptions matching your search."
                        : "We could not find any subscriptions"}
                    </Text>
                  </View>
                )}
                refreshControl={
                  // Add RefreshControl here
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
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
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
      {/* Filter Modal */}
      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        status={selectedStatus}
        billing={selectedBilling}
        setStatus={setSelectedStatus}
        setBilling={setSelectedBilling}
        resetFilters={clearFilters}
        applyFilters={handleFilterApply}
        FILTER_STATUS={FILTER_OPTIONS.status}
        BILLING_PERIOD={FILTER_OPTIONS.billing}
      />
    </>
  );
};

export default Subscriptions;
