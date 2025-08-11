import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const styles = StyleSheet.create({
  profilePopup: {
    position: "absolute",
    alignItems: "flex-end",
  },
});

const CommonHeaderView = () => {
  const [isWorkspacePopupVisible, setIsWorkspacePopupVisible] = useState(false);
  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [headerPosition, setHeaderPosition] = useState({ y: 100, height: 50 });

  const router = useRouter();

  // Dummy static data
  const currentWorkspace = {
    id: 1,
    name: "My Workspace",
    type: "team",
    logo: null,
    favicon: "",
  };

  const allWorkspaces = [
    { id: 1, name: "My Workspace", type: "team" },
    { id: 2, name: "Client Space", type: "client" },
  ];

  const user = {
    attributes: {
      name: "John Doe",
      avatar: "",
      role: "admin",
    },
  };

  return (
    <View className="w-full mx-auto mt-3">
      <View className="flex-row justify-between items-center gap-3 w-full">
        {/* Workspace Selector */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setIsWorkspacePopupVisible(!isWorkspacePopupVisible)}
          onLayout={e => {
            const { y, height } = e.nativeEvent.layout;
            setHeaderPosition({ y, height });
          }}
          className="flex-row items-center bg-white px-1 pr-2 py-1 rounded-full border border-gray-200 gap-1"
        >
          <View className="w-[30px] h-[30px] overflow-hidden">
            {currentWorkspace.logo ?
              <Image
                source={{ uri: currentWorkspace.favicon }}
                className="w-full h-full rounded-full"
                resizeMode="cover"
              />
            : <View className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <Text className="text-white text-center">
                  {currentWorkspace.name.charAt(0)}
                </Text>
              </View>
            }
          </View>
          <View className="flex-row items-center gap-2 ml-2">
            <Text className="text-base font-semibold text-gray-900">
              {currentWorkspace.name}
            </Text>
            {/* <Text className="text-xs text-black lowercase">
              {currentWorkspace.type}
            </Text> */}
          </View>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={24}
            color="#6b7280"
            style={{
              transform: [
                { rotate: isWorkspacePopupVisible ? "180deg" : "0deg" },
              ],
            }}
          />
        </TouchableOpacity>

        <View className="flex-row items-center gap-1">
          {/* Notification */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              router.push("/screens/notifications/Notifications");
            }}
            className="relative w-[33px] h-[33px] rounded-full items-center justify-center bg-slate-100"
          >
            <MaterialIcons name="notifications" size={20} color="black" />

            {/* Badge */}
            <View className="absolute top-[2px] right-[5px] w-[11px] h-[11px] bg-red-500 rounded-full items-center justify-center">
              <Text className="text-white text-[8px] font-bold">3</Text>
            </View>
          </TouchableOpacity>

          {/* Profile Picture */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsProfilePopupVisible(!isProfilePopupVisible)}
            className="w-[33px] h-[33px] rounded-full overflow-hidden flex items-center justify-center bg-slate-100"
          >
            {user.attributes.avatar ?
              <Image
                source={{ uri: user.attributes.avatar }}
                className="w-full h-full rounded-full"
                resizeMode="cover"
              />
            : <Text className="text-black font-bold text-lg text-center">
                {user.attributes.name.charAt(0)}
              </Text>
            }
          </TouchableOpacity>
        </View>
      </View>

      {/* Workspace Popup */}
      <Modal
        visible={isWorkspacePopupVisible}
        transparent
        animationType="none"
        onRequestClose={() => setIsWorkspacePopupVisible(false)}
        statusBarTranslucent
      >
        <TouchableOpacity
          className="flex-1 bg-[rgba(0,0,0,0.3)]"
          activeOpacity={1}
          onPressOut={() => setIsWorkspacePopupVisible(false)}
        >
          <View
            className="w-[85%] mx-auto"
            style={{
              marginTop:
                headerPosition.y +
                headerPosition.height +
                (Platform.OS === "ios" ? 12 : 60),
            }}
          >
            <View className="bg-white rounded-xl py-1 shadow-xl shadow-black/30 overflow-hidden">
              {allWorkspaces.map(workspace => (
                <TouchableOpacity
                  key={workspace.id}
                  className="px-5 py-3 active:bg-gray-50 border-b border-gray-100"
                  onPress={() => {
                    console.log("Switching to:", workspace.name);
                    setIsWorkspacePopupVisible(false);
                  }}
                >
                  <View className="flex-row items-center justify-between">
                    <Text className="text-[16px] font-medium text-gray-800">
                      {workspace.name}
                    </Text>
                    {workspace.id === currentWorkspace.id && (
                      <MaterialIcons name="check" size={20} color="#4f46e5" />
                    )}
                  </View>
                  <Text className="text-sm text-gray-500 mt-1 lowercase">
                    {workspace.type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Profile Popup */}
      <Modal
        visible={isProfilePopupVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsProfilePopupVisible(false)}
        statusBarTranslucent
      >
        <TouchableOpacity
          className="flex-1 bg-black/10"
          activeOpacity={1}
          onPressOut={() => setIsProfilePopupVisible(false)}
        >
          <View
            style={[
              styles.profilePopup,
              {
                right: 20,
                top:
                  headerPosition.y +
                  headerPosition.height +
                  (Platform.OS === "ios" ? 10 : 40),
              },
            ]}
          >
            <View className="bg-white rounded-xl py-2 shadow-lg shadow-black/25 min-w-[180px]">
              <TouchableOpacity
                className="px-4 py-3 active:bg-gray-100"
                onPress={() => {
                  setIsProfilePopupVisible(false);
                  router.push("/screens/userProfile/UserProfile");
                }}
              >
                <View className="flex-row items-center gap-3">
                  <MaterialIcons
                    name="person-outline"
                    size={20}
                    color="#4b5563"
                  />
                  <Text className="text-base text-gray-700">View Profile</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-4 py-3 active:bg-gray-100"
                onPress={() => {
                  setIsSigningOut(true);
                  setTimeout(() => {
                    setIsSigningOut(false);
                    console.log("Signed out");
                    setIsProfilePopupVisible(false);
                  }, 1500);
                }}
                disabled={isSigningOut}
              >
                {isSigningOut ?
                  <View className="flex-row items-center gap-3">
                    <ActivityIndicator size="small" color="#4b5563" />
                    <Text className="text-base text-gray-700">
                      Signing out...
                    </Text>
                  </View>
                : <View className="flex-row items-center gap-3">
                    <MaterialIcons name="logout" size={20} color="#4b5563" />
                    <Text className="text-base text-gray-700">Logout</Text>
                  </View>
                }
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CommonHeaderView;
