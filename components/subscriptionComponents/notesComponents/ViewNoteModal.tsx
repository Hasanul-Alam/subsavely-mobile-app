import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

type ViewNoteModalProps = {
  visible: boolean;
  note?: { id: string; title: string; content: string };
  onClose: () => void;
};

const ViewNoteModal = ({ visible, note, onClose }: ViewNoteModalProps) => {
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/40 justify-center items-center">
        <View className="bg-white rounded-xl p-5 w-11/12 max-w-md shadow-lg">
          <Text className="text-lg font-bold mb-3">View Note</Text>

          <Text className="text-base mb-5 text-gray-800">
            {note?.content || "No content"}
          </Text>

          <TouchableOpacity
            onPress={onClose}
            className="py-2 px-4 rounded-md bg-primary w-full"
          >
            <Text className="text-white text-base text-center">Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ViewNoteModal;
