import React, { useEffect, useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

type AddEditNoteModalProps = {
  isEdit?: boolean;
  isAdd?: boolean;
  note?: { id: string; title: string; content: string };
  onClose: () => void;
  onSubmit: (content: string) => void;
};

const AddEditNoteModal = ({
  isEdit = false,
  isAdd = false,
  note,
  onClose,
  onSubmit,
}: AddEditNoteModalProps) => {
  const visible = isEdit || isAdd;
  const [content, setContent] = useState("");

  useEffect(() => {
    if (isEdit && note?.content) {
      setContent(note.content);
    } else if (isAdd) {
      setContent("");
    }
  }, [isEdit, isAdd, note]);

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content.trim());
      onClose();
    }
  };

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
          <Text className="text-lg font-bold mb-3">
            {isEdit ?
              "Edit Note"
            : isAdd ?
              "Add Note"
            : "Note"}
          </Text>

          <TextInput
            multiline
            value={content}
            onChangeText={setContent}
            placeholder="Write your note here..."
            className="border border-gray-300 rounded-md p-3 text-base text-gray-800 h-40 mb-5"
            textAlignVertical="top"
          />

          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={onClose}
              className="bg-gray-400 py-2 px-4 rounded-md flex-1"
            >
              <Text className="text-white text-base text-center">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-primary py-2 px-4 rounded-md flex-1"
            >
              <Text className="text-white text-base text-center">
                {isEdit ?
                  "Update"
                : isAdd ?
                  "Add"
                : "Submit"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddEditNoteModal;
