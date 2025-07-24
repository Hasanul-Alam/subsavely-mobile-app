import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";

const Onboarding1 = require("../../../assets/images/onboarding screen assets/Savings-pana 1.png");
const Onboarding2 = require("../../../assets/images/onboarding screen assets/Group 26.png");
const Onboarding3 = require("../../../assets/images/onboarding screen assets/Mobile payments-rafiki 1.png");

const { height } = Dimensions.get("window");

const slides = [
  {
    title: "Welcome to Subsavely",
    description: "Your secure messaging solution for modern teams.",
    Image: Onboarding1,
  },
  {
    title: "Real-time Chat",
    description: "Stay connected with instant messaging & notifications.",
    Image: Onboarding2,
  },
  {
    title: "Stay Organized",
    description: "Manage your workspaces and chats with ease.",
    Image: Onboarding3,
  },
];

export default function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  const router = useRouter();

  const handleNext = () => {
    if (activeIndex < slides.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleGetStarted = async () => {
    // await setItem("isOnboarded", "true");
    console.log("Let's get started!");
    router.replace("./screens/login/LoginScreen"); // Navigate to the login screen
  };

  return (
    <View className="flex-1 bg-white items-center">
      <View className="flex-1 w-full">
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        {/* Swiper */}
        <View style={{ height: height * 0.75, width: "100%" }}>
          <Swiper
            loop={false}
            showsPagination={true}
            onIndexChanged={(index) => {
              console.log("index: ", index);
              setActiveIndex(index);
            }}
            index={activeIndex}
          >
            {slides.map((slide, index) => (
              <View
                key={index}
                className="flex-1 justify-center items-center px-8"
              >
                {/* Decorative Background */}
                <View className="absolute top-[10%] w-[260px] h-[260px] rounded-full bg-gray-200 opacity-20" />

                {/* Image */}
                <Image
                  source={slide.Image}
                  className="w-[240px] h-[240px] mb-8"
                  resizeMode="contain"
                />

                {/* Title */}
                <Text className="text-2xl font-bold text-gray-900 text-center mb-4">
                  {slide.title}
                </Text>

                {/* Description */}
                <Text className="text-base text-gray-700 text-center px-4 leading-6">
                  {slide.description}
                </Text>
              </View>
            ))}
          </Swiper>
        </View>
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row justify-between px-8 w-full mb-10">
        {activeIndex > 0 ? (
          <TouchableOpacity
            onPress={handlePrevious}
            className="flex-row items-center justify-center py-3 px-6 rounded-full bg-gray-200 min-w-[130px]"
            activeOpacity={0.8}
          >
            <AntDesign name="arrowleft" size={18} color="#000" />
            <Text className="text-base font-medium text-black ml-2">
              Previous
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="min-w-[130px]" />
        )}

        {activeIndex < slides.length - 1 ? (
          <TouchableOpacity
            onPress={handleNext}
            className="flex-row items-center justify-center py-3 px-6 rounded-full bg-black min-w-[130px]"
            activeOpacity={0.8}
          >
            <Text className="text-base font-medium text-white mr-2">Next</Text>
            <AntDesign name="arrowright" size={18} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleGetStarted}
            className="flex-row items-center justify-center py-3 px-6 rounded-full bg-black min-w-[130px]"
            activeOpacity={0.8}
          >
            <Text className="text-base font-medium text-white">
              Get Started
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
