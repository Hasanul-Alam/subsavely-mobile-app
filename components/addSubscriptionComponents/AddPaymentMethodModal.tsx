"use client";

import { Picker } from "@react-native-picker/picker";
import type React from "react";
import { useEffect, useRef, useState } from "react";
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

interface ModalFormProps {
  visible: boolean;
  onClose: () => void;
}

const AddPaymentMethodModal: React.FC<ModalFormProps> = ({
  visible,
  onClose,
}) => {
  // State for input values (you can expand this for all 5 inputs)
  const [paymentMethodType, setPaymentMethodType] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [inputValue4, setInputValue4] = useState("");
  const [inputValue5, setInputValue5] = useState("");

  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset form when modal opens (optional, depending on desired behavior)

      setInputValue2("");
      setInputValue3("");
      setInputValue4("");
      setInputValue5("");

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
  }, [visible, slideAnim, backdropOpacity]);

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

  // You can add a submission handler here if needed for the 5 inputs
  const handleSubmit = () => {
    // Example: Log input values
    console.log("Input 2:", inputValue2);
    console.log("Input 3:", inputValue3);
    console.log("Input 4:", inputValue4);
    console.log("Input 5:", inputValue5);
    // Add your logic to process the inputs, e.g., send to an API
    handleClose(); // Close modal after submission
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none" // Custom animation handled by Animated API
      onRequestClose={handleClose}
      statusBarTranslucent // Ensures modal covers status bar
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
            activeOpacity={1} // No visual feedback on touch
            onPress={handleClose}
            accessibilityLabel="Close modal by tapping outside"
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
            <View className="flex-row items-center justify-center pb-3 ">
              <View className="w-full">
                <Text className="text-xl font-bold text-gray-900 text-center">
                  Add New Payment Method
                </Text>
                <Text className="text-xs text-gray-600 text-center">
                  Your details are protected and encrypted for your security.
                </Text>
                <View className="h-[1px] bg-gray-200 mt-3 mb-3" />
              </View>
            </View>

            {/* Form with 5 Inputs */}
            <View className="px-6 pb-8">
              <View className="border border-gray-300 rounded-lg text-gray-900 mb-4">
                <Picker
                  selectedValue={paymentMethodType}
                  onValueChange={(itemValue, itemIndex) =>
                    setPaymentMethodType(itemValue)
                  }
                  mode="dropdown"
                  dropdownIconRippleColor={"#fff"}
                >
                  <Picker.Item label="Card" value="card" />
                  <Picker.Item label="Bank Account" value="bank" />
                  <Picker.Item label="Mobile Banking" value="mobile_banking" />
                </Picker>
              </View>
              <TextInput
                value={inputValue2}
                onChangeText={setInputValue2}
                placeholder="Input Field 2"
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white mb-4"
                placeholderTextColor="#9CA3AF"
                accessibilityLabel="Input Field 2"
              />
              <TextInput
                value={inputValue3}
                onChangeText={setInputValue3}
                placeholder="Input Field 3"
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white mb-4"
                placeholderTextColor="#9CA3AF"
                accessibilityLabel="Input Field 3"
              />
              <TextInput
                value={inputValue4}
                onChangeText={setInputValue4}
                placeholder="Input Field 4"
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white mb-4"
                placeholderTextColor="#9CA3AF"
                accessibilityLabel="Input Field 4"
              />
              <TextInput
                value={inputValue5}
                onChangeText={setInputValue5}
                placeholder="Input Field 5"
                className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white mb-6"
                placeholderTextColor="#9CA3AF"
                accessibilityLabel="Input Field 5"
              />

              {/* Action Buttons */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={handleClose}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg"
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel="Cancel"
                >
                  <Text className="text-gray-700 text-center font-medium">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="flex-1 py-3 px-4 rounded-lg bg-blue-600"
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel="Submit"
                >
                  <Text className="text-center font-medium text-white">
                    Submit
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

export default AddPaymentMethodModal;
