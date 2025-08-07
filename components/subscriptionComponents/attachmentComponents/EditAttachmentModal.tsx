/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
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
import ImagePreviewModal from "./ImagePreviewModal";

const { height: screenHeight } = Dimensions.get("window");

interface Attachment {
  id: string;
  name: string;
  type: "image" | "pdf" | "doc";
  uri: string;
  size?: string;
}

interface SelectedFile {
  uri: string;
  name: string;
  type: string;
  size: number;
}

interface EditAttachmentModalProps {
  visible: boolean;
  attachment: Attachment | null;
  onClose: () => void;
  onUpdate: (id: string, name: string, file?: SelectedFile) => void;
}

const EditAttachmentModal: React.FC<EditAttachmentModalProps> = ({
  visible,
  attachment,
  onClose,
  onUpdate,
}) => {
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);
  const [hasFileChanged, setHasFileChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openImagePreviewModal, setOpenImagePreviewModal] = useState(false);

  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && attachment) {
      // Pre-populate form with existing attachment data
      setName(attachment.name);
      setSelectedFile({
        uri: attachment.uri,
        name: attachment.name,
        type:
          attachment.type === "image" ? "image/*"
          : attachment.type === "pdf" ? "application/pdf"
          : "application/msword",
        size: parseSizeString(attachment.size || "0 KB"),
      });
      setHasFileChanged(false);

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
    } else if (!visible) {
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
  }, [visible, attachment]);

  const parseSizeString = (sizeStr: string): number => {
    const match = sizeStr.match(/^([\d.]+)\s*(KB|MB|GB|Bytes)$/i);
    if (!match) return 0;

    const value = parseFloat(match[1]);
    const unit = match[2].toUpperCase();

    switch (unit) {
      case "GB":
        return value * 1024 * 1024 * 1024;
      case "MB":
        return value * 1024 * 1024;
      case "KB":
        return value * 1024;
      default:
        return value;
    }
  };

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
        setHasFileChanged(true);

        // Auto-update name if it matches the old filename
        if (attachment && name === attachment.name) {
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

  const handleUpdate = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a name for the attachment");
      return;
    }

    if (!selectedFile) {
      Alert.alert("Error", "Please select a file");
      return;
    }

    if (!attachment) return;

    // Only pass the file if it has changed
    onUpdate(
      attachment.id,
      name.trim(),
      hasFileChanged ? selectedFile : undefined
    );
    handleClose();
  };

  const resetFile = () => {
    if (!attachment) return;

    Alert.alert(
      "Reset File",
      "Are you sure you want to reset to the original file?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          onPress: () => {
            setSelectedFile({
              uri: attachment.uri,
              name: attachment.name,
              type:
                attachment.type === "image" ? "image/*"
                : attachment.type === "pdf" ? "application/pdf"
                : "application/msword",
              size: parseSizeString(attachment.size || "0 KB"),
            });
            setHasFileChanged(false);
          },
        },
      ]
    );
  };

  const canUpdate = name.trim() && selectedFile;
  const hasChanges = attachment && (name !== attachment.name || hasFileChanged);

  if (!attachment) return null;

  return (
    <>
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
              <View className="flex-row items-center justify-between px-6 pb-4">
                <View className="flex-1">
                  <Text className="text-xl font-bold text-gray-900">
                    Edit Attachment
                  </Text>
                  {hasChanges && (
                    <Text className="text-orange-600 text-sm mt-1">
                      Unsaved changes
                    </Text>
                  )}
                </View>
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

                {/* File Section */}
                <View className="mb-6">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-gray-700 font-medium">File</Text>
                    {hasFileChanged && (
                      <TouchableOpacity
                        onPress={resetFile}
                        className="px-3 py-1 bg-gray-100 rounded-full"
                        activeOpacity={0.7}
                      >
                        <Text className="text-gray-600 text-xs font-medium">
                          Reset to Original
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  {selectedFile && (
                    <View className="border border-gray-300 rounded-lg p-4 bg-white">
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
                                getFileIcon(
                                  getFileType(selectedFile.type)
                                ) as any
                              }
                              size={24}
                              color={getFileIconColor(
                                getFileType(selectedFile.type)
                              )}
                            />
                          </View>
                        }

                        <View className="flex-1">
                          <View className="flex-row items-center">
                            <Text
                              className="text-gray-900 font-medium flex-1"
                              numberOfLines={1}
                            >
                              {selectedFile.name}
                            </Text>
                            {hasFileChanged && (
                              <View className="bg-green-100 px-2 py-1 rounded-full ml-2">
                                <Text className="text-green-700 text-xs font-medium">
                                  New
                                </Text>
                              </View>
                            )}
                          </View>
                          <Text className="text-gray-500 text-sm mt-1">
                            {formatFileSize(selectedFile.size)} •{" "}
                            {getFileType(selectedFile.type).toUpperCase()}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row mt-3 gap-2">
                        <TouchableOpacity
                          onPress={pickFile}
                          disabled={isLoading}
                          className="flex-1 py-2 px-3 bg-blue-50 border border-blue-200 rounded-lg"
                          activeOpacity={0.7}
                        >
                          <Text className="text-blue-700 text-center font-medium">
                            {isLoading ? "Loading..." : "Change File"}
                          </Text>
                        </TouchableOpacity>

                        {getFileType(selectedFile.type) === "image" && (
                          <TouchableOpacity
                            onPress={() => {
                              setOpenImagePreviewModal(true);
                            }}
                            className="px-4 py-2 bg-gray-100 rounded-lg"
                            activeOpacity={0.7}
                          >
                            <Ionicons
                              name="eye-outline"
                              size={18}
                              color="#6B7280"
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  )}
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
                    onPress={handleUpdate}
                    disabled={!canUpdate || !hasChanges}
                    className={`flex-1 py-3 px-4 rounded-lg ${
                      canUpdate && hasChanges ? "bg-blue-600" : "bg-gray-300"
                    }`}
                    activeOpacity={0.7}
                  >
                    <Text
                      className={`text-center font-medium ${
                        canUpdate && hasChanges ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {!hasChanges ? "No Changes" : "Update Attachment"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </Animated.View>
        </View>
      </Modal>

      <ImagePreviewModal
        visible={openImagePreviewModal}
        onClose={() => setOpenImagePreviewModal(false)}
        imageUrl={selectedFile?.uri}
      />
    </>
  );
};

export default EditAttachmentModal;
