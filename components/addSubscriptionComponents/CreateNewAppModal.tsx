/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { height: screenHeight } = Dimensions.get("window");

interface AppData {
  name: string;
  url: string;
  billingUrl: string;
  logoUrl?: string;
}

interface CreateNewAppModalProps {
  visible: boolean;
  onClose: () => void;
  onCreate: (appData: AppData) => void;
}

const CreateNewAppModal: React.FC<CreateNewAppModalProps> = ({
  visible,
  onClose,
  onCreate,
}) => {
  const [newAppData, setNewAppData] = useState<AppData>({
    name: "",
    url: "",
    billingUrl: "",
    logoUrl: "",
  });

  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset form when modal opens
      setNewAppData({
        name: "",
        url: "",
        billingUrl: "",
        logoUrl: "",
      });
      // Animate modal in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate modal out
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: screenHeight,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose();
    });
  };

  const handleInputChange = (field: keyof AppData, value: string) => {
    setNewAppData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert("Permission to access gallery is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 0.8,
    });
    if (!result.canceled) {
      setNewAppData(prev => ({
        ...prev,
        logoUrl: result.assets[0].uri,
      }));
    }
  };

  const handleCreate = () => {
    if (!newAppData.name.trim()) return;
    onCreate(newAppData);
    handleClose();
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      <Modal
        visible={visible}
        animationType="none" // Use 'none' as we're handling animation manually
        transparent
        onRequestClose={handleClose}
        statusBarTranslucent
      >
        <View className="flex-1">
          {/* Backdrop */}
          <Animated.View
            style={{
              opacity: backdropOpacity,
            }}
            className="absolute inset-0 bg-black/30"
          >
            <TouchableOpacity
              className="flex-1"
              activeOpacity={1}
              onPress={handleClose}
            />
          </Animated.View>

          {/* Modal Content */}
          <Animated.View
            style={{
              transform: [{ translateY: slideAnim }],
            }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl"
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              {/* Handle Bar */}
              <View className="items-center py-3">
                <View className="w-10 h-1 bg-gray-300 rounded-full" />
              </View>

              {/* Header */}
              <View className="flex-row items-center justify-between px-6 pb-6">
                <Text className="text-xl font-bold text-gray-900">
                  Create New App
                </Text>
                <TouchableOpacity
                  onPress={handleClose}
                  className="p-2 -mr-2"
                  activeOpacity={0.7}
                >
                  <Ionicons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>

              {/* Form */}
              <View className="px-6 pb-8">
                {/* App Name */}
                <View className="mb-4">
                  <Text className="mb-2 text-base text-gray-700">App Name</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg p-3 text-base"
                    value={newAppData.name}
                    onChangeText={text => handleInputChange("name", text)}
                    placeholder="Enter subscription name"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
                {/* App URL */}
                <View className="mb-4">
                  <Text className="mb-2 text-base text-gray-700">App URL</Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg p-3 text-base"
                    value={newAppData.url}
                    onChangeText={text => handleInputChange("url", text)}
                    placeholder="Enter app URL"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="url"
                    autoCapitalize="none"
                  />
                </View>
                {/* Billing URL */}
                <View className="mb-4">
                  <Text className="mb-2 text-base text-gray-700">
                    Billing URL (Optional)
                  </Text>
                  <TextInput
                    className="border border-gray-300 rounded-lg p-3 text-base"
                    value={newAppData.billingUrl}
                    onChangeText={text => handleInputChange("billingUrl", text)}
                    placeholder="Enter billing URL"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="url"
                    autoCapitalize="none"
                  />
                </View>
                {/* Logo Upload */}
                <View className="mb-4">
                  <Text className="mb-2 text-base text-gray-700">App Logo</Text>
                  <View className="flex-row items-center gap-2">
                    {newAppData.logoUrl ?
                      <Image
                        source={{ uri: newAppData.logoUrl }}
                        className="w-10 h-10 rounded-full self-center"
                        resizeMode="cover"
                      />
                    : <View className="w-12 h-12 rounded-full self-center bg-gray-200 items-center justify-center">
                        <Text className="text-gray-500 text-xs">Logo</Text>
                      </View>
                    }
                    <TouchableOpacity
                      onPress={pickImage}
                      className=" bg-gray-100 border border-gray-300 rounded-lg py-3 w-[80%]"
                    >
                      <Text className="text-center text-gray-700">
                        {newAppData.logoUrl ? "Change Logo" : "Upload Logo"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Save Button */}
                <TouchableOpacity
                  className={`mt-4 p-3 rounded-lg ${newAppData.name.trim() ? "bg-blue-500" : "bg-blue-300"}`}
                  onPress={handleCreate}
                  disabled={!newAppData.name.trim()}
                >
                  <Text className="text-white text-center text-base font-medium">
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </Animated.View>
        </View>
      </Modal>
    </>
  );
};

export default CreateNewAppModal;
