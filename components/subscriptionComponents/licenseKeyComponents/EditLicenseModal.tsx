import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onUpdate: (license: { name: string; key: string; status: string }) => void;
  license: { name: string; key: string; status: string } | null;
};

const EditLicenseModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onUpdate,
  license,
}) => {
  const [name, setName] = useState("");
  const [key, setKey] = useState("");
  const [status, setStatus] = useState("active");

  // Load license values when modal becomes visible
  useEffect(() => {
    if (license) {
      setName(license.name);
      setKey(license.key);
      setStatus(license.status);
    }
  }, [license]);

  const handleUpdate = () => {
    if (name && key && status) {
      onUpdate({ name, key, status });
      onClose();
    }
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/30 justify-end">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              className="bg-white rounded-t-3xl p-6"
            >
              <Text className="text-xl font-bold text-gray-800 mb-6 text-center">
                Edit License
              </Text>

              {/* Name Input */}
              <Text className="text-sm text-gray-600 mb-1">Name</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="License Name"
                className="border border-gray-300 rounded-lg px-4 mb-4 text-base"
                style={{ height: 50 }}
              />

              {/* Key Input */}
              <Text className="text-sm text-gray-600 mb-1">License Key</Text>
              <TextInput
                value={key}
                onChangeText={setKey}
                placeholder="License Key"
                className="border border-gray-300 rounded-lg px-4 mb-4 text-base"
                style={{ height: 50 }}
              />

              {/* Status Picker */}
              <Text className="text-sm text-gray-600 mb-1">Status</Text>
              <View className="border border-gray-300 rounded-lg mb-6 bg-white overflow-hidden">
                <Picker
                  selectedValue={status}
                  onValueChange={itemValue => setStatus(itemValue)}
                  style={{
                    height: 50,
                    paddingHorizontal: 16,
                    color: "#1f2937",
                    fontSize: 16,
                  }}
                  itemStyle={{
                    height: 50,
                    color: "#1f2937",
                    fontSize: 16,
                  }}
                  mode="dialog"
                >
                  <Picker.Item label="Active" value="active" />
                  <Picker.Item label="Inactive" value="inactive" />
                </Picker>
              </View>

              {/* Update Button */}
              <TouchableOpacity
                onPress={handleUpdate}
                className="bg-primary py-3 rounded-lg mb-3"
              >
                <Text className="text-white text-center font-semibold text-base">
                  Update License
                </Text>
              </TouchableOpacity>

              {/* Cancel Button */}
              <TouchableOpacity
                onPress={onClose}
                className="py-3 bg-gray-200 rounded-lg"
              >
                <Text className="text-slate-600 text-center text-base">
                  Cancel
                </Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EditLicenseModal;
