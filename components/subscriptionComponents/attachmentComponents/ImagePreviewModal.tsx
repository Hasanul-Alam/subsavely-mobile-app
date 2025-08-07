import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Image, Modal, TouchableOpacity, View } from "react-native";

const ImagePreviewModal = ({ visible, onClose, imageUrl }: any) => {
  const { width, height } = Dimensions.get("window");
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => onClose()}
      statusBarTranslucent
    >
      <View className="flex-1 bg-black items-center justify-center">
        <TouchableOpacity
          className="absolute top-12 right-4 z-10 bg-black bg-opacity-50 rounded-full"
          onPress={() => onClose()}
        >
          <Ionicons name="close" size={24} color="white" />
        </TouchableOpacity>

        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: width,
              height: height,
            }}
            resizeMode="contain"
            className="rounded-lg"
          />
        )}
      </View>
    </Modal>
  );
};

export default ImagePreviewModal;
