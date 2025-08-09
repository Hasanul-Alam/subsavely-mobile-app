import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CreateNewAppModal from "./CreateNewAppModal";

const Card = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: any;
}) => (
  <View
    style={[
      {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 2,
      },
      style,
    ]}
  >
    {children}
  </View>
);

const subscriptions: any[] = [
  {
    id: "1",
    name: "Subsavely",
    image:
      "https://ph-files.imgix.net/2944ffcf-9c53-40cc-80a7-80f4465b978b.jpeg?auto=format", // Placeholder, as Subsavely is a concept
    url: "https://www.subsavely.com/", // Placeholder
    billingUrl: "https://www.subsavely.com/billing", // Placeholder
  },
  {
    id: "2",
    name: "Netflix",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Netflix_icon.svg/1024px-Netflix_icon.svg.png", // PNG logo
    url: "https://www.netflix.com/",
    billingUrl: "https://www.netflix.com/youraccount",
  },
  {
    id: "3",
    name: "Amazon Prime",
    image: "https://i.imgur.com/2X0X0X0.png", // PNG logo
    url: "https://www.amazon.com/prime",
    billingUrl: "https://www.amazon.com/gp/primecentral",
  },
  {
    id: "4",
    name: "Disney Plus",
    image: "https://i.imgur.com/3Y3Y3Y3.png", // PNG logo
    url: "https://www.disneyplus.com/",
    billingUrl: "https://www.disneyplus.com/account",
  },
  {
    id: "5",
    name: "Hulu",
    image: "https://i.imgur.com/4Z4Z4Z4.png", // PNG logo
    url: "https://www.hulu.com/",
    billingUrl: "https://www.hulu.com/account",
  },
  {
    id: "6",
    name: "HBO Max",
    image: "https://i.imgur.com/5A5A5A5.png", // PNG logo
    url: "https://www.max.com/",
    billingUrl: "https://www.max.com/account",
  },
  {
    id: "7",
    name: "Apple TV+",
    image: "https://i.imgur.com/6B6B6B6.png", // PNG logo
    url: "https://tv.apple.com/",
    billingUrl:
      "https://appleid.apple.com/account/manage/section/subscriptions",
  },
  {
    id: "8",
    name: "Spotify",
    image: "https://i.imgur.com/7C7C7C7.png", // PNG logo
    url: "https://www.spotify.com/",
    billingUrl: "https://www.spotify.com/account/overview/",
  },
  {
    id: "9",
    name: "YouTube Premium",
    image: "https://i.imgur.com/8D8D8D8.png", // PNG logo
    url: "https://www.youtube.com/premium",
    billingUrl: "https://www.youtube.com/paid_memberships",
  },
];

const SubscriptionName = () => {
  const [subscriptionName, setSubscriptionName] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isCreateNewAppModalOpen, setIsCreateNewAppModalOpen] = useState(false);
  const [showSubscriptionDropdown, setShowSubscriptionDropdown] =
    useState(false);

  const filteredSubscriptions = useMemo(() => {
    const text = searchText.toLowerCase();
    return subscriptions.filter(sub => sub.name.toLowerCase().includes(text));
  }, [searchText]);

  const handleSubscriptionSelect = (name: string) => {
    setSubscriptionName(name);
    setSearchText("");
    setShowSubscriptionDropdown(false);
  };

  return (
    <>
      <Card>
        <View className="flex-row items-center">
          <View>
            {subscriptionName ?
              <View className="pl-3 pr-1">
                <Image
                  source={{
                    uri: subscriptions.find(
                      sub => sub.name === subscriptionName
                    )?.image,
                  }}
                  className="w-6 h-6 rounded-full"
                />
              </View>
            : <Ionicons
                name="search"
                size={18}
                color="#6B7280"
                className="p-3"
              />
            }
            {/* <Ionicons name="search" size={18} color="#6B7280" /> */}
          </View>
          <TextInput
            className="flex-1 py-3 pr-3 text-base text-gray-800"
            placeholder="Search or enter subscription name..."
            placeholderTextColor="#9CA3AF"
            value={searchText || subscriptionName}
            onChangeText={text => {
              setSearchText(text);
              setSubscriptionName("");
            }}
            onFocus={() => setShowSubscriptionDropdown(true)}
          />
          <TouchableOpacity
            className="p-3"
            onPress={() => setShowSubscriptionDropdown(prev => !prev)}
          >
            {showSubscriptionDropdown ?
              <Ionicons name="chevron-up" size={18} color="#6B7280" />
            : <Ionicons name="chevron-down" size={18} color="#6B7280" />}
          </TouchableOpacity>
        </View>
      </Card>

      {showSubscriptionDropdown && (
        <Card style={{ marginTop: 8, maxHeight: 200 }}>
          <ScrollView nestedScrollEnabled={true}>
            {filteredSubscriptions.length > 0 ?
              filteredSubscriptions.map(sub => (
                <TouchableOpacity
                  key={sub.id}
                  className="flex-row items-center px-4 py-3 border-b border-gray-100 last:border-b-0"
                  onPress={() => handleSubscriptionSelect(sub.name)}
                >
                  <Image
                    source={{ uri: sub.image }}
                    style={{ width: 24, height: 24, marginRight: 12 }}
                  />
                  <Text className="text-base text-gray-800">{sub.name}</Text>
                </TouchableOpacity>
              ))
            : <TouchableOpacity
                className="px-4 py-3 flex-row items-center gap-2"
                onPress={() => {
                  setIsCreateNewAppModalOpen(true);
                  setShowSubscriptionDropdown(false);
                }}
              >
                <View className="p-0 rounded-full border border-[#6B7280]">
                  <Ionicons name="add" size={12} color="#6B7280" />
                </View>
                <Text className="text-base text-gray-500">
                  Create &quot;{searchText}&quot;
                </Text>
              </TouchableOpacity>
            }
          </ScrollView>
        </Card>
      )}

      {/* Bottom Action Sheet Modal */}
      <CreateNewAppModal
        visible={isCreateNewAppModalOpen}
        onClose={() => setIsCreateNewAppModalOpen(false)}
        onCreate={() => {
          setIsCreateNewAppModalOpen(false);
          setShowSubscriptionDropdown(true);
        }}
      />
    </>
  );
};

export default SubscriptionName;
