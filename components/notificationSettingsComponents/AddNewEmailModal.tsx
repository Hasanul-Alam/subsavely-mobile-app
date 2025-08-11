/* eslint-disable react-hooks/exhaustive-deps */
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
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

interface SimpleModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (value: string) => void;
}

const AddNewEmailModal: React.FC<SimpleModalProps> = ({
  visible,
  onClose,
  onAdd,
}) => {
  const [inputValue, setInputValue] = useState("");

  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setInputValue(""); // reset
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

  const handleAdd = () => {
    if (inputValue.trim()) {
      onAdd(inputValue.trim());
      handleClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={handleClose}
    >
      <View className="flex-1">
        {/* Backdrop */}
        <Animated.View
          style={{ opacity: backdropOpacity }}
          className="absolute inset-0 bg-black/20"
        >
          <TouchableOpacity className="flex-1" onPress={handleClose} />
        </Animated.View>

        {/* Bottom Sheet */}
        <Animated.View
          style={{ transform: [{ translateY: slideAnim }] }}
          className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            {/* Handle bar */}
            <View className="items-center py-3">
              <View className="w-10 h-1 bg-gray-300 rounded-full" />
            </View>

            {/* Header */}
            <View className="flex-row items-center justify-between px-6 pb-6">
              <Text className="text-xl font-bold text-gray-900">
                Add New Email
              </Text>
              <TouchableOpacity onPress={handleClose} className="p-2 -mr-2">
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Input */}
            <View className="px-6 pb-8">
              <Text className="text-gray-700 font-medium mb-2">Email</Text>
              <TextInput
                value={inputValue}
                onChangeText={setInputValue}
                placeholder="Ex: example@hotmail.com"
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                keyboardType="email-address"
              />

              {/* Buttons */}
              <View className="flex-row gap-2 mt-6">
                <TouchableOpacity
                  onPress={handleClose}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg"
                >
                  <Text className="text-gray-700 text-center font-medium">
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleAdd}
                  disabled={!inputValue.trim()}
                  className={`flex-1 py-3 px-4 rounded-lg ${
                    inputValue.trim() ? "bg-primary" : "bg-gray-300"
                  }`}
                >
                  <Text
                    className={`text-center font-medium ${
                      inputValue.trim() ? "text-white" : "text-gray-500"
                    }`}
                  >
                    Add
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

export default AddNewEmailModal;
