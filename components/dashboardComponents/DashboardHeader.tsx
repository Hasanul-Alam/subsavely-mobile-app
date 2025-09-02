import { setToken } from "@/redux/reducers/authReducer";
import axiosInstance from "@/utils/axiosInstance";
import { decodeToken } from "@/utils/tokenEncoderDecoder";
import { getItem, saveItem } from "@/utils/useSecureStorage";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const styles = StyleSheet.create({
  profilePopup: {
    position: "absolute",
    alignItems: "flex-end",
  },
  workspaceDropdown: {
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 1000,
    maxHeight: 250,
  },
});

const CommonHeaderView = () => {
  const [isWorkspaceDropdownVisible, setIsWorkspaceDropdownVisible] =
    useState(false);
  const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [headerPosition, setHeaderPosition] = useState({ y: 100, height: 50 });
  const [currentWorkspace, setCurrentWorkspace] = useState<any | null>(null);
  const [currentUserInfo, setCurrentUserInfo] = useState<any | null>(null);
  const [allWorkspaces, setAllWorkspaces] = useState<any>([]);
  const dropdownAnimation = useRef(new Animated.Value(0)).current;

  const router = useRouter();
  const dispatch = useDispatch();
  const encodedToken = useSelector((state: any) => state.auth.token);
  const decodedToken = decodeToken(encodedToken);

  const getAllWorkspaces = async () => {
    try {
      const response = await axiosInstance.get("/mobile/workspaces");
      setAllWorkspaces(response.data.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  const getCurrentWorkspace = async () => {
    const presentWorkspace = await getItem("workspace");
    if (presentWorkspace) {
      setCurrentWorkspace(presentWorkspace);
    }
  };

  const getUserInfo = async () => {
    const userInfo = await getItem("user");
    if (userInfo) {
      setCurrentUserInfo(userInfo);
    }
  };

  const handleSwitchWorkspace = async (workspace: any) => {
    if (workspace.id === currentWorkspace?.id) {
      toggleWorkspaceDropdown();
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/mobile/workspaces/${workspace.id}/switch`
      );
      if (response.data.status === 200) {
        setCurrentWorkspace(response.data.data.workspace);
        saveItem("workspace", response.data.data.workspace);
        saveItem("token", response.data.data.token);
        dispatch(setToken({ token: response.data.data.token }));
        toggleWorkspaceDropdown();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleWorkspaceDropdown = () => {
    const toValue = isWorkspaceDropdownVisible ? 0 : 1;

    Animated.timing(dropdownAnimation, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      if (toValue === 0) {
        setIsWorkspaceDropdownVisible(false);
      }
    });

    if (!isWorkspaceDropdownVisible) {
      setIsWorkspaceDropdownVisible(true);
    }
  };

  const renderWorkspaceItem = (item: any, index: number) => {
    const isSelected = item.id === currentWorkspace?.id;

    return (
      <TouchableOpacity
        key={item.id}
        className={`px-4 py-3 ${
          index < allWorkspaces.length - 1 ? "border-b border-gray-100" : ""
        } ${isSelected ? "bg-gray-50" : ""}`}
        onPress={() => handleSwitchWorkspace(item)}
        activeOpacity={0.7}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1">
            <View className="w-[24px] h-[24px] overflow-hidden">
              {item?.attributes?.logo ? (
                <Image
                  source={{ uri: item?.favicon }}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <Text className="text-white text-xs text-center">
                    {item?.attributes?.name?.charAt(0) || "W"}
                  </Text>
                </View>
              )}
            </View>
            <View className="flex-1">
              <Text
                className={`text-[16px] font-medium ${
                  isSelected ? "text-indigo-600" : "text-gray-800"
                }`}
              >
                {item?.attributes?.name}
              </Text>
              <Text className="text-sm text-gray-500 lowercase">
                {item?.type}
              </Text>
            </View>
          </View>
          {isSelected && (
            <MaterialIcons name="check" size={20} color="#4f46e5" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    getUserInfo();
    getCurrentWorkspace();
    getAllWorkspaces();
  }, []);

  return (
    <View className="w-full mx-auto mt-3">
      <View className="flex-row justify-between items-center gap-3 w-full">
        {/* Workspace Selector */}
        <View className="relative flex-1">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleWorkspaceDropdown}
            onLayout={(e) => {
              const { y, height } = e.nativeEvent.layout;
              setHeaderPosition({ y, height });
            }}
            className="flex-row items-center bg-white px-1 pr-2 py-1 rounded-full border border-gray-200 gap-1 max-w-[70%]"
          >
            <View className="w-[30px] h-[30px] overflow-hidden">
              {currentWorkspace?.attributes?.logo ? (
                <Image
                  source={{ uri: currentWorkspace?.favicon }}
                  className="w-full h-full rounded-full"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <Text className="text-white text-center">
                    {currentWorkspace?.attributes?.name?.charAt(0) || "W"}
                  </Text>
                </View>
              )}
            </View>
            <View className="flex-row items-center gap-2 ml-2 flex-1">
              <Text className="text-base font-semibold text-gray-900 flex-1">
                {currentWorkspace?.attributes?.name || "Select Workspace"}
              </Text>
            </View>
            <Animated.View
              style={{
                transform: [
                  {
                    rotate: dropdownAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0deg", "180deg"],
                    }),
                  },
                ],
              }}
            >
              <MaterialIcons
                name="keyboard-arrow-down"
                size={24}
                color="#6b7280"
              />
            </Animated.View>
          </TouchableOpacity>

          {/* Dropdown (always mounted, controlled by animation) */}
          <Animated.View
            style={[
              styles.workspaceDropdown,
              {
                opacity: dropdownAnimation,
                transform: [
                  {
                    scaleY: dropdownAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                ],
              },
            ]}
            pointerEvents={isWorkspaceDropdownVisible ? "auto" : "none"}
          >
            <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              style={{ maxHeight: 200 }}
            >
              {allWorkspaces.map((item: any, index: any) =>
                renderWorkspaceItem(item, index)
              )}
            </ScrollView>
          </Animated.View>
        </View>

        <View className="flex-row items-center gap-1">
          {/* Notification */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              router.push("/screens/notifications/Notifications");
            }}
            className="relative w-[33px] h-[33px] rounded-full items-center justify-center bg-white"
          >
            <MaterialIcons name="notifications" size={20} color="black" />
            <View className="absolute top-[2px] right-[5px] w-[11px] h-[11px] bg-red-500 rounded-full items-center justify-center">
              <Text className="text-white text-[8px] font-bold">3</Text>
            </View>
          </TouchableOpacity>

          {/* Profile Picture */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setIsProfilePopupVisible(!isProfilePopupVisible)}
            className="w-[33px] h-[33px] rounded-full overflow-hidden flex items-center justify-center bg-white"
          >
            {currentUserInfo?.attributes?.avatar ? (
              <Image
                source={{ uri: currentUserInfo?.attributes?.avatar }}
                className="w-full h-full rounded-full"
                resizeMode="cover"
              />
            ) : (
              <Text className="text-black font-bold text-lg text-center">
                {currentUserInfo?.attributes?.name?.charAt(0) || "U"}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

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
                    setIsProfilePopupVisible(false);
                  }, 1500);
                }}
                disabled={isSigningOut}
              >
                {isSigningOut ? (
                  <View className="flex-row items-center gap-3">
                    <ActivityIndicator size="small" color="#4b5563" />
                    <Text className="text-base text-gray-700">
                      Signing out...
                    </Text>
                  </View>
                ) : (
                  <View className="flex-row items-center gap-3">
                    <MaterialIcons name="logout" size={20} color="#4b5563" />
                    <Text className="text-base text-gray-700">Logout</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CommonHeaderView;
