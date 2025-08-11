import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserProfile() {
  const [accountName, setAccountName] = useState("Hasanul Alam Prince");
  const [userEmail, setUserEmail] = useState("hasanulalam420@gmail.com");
  const [avatarUrl, setAvatarUrl] = useState<string | null>("");

  const router = useRouter();

  const handleSave = () => {
    Alert.alert(
      "Profile Saved",
      `Account Name: ${accountName}\nEmail: ${userEmail}\nAvatar: ${avatarUrl ? "Set" : "Not Set"}`
    );
    // In a real app, you would send this data to your backend
  };

  const uploadAvatar = async () => {
    // Request media library permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "We need access to your media library to upload a profile picture."
      );
      return;
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [1, 1], // square crop
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUrl(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Profile Header */}
      <View className="border-b border-gray-300">
        <View className="flex-row items-center justify-between px-6 pb-3 pt-2">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-center">
            Profile Settings
          </Text>
          <View />
        </View>
      </View>

      {/* Profile Content */}
      <View className="px-6 mt-6 flex-1">
        {/* Profile Picture Section */}
        <View className="items-center mb-5">
          <View className="relative" style={{ width: 100, height: 100 }}>
            {avatarUrl ?
              <TouchableOpacity onPress={uploadAvatar}>
                <Image
                  source={{
                    uri: avatarUrl,
                  }}
                  className="rounded-full object-cover"
                  style={{ width: 100, height: 100 }}
                  accessibilityLabel="User Profile Picture"
                  resizeMode="cover"
                />
              </TouchableOpacity>
            : <TouchableOpacity
                onPress={uploadAvatar}
                className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center"
              >
                <FontAwesome name="user-o" size={70} color="white" />
              </TouchableOpacity>
            }

            <TouchableOpacity
              onPress={uploadAvatar}
              className="absolute bg-[#fff] rounded-full flex items-center justify-center shadow-md"
              style={{
                width: 30,
                height: 30,
                top: 5,
                right: 7,
                transform: [{ translateX: 30 / 4 }, { translateY: -30 / 4 }],
                borderWidth: 1,
                borderColor: "#64748b",
              }}
              accessibilityLabel="Edit Profile Picture"
            >
              <Ionicons name="camera" size={30 * 0.6} color="#475569" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Account Name Input */}
        <View className="mb-6">
          <Text className="text-base font-semibold mb-2">Account Name</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-base text-black"
            value={accountName}
            onChangeText={setAccountName}
            placeholder="Enter your account name"
            accessibilityLabel="Account Name Input"
          />
        </View>

        {/* User Email Input */}
        <View className="mb-8">
          <Text className="text-base font-semibold mb-2">User Email</Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-3 text-base text-gray-500"
            value={userEmail}
            onChangeText={setUserEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            accessibilityLabel="User Email Input"
            editable={false}
          />
        </View>

        {/* Save Changes Button */}
        <TouchableOpacity
          onPress={handleSave}
          className="bg-black py-3 rounded-lg items-center"
          accessibilityLabel="Save Changes Button"
        >
          <Text className="text-white text-lg font-semibold">Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
