import { saveItem } from "@/utils/useSecureStorage";
import { Feather } from "@expo/vector-icons";
import axios from "axios";
import * as Device from "expo-device";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const LoginScreen = () => {
  // State management
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isEmailSingingIn, setIsEmailSingingIn] = useState(false);

  const router = useRouter();

  /**
   * Validates login form inputs
   * Shows Toast messages for validation errors
   */
  const validateLoginForm = (): boolean => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Invalid Input",
        text2: "Please enter email and password",
      });
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      Toast.show({
        type: "error",
        text1: "Invalid Input",
        text2: "Please enter a valid email address",
      });
      return false;
    }

    if (password.length < 8) {
      Toast.show({
        type: "error",
        text1: "Invalid Password",
        text2: "Password must be at least 8 characters long",
      });
      return false;
    }

    return true;
  };

  /**
   * Handles email/password sign in
   * Validates inputs before proceeding
   */
  const handleEmailSignIn = async () => {
    if (validateLoginForm()) {
      setIsEmailSingingIn(true);
      try {
        const response = await axios.post(
          "https://lasting-mudfish-lucky.ngrok-free.app/api/mobile/auth/sign-in",
          {
            email,
            password,
            device: Device.deviceName,
          }
        );
        if (response.data.status === 200) {
          saveItem("token", response.data.data.token);
          saveItem("user", response.data.data.user);
          saveItem("workspace", response.data.data.workspace);
          setEmail("");
          setPassword("");
          router.replace("/(tabs)/dashboard");
        }
      } catch (error: any) {
        if (error.response) {
          console.log("Server responded with error:", error.response.data);
        } else if (error.request) {
          console.log("No response received:", error.request);
        } else {
          console.log("Axios error:", error.message);
        }
      } finally {
        setIsEmailSingingIn(false);
      }
    }
  };

  /**
   * Handles Google sign in
   */
  const handleGoogleSignIn = (): void => {
    console.log("Google sign in pressed");
    // Add your Google authentication logic here
  };

  /**
   * Toggles password visibility
   */
  const togglePasswordVisibility = (): void => {
    setShowPassword(prev => !prev);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pt-5">
        {/* Illustration Section */}
        <View className="flex items-center mb-10 mt-5 w-[300px] h-[200px] self-center">
          <Image
            className="w-full h-full"
            source={require("../../../assets/images/login.png")}
            resizeMode="cover"
          />
        </View>

        {/* Title Section */}
        <Text className="text-2xl font-bold text-black text-center mb-8">
          Sign in to Subsavely
        </Text>

        {/* Google Sign In Button */}
        <TouchableOpacity
          className="flex-row items-center justify-center bg-white border border-gray-200 rounded-full py-3 px-4 mb-6"
          onPress={handleGoogleSignIn}
        >
          <Image
            source={require("../../../assets/images/google-icon.png")}
            className="w-7 h-7 mr-3"
          />
          <Text className="text-base text-gray-800 font-medium">
            Sign in with Google
          </Text>
        </TouchableOpacity>

        {/* Divider Section */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-4 text-sm text-gray-600">
            or sign in with email
          </Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        {/* Email Input Section */}
        <View className="mb-2">
          <TextInput
            className="border border-gray-200 rounded-full px-4 py-3 text-base bg-gray-100"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input Section */}
        <View className="mb-5">
          <View className="w-full flex-row items-center border border-gray-200 bg-gray-100 rounded-full px-4 py-0">
            <TextInput
              className="flex-1 text-base text-black pr-3"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={togglePasswordVisibility}
            >
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={18}
                color={password.length > 0 ? "black" : "gray"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign In Button Section */}
        <TouchableOpacity
          className="bg-black rounded-full py-4 items-center mt-2 mb-6"
          onPress={handleEmailSignIn}
        >
          {isEmailSingingIn ?
            <ActivityIndicator size="small" color="white" />
          : <Text className="text-white text-base font-semibold">Sign In</Text>}
        </TouchableOpacity>
      </ScrollView>

      {/* Toast Notification */}
      <Toast position="top" topOffset={0} />
    </SafeAreaView>
  );
};

export default LoginScreen;
