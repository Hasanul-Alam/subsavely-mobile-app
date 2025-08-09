import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../reusableComponents/Card";

interface SubscriptionBillingPeriodProps {
  billingPeriod: string;
  setBillingPeriod: (period: string) => void;
}

const SubscriptionBillingPeriod = ({
  billingPeriod,
  setBillingPeriod,
}: SubscriptionBillingPeriodProps) => {
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const triggerRef = useRef<any>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
  });

  const toggleDropdown = () => {
    if (triggerRef.current) {
      triggerRef.current.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          setDropdownPosition({ x, y: y + height, width });
          setShowOptionsModal(prev => !prev);
        }
      );
    }
  };

  const periods = ["Monthly", "Yearly", "Lifetime"];

  return (
    <>
      <Card>
        <TouchableOpacity
          ref={triggerRef} // ✅ Added so measureInWindow works
          className="px-3 py-4 flex-row items-center justify-between h-[48px]"
          onPress={toggleDropdown}
          activeOpacity={0.7}
        >
          <View className="flex-row items-center">
            <View className="w-7 h-7 rounded-full bg-blue-100 items-center justify-center mr-2">
              <Ionicons name="calendar" size={14} color="#3B82F6" />
            </View>
            <Text className="text-base text-gray-600">
              {billingPeriod || "Monthly"}
            </Text>
          </View>
          <Ionicons
            name={showOptionsModal ? "chevron-up" : "chevron-down"}
            size={18}
            color="#6B7280"
          />
        </TouchableOpacity>
      </Card>

      {showOptionsModal && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={showOptionsModal}
          onRequestClose={() => setShowOptionsModal(false)}
        >
          <Pressable
            className="flex-1"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}
            onPress={() => setShowOptionsModal(false)}
          >
            <View
              className="absolute bg-white rounded-lg shadow max-h-60 overflow-hidden z-50"
              style={{
                top: dropdownPosition.y + 5,
                left: dropdownPosition.x,
                width: dropdownPosition.width,
              }}
            >
              <FlatList
                data={periods}
                keyExtractor={item => item}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => {
                  const isSelected = billingPeriod === item;
                  return (
                    <TouchableOpacity
                      className="flex-row items-center py-3 px-2 border-b border-gray-200"
                      onPress={() => {
                        setBillingPeriod(item);
                        setShowOptionsModal(false);
                      }}
                      activeOpacity={0.7}
                    >
                      <Text className="text-base text-gray-700 flex-1">
                        {item}
                      </Text>
                      {isSelected && (
                        <Ionicons name="checkmark" size={18} color="#3B82F6" />
                      )}
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

export default SubscriptionBillingPeriod;
