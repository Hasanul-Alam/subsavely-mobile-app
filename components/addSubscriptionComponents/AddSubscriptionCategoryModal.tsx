"use client";

import { Ionicons } from "@expo/vector-icons";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { height: screenHeight } = Dimensions.get("window");

interface AddNameModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
  title?: string;
  inputLabel?: string;
  placeholder?: string;
  confirmButtonText?: string;
}

const AddSubscriptionCategoryModal: React.FC<AddNameModalProps> = ({
  visible,
  onClose,
  onAdd,
  title = "Add New Category",
  inputLabel = "Category Name",
  placeholder = "Enter category name",
  confirmButtonText = "Add",
}) => {
  const [name, setName] = useState("");
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset form when modal opens
      setName("");
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
  }, [visible, slideAnim, backdropOpacity]); // Added slideAnim and backdropOpacity to dependencies [^1]

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

  const handleAdd = () => {
    if (!name.trim()) {
      Alert.alert("Error", `Please enter a ${inputLabel.toLowerCase()}`);
      return;
    }
    onAdd(name.trim());
    handleClose();
  };

  const canAdd = name.trim().length > 0;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
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
              <Text className="text-xl font-bold text-gray-900">{title}</Text>
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
              {/* Name Input */}
              <View className="mb-6">
                <Text className="text-gray-700 font-medium mb-2">
                  {inputLabel}
                </Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder={placeholder}
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
              {/* Action Buttons */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={handleClose}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg"
                  activeOpacity={0.7}
                >
                  <Text className="text-gray-700 text-center font-medium">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleAdd}
                  disabled={!canAdd}
                  className={`flex-1 py-3 px-4 rounded-lg ${canAdd ? "bg-blue-600" : "bg-gray-300"}`}
                  activeOpacity={0.7}
                >
                  <Text
                    className={`text-center font-medium ${canAdd ? "text-white" : "text-gray-500"}`}
                  >
                    {confirmButtonText}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default AddSubscriptionCategoryModal;
