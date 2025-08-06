/* eslint-disable import/no-named-as-default */
// components/FilterModal.tsx
import Checkbox from "expo-checkbox";
import React from "react";
import {
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

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
    className="flex-row items-center mb-3"
    hitSlop={10}
  >
    <Checkbox
      value={checked}
      onValueChange={onToggle}
      color={checked ? "#7c3aed" : undefined}
      className="mr-3"
    />
    <Text className="text-base text-gray-700">{label}</Text>
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

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.3)" }}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={{ flex: 1 }} />
        </TouchableWithoutFeedback>

        <View className="bg-white rounded-t-3xl px-6 py-5 shadow-lg shadow-black/10">
          <Text className="text-lg font-bold text-gray-900 mb-5">Filters</Text>

          <View className="mb-6">
            <Text className="text-base font-semibold text-gray-800 mb-3">
              Status
            </Text>
            {FILTER_STATUS.map(item => (
              <CheckboxItem
                key={item}
                label={item}
                checked={status.includes(item)}
                onToggle={() => toggleSelection(status, setStatus, item)}
              />
            ))}
          </View>

          <View className="mb-2">
            <Text className="text-base font-semibold text-gray-800 mb-3">
              Billing Period
            </Text>
            {BILLING_PERIOD.map(item => (
              <CheckboxItem
                key={item}
                label={item}
                checked={billing.includes(item)}
                onToggle={() => toggleSelection(billing, setBilling, item)}
              />
            ))}
          </View>

          <View className="mt-4">
            <TouchableOpacity
              onPress={resetFilters}
              className="px-5 py-3 rounded-xl bg-gray-100 border border-gray-300"
            >
              <Text className="text-gray-700 font-medium text-center">
                Reset
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={applyFilters}
              className="px-5 py-3 rounded-xl bg-violet-600 mt-3"
            >
              <Text className="text-white font-semibold text-center">
                Apply Filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
