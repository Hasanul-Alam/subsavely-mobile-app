import { setToken } from "@/redux/reducers/authReducer";
import axiosInstance from "@/utils/axiosInstance";
import { decodeToken } from "@/utils/tokenEncoderDecoder";
import { getItem, saveItem } from "@/utils/useSecureStorage";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";

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
  const [currentWorkspace, setCurrentWorkspace] = useState<any | null>(null);
  const [currentUserInfo, setCurrentUserInfo] = useState<any | null>(null);
  const [allWorkspaces, setAllWorkspaces] = useState<any>([]);

  const router = useRouter();
  const dispatch = useDispatch();
  const encodedToken = useSelector((state: any) => state.auth.token);
  const decodedToken = decodeToken(encodedToken);
  console.log("encoded token: ", encodedToken);
  console.log("decoded token: ", decodedToken);

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

  const handleSwitchWorkspace = async (id: any) => {
    try {
      const response = await axiosInstance.post(
        `/mobile/workspaces/${id}/switch`
      );
      if (response.data.status === 200) {
        setIsWorkspacePopupVisible(false);
        setCurrentWorkspace(response.data.data.workspace);
        saveItem("workspace", response.data.data.workspace);
        saveItem("token", response.data.data.token);
        dispatch(setToken({ token: response.data.data.token }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    getCurrentWorkspace();
    getAllWorkspaces();
  }, []);

  useEffect(() => {
    console.log("token is changed: ", decodedToken);
  }, [decodedToken]);

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
            {currentWorkspace?.attributes?.logo ?
              <Image
                source={{ uri: currentWorkspace?.favicon }}
                className="w-full h-full rounded-full"
                resizeMode="cover"
              />
            : <View className="w-full h-full bg-black rounded-full flex items-center justify-center">
                <Text className="text-white text-center">
                  {currentWorkspace?.attributes?.name.charAt(0)}
                </Text>
              </View>
            }
          </View>
          <View className="flex-row items-center gap-2 ml-2">
            <Text className="text-base font-semibold text-gray-900">
              {currentWorkspace?.attributes?.name}
            </Text>
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
            className="relative w-[33px] h-[33px] rounded-full items-center justify-center bg-white"
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
            className="w-[33px] h-[33px] rounded-full overflow-hidden flex items-center justify-center bg-white"
          >
            {currentUserInfo?.attributes?.avatar ?
              <Image
                source={{ uri: currentUserInfo?.attributes?.avatar }}
                className="w-full h-full rounded-full"
                resizeMode="cover"
              />
            : <Text className="text-black font-bold text-lg text-center">
                {currentUserInfo?.attributes?.name.charAt(0)}
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
          className="flex-1 bg-black/20"
          activeOpacity={1}
          onPressOut={() => setIsWorkspacePopupVisible(false)}
        >
          <View
            className="w-[85%] mx-auto"
            style={{
              marginTop:
                headerPosition.y +
                headerPosition.height +
                (Platform.OS === "ios" ? 12 : 45),
            }}
          >
            <View className="bg-white rounded-xl py-1 shadow-xl shadow-black/30 overflow-hidden">
              {allWorkspaces.map((workspace: any) => (
                <TouchableOpacity
                  key={workspace.id}
                  className="px-5 py-3 active:bg-gray-50 border-b border-gray-100"
                  onPress={() => {
                    handleSwitchWorkspace(workspace.id);
                  }}
                >
                  <View className="flex-row items-center justify-between">
                    <Text className="text-[16px] font-medium text-gray-800">
                      {workspace.attributes.name}
                    </Text>
                    {workspace.id === currentWorkspace?.id && (
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
