/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { height: screenHeight } = Dimensions.get("window");

interface SelectedFile {
  uri: string;
  name: string;
  type: string;
  size: number;
}

interface AddAttachmentModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, file: SelectedFile) => void;
}

const AddAttachmentModal: React.FC<AddAttachmentModalProps> = ({
  visible,
  onClose,
  onAdd,
}) => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset form when modal opens
      setName("");
      setSelectedFile(null);

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
  }, [visible]);

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

  const pickFile = async () => {
    try {
      setIsLoading(true);
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          "image/*",
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setSelectedFile({
          uri: file.uri,
          name: file.name,
          type: file.mimeType || "unknown",
          size: file.size || 0,
        });

        // Auto-fill name if empty
        if (!name.trim()) {
          setName(file.name.replace(/\.[^/.]+$/, "")); // Remove extension
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick file");
    } finally {
      setIsLoading(false);
    }
  };

  const getFileType = (mimeType: string): "image" | "pdf" | "doc" => {
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType.includes("pdf")) return "pdf";
    return "doc";
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return "document-text";
      case "doc":
        return "document";
      default:
        return "document";
    }
  };

  const getFileIconColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "#DC2626";
      case "doc":
        return "#2563EB";
      default:
        return "#6B7280";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleAdd = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a name for the attachment");
      return;
    }

    if (!selectedFile) {
      Alert.alert("Error", "Please select a file");
      return;
    }

    onAdd(name.trim(), selectedFile);
    handleClose();
  };

  const canAdd = name.trim() && selectedFile;

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
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            {/* Handle Bar */}
            <View className="items-center py-3">
              <View className="w-10 h-1 bg-gray-300 rounded-full" />
            </View>

            {/* Header */}
            <View className="flex-row items-center justify-between px-6 pb-6">
              <Text className="text-xl font-bold text-gray-900">
                Add Attachment
              </Text>
              <TouchableOpacity
                onPress={handleClose}
                className="p-2 -mr-2"
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Form */}
            <View className="px-6 pb-8">
              {/* Name Input */}
              <View className="mb-6">
                <Text className="text-gray-700 font-medium mb-2">
                  Attachment Name
                </Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter attachment name"
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* File Picker */}
              <View className="mb-6">
                <Text className="text-gray-700 font-medium mb-2">
                  Select File
                </Text>

                {!selectedFile ?
                  <TouchableOpacity
                    onPress={pickFile}
                    disabled={isLoading}
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 items-center justify-center bg-gray-50"
                    activeOpacity={0.7}
                  >
                    {isLoading ?
                      <View className="items-center">
                        <Ionicons
                          name="hourglass-outline"
                          size={32}
                          color="#6B7280"
                        />
                        <Text className="text-gray-500 mt-2">Loading...</Text>
                      </View>
                    : <View className="items-center">
                        <Ionicons
                          name="cloud-upload-outline"
                          size={32}
                          color="#6B7280"
                        />
                        <Text className="text-gray-700 font-medium mt-2">
                          Tap to select file
                        </Text>
                        <Text className="text-gray-500 text-sm mt-1">
                          Images, PDFs, and Documents
                        </Text>
                      </View>
                    }
                  </TouchableOpacity>
                : <View className="border border-gray-300 rounded-lg p-4 bg-white">
                    <View className="flex-row items-center">
                      {getFileType(selectedFile.type) === "image" ?
                        <Image
                          source={{ uri: selectedFile.uri }}
                          className="w-12 h-12 rounded-lg mr-3"
                          resizeMode="cover"
                        />
                      : <View className="w-12 h-12 rounded-lg mr-3 bg-gray-100 items-center justify-center">
                          <Ionicons
                            name={
                              getFileIcon(getFileType(selectedFile.type)) as any
                            }
                            size={24}
                            color={getFileIconColor(
                              getFileType(selectedFile.type)
                            )}
                          />
                        </View>
                      }

                      <View className="flex-1">
                        <Text
                          className="text-gray-900 font-medium"
                          numberOfLines={1}
                        >
                          {selectedFile.name}
                        </Text>
                        <Text className="text-gray-500 text-sm mt-1">
                          {formatFileSize(selectedFile.size)} •{" "}
                          {getFileType(selectedFile.type).toUpperCase()}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => setSelectedFile(null)}
                        className="p-2 -mr-2"
                        activeOpacity={0.7}
                      >
                        <Ionicons
                          name="close-circle"
                          size={20}
                          color="#DC2626"
                        />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      onPress={pickFile}
                      className="mt-3 py-2 px-3 bg-gray-100 rounded-lg"
                      activeOpacity={0.7}
                    >
                      <Text className="text-gray-700 text-center font-medium">
                        Change File
                      </Text>
                    </TouchableOpacity>
                  </View>
                }
              </View>

              {/* Action Buttons */}
              <View className="flex-row gap-2">
                <TouchableOpacity
                  onPress={handleClose}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg"
                  activeOpacity={0.7}
                >
                  <Text className="text-gray-700 text-center font-medium">
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleAdd}
                  disabled={!canAdd}
                  className={`flex-1 py-3 px-4 rounded-lg ${
                    canAdd ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  activeOpacity={0.7}
                >
                  <Text
                    className={`text-center font-medium ${
                      canAdd ? "text-white" : "text-gray-500"
                    }`}
                  >
                    Add Attachment
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

export default AddAttachmentModal;
