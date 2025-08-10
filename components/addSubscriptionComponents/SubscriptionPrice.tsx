import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import currencies from "../../fakeData/fakeCurrencies";
import Card from "../reusableComponents/Card";

const SubscriptionPrice = ({ price, setPrice, currency, setCurrency }: any) => {
  const [showCurrencies, setShowCurrencies] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
  });

  const triggerRef = useRef<any>(null);

  const toggleDropdown = () => {
    if (triggerRef.current) {
      triggerRef.current.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          setDropdownPosition({ x, y: y + height, width });
          setShowCurrencies(prev => !prev);
        }
      );
    }
  };

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
            <TouchableOpacity
              ref={triggerRef}
              className="flex-row items-center"
              onPress={() => toggleDropdown()}
            >
              <Text className="text-base text-gray-800 mr-1 font-semibold">
                {currency.symbol}
              </Text>
              <Ionicons name="chevron-down" size={14} color="#6B7280" />
            </TouchableOpacity>
          </View>
        </View>
      </Card>

      {showCurrencies && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={showCurrencies}
          onRequestClose={() => setShowCurrencies(false)}
        >
          <Pressable
            className="flex-1"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}
            onPress={() => setShowCurrencies(false)}
          >
            <View
              className="absolute bg-white rounded-lg shadow max-h-60 overflow-hidden z-50"
              style={{
                top: dropdownPosition.y + 15,
                left: dropdownPosition.x - 115,
                width: dropdownPosition.width + 130,
              }}
            >
              <FlatList
                data={currencies}
                keyExtractor={item => item.code}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  const isSelected = item.code === currency.code;
                  return (
                    <TouchableOpacity
                      className="flex-row items-center py-3 border-b border-gray-200 px-3"
                      onPress={() => {
                        setCurrency(item);
                        setShowCurrencies(false);
                      }}
                      activeOpacity={0.7}
                    >
                      <View className="flex-row items-center ">
                        <Text className="text-base text-gray-700 mr-2">
                          {item.name}
                        </Text>
                        <Text className="text-base text-gray-700 flex-1">
                          {item.symbol}
                        </Text>
                        {isSelected && (
                          <Ionicons
                            name="checkmark"
                            size={18}
                            color="#3B82F6"
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </Pressable>
        </Modal>
      )}
    </>
  );
};

export default SubscriptionPrice;
