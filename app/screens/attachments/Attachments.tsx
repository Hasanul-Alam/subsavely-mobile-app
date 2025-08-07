import DeleteModal from "@/components/reusableComponents/DeleteModal";
import AddAttachmentModal from "@/components/subscriptionComponents/attachmentComponents/AddAttachmentModal";
import EditAttachmentModal from "@/components/subscriptionComponents/attachmentComponents/EditAttachmentModal";
import ImagePreviewModal from "@/components/subscriptionComponents/attachmentComponents/ImagePreviewModal";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Attachment {
  id: string;
  name: string;
  type: "image" | "pdf" | "doc";
  uri: string;
  size?: string;
}

// Sample data - replace with your actual data
const sampleAttachments: Attachment[] = [
  {
    id: "1",
    name: "Profile Picture.jpg",
    type: "image",
    uri: "https://picsum.photos/400/300?random=1",
    size: "2.3 MB",
  },
  {
    id: "2",
    name: "Resume.pdf",
    type: "pdf",
    uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    size: "1.5 MB",
  },
  {
    id: "3",
    name: "Project Report.docx",
    type: "doc",
    uri: "https://file-examples.com/storage/fe68c8a7c4c2b9c2e9c8b9c/2017/10/file_example_DOC_100kB.doc",
    size: "856 KB",
  },
  {
    id: "4",
    name: "Vacation Photo.png",
    type: "image",
    uri: "https://picsum.photos/400/300?random=2",
    size: "3.1 MB",
  },
];

const Attachments = () => {
  const [attachments, setAttachments] =
    useState<Attachment[]>(sampleAttachments);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isAddAttachmentModalVisible, setIsAddAttachmentModalVisible] =
    useState(false);
  const [editAttachmentModalVisible, setEditAttachmentModalVisible] =
    useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [selectedAttachment, setSelectedAttachment] = useState(null);

  const router = useRouter();

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return "document-text";
      case "doc":
        return "document";
      case "image":
        return "image";
      default:
        return "document";
    }
  };

  const getFileIconColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "#DC2626"; // red-600
      case "doc":
        return "#2563EB"; // blue-600
      case "image":
        return "#059669"; // emerald-600
      default:
        return "#6B7280"; // gray-500
    }
  };

  const handleFilePress = (attachment: Attachment) => {
    if (attachment.type === "image") {
      setSelectedImage(attachment.uri);
      setIsPreviewVisible(true);
    } else {
      handleDownload(attachment);
    }
  };

  const handleDownload = async (attachment: Attachment) => {
    console.log("Download Started");
  };

  const handleEdit = (attachment: any) => {
    setSelectedAttachment(attachment);
    setEditAttachmentModalVisible(true);
  };

  const handleDelete = (attachmentId: string) => {
    setIsDeleteModalVisible(true);
  };

  const handleAddAttachment = () => {
    Alert.alert("Add Attachment", "Choose an option", [
      { text: "Cancel", style: "cancel" },
      { text: "Camera", onPress: () => console.log("Camera pressed") },
      { text: "Gallery", onPress: () => console.log("Gallery pressed") },
      { text: "Files", onPress: () => console.log("Files pressed") },
    ]);
  };

  const renderAttachmentCard = ({ item }: { item: Attachment }) => (
    <View className="bg-white rounded-lg border border-gray-200 mb-4 mx-4">
      <TouchableOpacity
        onPress={() => handleFilePress(item)}
        className="p-4"
        activeOpacity={0.7}
      >
        <View className="flex-row items-center mb-3">
          {item.type === "image" ?
            <Image
              source={{ uri: item.uri }}
              className="w-12 h-12 rounded-lg mr-3"
              resizeMode="cover"
            />
          : <View className="w-12 h-12 rounded-lg mr-3 bg-gray-100 items-center justify-center">
              <Ionicons
                name={getFileIcon(item.type) as any}
                size={24}
                color={getFileIconColor(item.type)}
              />
            </View>
          }
          <View className="flex-1">
            <Text
              className="text-gray-900 font-medium text-base"
              numberOfLines={1}
            >
              {item.name}
            </Text>
            <Text className="text-gray-500 text-sm mt-1">
              {item.size} • {item.type.toUpperCase()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Action Buttons */}
      <View className="flex-row border-t border-gray-100">
        <TouchableOpacity
          onPress={() => handleDownload(item)}
          className="flex-1 flex-row items-center justify-center py-3 border-r border-gray-100"
          activeOpacity={0.7}
        >
          <Ionicons name="download-outline" size={18} color="#6B7280" />
          <Text className="text-gray-600 ml-2 font-medium">Download</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleEdit(item)}
          className="flex-1 flex-row items-center justify-center py-3 border-r border-gray-100"
          activeOpacity={0.7}
        >
          <Ionicons name="create-outline" size={18} color="#6B7280" />
          <Text className="text-gray-600 ml-2 font-medium">Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          className="flex-1 flex-row items-center justify-center py-3"
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={18} color="#DC2626" />
          <Text className="text-red-600 ml-2 font-medium">Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#f3f4f6]">
      <StatusBar barStyle="dark-content" backgroundColor="#f3f4f6" />

      {/* Header */}
      <View className=" border-b border-gray-300 px-4 pb-3 pt-2">
        <View className="flex-row items-center justify-between">
          {/* back button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-row items-center"
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <View>
            <Text className="text-2xl font-bold text-gray-900">
              Attachments
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsAddAttachmentModalVisible(true)}
            className=""
            activeOpacity={0.8}
          >
            <Plus size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Attachments List */}
      {attachments.length > 0 ?
        <FlatList
          data={attachments}
          renderItem={renderAttachmentCard}
          keyExtractor={item => item.id}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        />
      : <View className="flex-1 items-center justify-center px-4">
          <Ionicons name="folder-open-outline" size={64} color="#9CA3AF" />
          <Text className="text-gray-500 text-lg font-medium mt-4">
            No attachments
          </Text>
          <Text className="text-gray-400 text-center mt-2">
            Tap the + button to add your first attachment
          </Text>
        </View>
      }

      {/* Image Preview Modal */}

      <ImagePreviewModal
        visible={isPreviewVisible}
        onClose={() => setIsPreviewVisible(false)}
        imageUrl={selectedImage}
      />

      {/* Add Attachment Modal */}
      <AddAttachmentModal
        visible={isAddAttachmentModalVisible}
        onClose={() => setIsAddAttachmentModalVisible(false)}
        onAdd={handleAddAttachment}
      />

      {/* Edit Attachment Modal */}
      <EditAttachmentModal
        visible={editAttachmentModalVisible}
        onClose={() => setEditAttachmentModalVisible(false)}
        attachment={selectedAttachment}
        onUpdate={() => {
          console.log("Updated attachment");
        }}
      />

      <DeleteModal
        visible={isDeleteModalVisible}
        onClose={() => setIsDeleteModalVisible(false)}
        onDelete={() => console.log("Attachment Deleted")}
      />
    </SafeAreaView>
  );
};

export default Attachments;
