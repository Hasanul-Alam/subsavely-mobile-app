/* eslint-disable import/no-named-as-default */
// components/FilterModal.tsx
import Checkbox from "expo-checkbox";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { height: screenHeight } = Dimensions.get("window");

const CheckboxItem = ({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) => (
  <Pressable
    onPress={onToggle}
    className="flex-row items-center py-4 px-4 mx-1 rounded-2xl bg-gray-50/80 mb-2 border border-gray-100"
    hitSlop={10}
  >
    <View className="w-5 h-5 mr-4">
      <Checkbox
        value={checked}
        onValueChange={onToggle}
        color={checked ? "#3b82f6" : "#d1d5db"}
        className="w-5 h-5"
      />
    </View>
    <Text
      className={`text-base flex-1 ${checked ? "text-blue-700 font-medium" : "text-gray-700"}`}
    >
      {label}
    </Text>
    {checked && <View className="w-2 h-2 rounded-full bg-blue-500" />}
  </Pressable>
);

const FilterModal = ({
  visible,
  onClose,
  status,
  billing,
  setStatus,
  setBilling,
  resetFilters,
  applyFilters,
  FILTER_STATUS,
  BILLING_PERIOD,
}: {
  visible: boolean;
  onClose: () => void;
  status: string[];
  billing: string[];
  setStatus: React.Dispatch<React.SetStateAction<string[]>>;
  setBilling: React.Dispatch<React.SetStateAction<string[]>>;
  resetFilters: () => void;
  applyFilters: () => void;
  FILTER_STATUS: string[];
  BILLING_PERIOD: string[];
}) => {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
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

  const toggleSelection = (
    current: string[],
    setFn: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    if (current.includes(value)) {
      setFn(current.filter(v => v !== value));
    } else {
      setFn([...current, value]);
    }
  };

  const totalFilters = status.length + billing.length;

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
          {/* Handle Bar */}
          <View className="items-center py-3">
            <View className="w-10 h-1 bg-gray-300 rounded-full" />
          </View>

          {/* Header */}
          <View className="px-6 pb-6 border-b border-gray-100">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Text className="text-2xl font-bold text-gray-900">
                  Filters
                </Text>
                {totalFilters > 0 && (
                  <View className="ml-3 px-3 py-1 bg-blue-100 rounded-full">
                    <Text className="text-sm font-semibold text-blue-700">
                      {totalFilters}
                    </Text>
                  </View>
                )}
              </View>
              <TouchableOpacity
                onPress={handleClose}
                className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
                activeOpacity={0.7}
              >
                <Text className="text-gray-500 font-bold text-lg">×</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Scrollable Content */}
          <ScrollView
            className="flex-1 px-6 py-4"
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            {/* Status Section */}
            <View className="mb-8">
              <View className="flex-row items-center mb-4">
                <View className="w-1 h-6 bg-blue-500 rounded-full mr-3" />
                <Text className="text-lg font-bold text-gray-900">Status</Text>
                {status.length > 0 && (
                  <View className="ml-2 px-2 py-1 bg-blue-50 rounded-lg">
                    <Text className="text-xs font-medium text-blue-600">
                      {status.length} selected
                    </Text>
                  </View>
                )}
              </View>
              <View className="space-y-1">
                {FILTER_STATUS.map(item => (
                  <CheckboxItem
                    key={item}
                    label={item}
                    checked={status.includes(item)}
                    onToggle={() => toggleSelection(status, setStatus, item)}
                  />
                ))}
              </View>
            </View>

            {/* Billing Period Section */}
            <View className="">
              <View className="flex-row items-center mb-4">
                <View className="w-1 h-6 bg-emerald-500 rounded-full mr-3" />
                <Text className="text-lg font-bold text-gray-900">
                  Billing Period
                </Text>
                {billing.length > 0 && (
                  <View className="ml-2 px-2 py-1 bg-emerald-50 rounded-lg">
                    <Text className="text-xs font-medium text-emerald-600">
                      {billing.length} selected
                    </Text>
                  </View>
                )}
              </View>
              <View className="space-y-1">
                {BILLING_PERIOD.map(item => (
                  <CheckboxItem
                    key={item}
                    label={item}
                    checked={billing.includes(item)}
                    onToggle={() => toggleSelection(billing, setBilling, item)}
                  />
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Footer */}
          <View className="px-6 pb-6 border-t border-gray-100 bg-gray-50/50">
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={resetFilters}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg bg-white"
                activeOpacity={0.7}
              >
                <Text className="text-gray-700 text-center font-medium">
                  Reset
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={applyFilters}
                className="flex-1 py-3 px-4 rounded-lg bg-blue-600"
                activeOpacity={0.7}
              >
                <Text className="text-white text-center font-medium">
                  Apply Filters
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default FilterModal;
