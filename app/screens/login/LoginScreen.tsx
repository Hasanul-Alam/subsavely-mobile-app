import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    console.log("Sign in pressed");
  };

  const handleGoogleSignIn = () => {
    console.log("Google sign in pressed");
  };

  const handleForgotPassword = () => {
    console.log("Forgot password pressed");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 pt-5">
        {/* Illustration */}
        <View className="flex items-center mb-10 mt-5 w-[300px] h-[200px] self-center">
          <Image
            className="w-full h-full"
            source={require("../../../assets/images/login.png")}
            resizeMode="cover"
          />
        </View>

        {/* Title */}
        <Text className="text-2xl font-bold text-black text-center mb-8">
          Sign in to Subsavely
        </Text>

        {/* Google Sign In Button */}
        <TouchableOpacity
          className="flex-row items-center justify-center bg-white border border-gray-200 rounded-lg py-3 px-4 mb-6"
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

        {/* Divider */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-gray-200" />
          <Text className="mx-4 text-sm text-gray-600">
            or sign in with email
          </Text>
          <View className="flex-1 h-px bg-gray-200" />
        </View>

        {/* Email Input */}
        <View className="mb-5">
          <Text className="text-base text-gray-800 font-medium mb-2">
            Email
          </Text>
          <TextInput
            className="border border-gray-200 rounded-lg px-4 py-3 text-base bg-gray-100"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View className="mb-5">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-base text-gray-800 font-medium">
              Password
            </Text>
            <TouchableOpacity onPress={handleForgotPassword}>
              {/* <Text className="text-sm text-gray-600">Forgot?</Text> */}
            </TouchableOpacity>
          </View>

          <View className="w-full flex-row items-center border border-gray-200 bg-gray-100 rounded-lg px-4 py-0">
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
              onPress={() => setShowPassword(!showPassword)}
            >
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={18}
                color={password.length > 0 ? "black" : "gray"}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          className="bg-black rounded-lg py-4 items-center mt-2 mb-6"
          onPress={handleSignIn}
        >
          <Text className="text-white text-base font-semibold">Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
