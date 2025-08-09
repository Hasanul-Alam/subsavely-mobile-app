import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import Card from "../reusableComponents/Card";

const SubscriptionPrice = ({ price, setPrice, currency }: any) => {
  return (
    <>
      <Card>
        <View className="flex-row items-center h-[48px]">
          <TextInput
            className="flex-1 px-4 py-4 text-base text-gray-800"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholder="0.00"
          />
          <View className="border-l border-gray-200 pl-3 pr-4">
            <TouchableOpacity className="flex-row items-center">
              <Text className="text-base text-gray-800 mr-1 font-semibold">
                {currency}
              </Text>
              <Ionicons name="chevron-down" size={14} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </>
  );
};

export default SubscriptionPrice;
