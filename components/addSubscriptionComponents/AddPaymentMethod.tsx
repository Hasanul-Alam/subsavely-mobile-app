import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AddPaymentMethodModal from "./AddPaymentMethodModal";

const AddPaymentMethod = () => {
  const [openAddPaymentMethodModal, setOpenAddPaymentMethodModal] =
    useState(false);
  return (
    <>
      <TouchableOpacity
        className="px-4 py-3 flex-row items-center"
        onPress={() => setOpenAddPaymentMethodModal(true)}
      >
        <View className="w-7 h-7 rounded-full bg-indigo-100 items-center justify-center mr-2">
          <Ionicons name="add" size={16} color="#4F46E5" />
        </View>
        <Text className="text-indigo-600 text-base font-semibold">
          Add Payment Method
        </Text>
      </TouchableOpacity>

      {openAddPaymentMethodModal && (
        <AddPaymentMethodModal
          visible={openAddPaymentMethodModal}
          onClose={() => setOpenAddPaymentMethodModal(false)}
        />
      )}
    </>
  );
};

export default AddPaymentMethod;
