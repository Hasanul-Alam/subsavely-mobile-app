import { useRouter } from "expo-router";
import React from "react";
import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const options = [
  {
    name: "Activity Log",
    route: "/screens/activityLogs/ActivityLogs",
  },
  {
    name: "Notes",
    route: "/screens/notes/Notes",
  },
  {
    name: "License Key",
    route: "/screens/licenseKeys/LicenseKeys",
  },
  {
    name: "Coupons",
    route: "/screens/coupons/Coupons",
  },
  {
    name: "Attachments",
    route: "/attachments",
  },
  {
    name: "Custom Fields",
    route: "/customFields",
  },
];

export default function OptionsModal({
  visible,
  onClose,
  onOptionSelect,
}: any) {
  const router = useRouter();
  const handleOnPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-transparent">
          <View className="absolute right-4 top-8">
            <TouchableWithoutFeedback>
              <View className="bg-white rounded-xl px-5 py-4 border border-[#3a3a3a] ">
                {options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    className="flex-row items-center justify-between my-2"
                    onPress={() => {
                      onClose();
                      handleOnPress(option.route);
                    }}
                  >
                    <Text className="text-lg text-black font-normal">
                      {option.name}
                    </Text>
                    {/* <MaterialIcons
                      name="keyboard-arrow-right"
                      size={24}
                      color="black"
                    /> */}
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
