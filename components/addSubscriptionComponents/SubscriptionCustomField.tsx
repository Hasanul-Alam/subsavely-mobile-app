import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../reusableComponents/Card";

interface CustomField {
  key: string;
  value: string;
}

const SubscriptionCustomField = () => {
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleAddField = () => {
    setCustomFields(prev => [...prev, { key: "", value: "" }]);
  };

  const handleChange = (
    index: number,
    field: keyof CustomField,
    text: string
  ) => {
    setCustomFields(prev => {
      const updated = [...prev];
      updated[index][field] = text;
      return updated;
    });
  };

  const handleRemoveField = (index: number) => {
    setCustomFields(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Card style={{ marginVertical: 10 }}>
        <TouchableOpacity
          onPress={handleAddField}
          className="px-4 py-3 flex-row items-center"
        >
          <View className="w-7 h-7 rounded-full bg-purple-100 items-center justify-center mr-2">
            <Ionicons name="options" size={16} color="#7C3AED" />
          </View>
          <Text className="text-purple-600 text-base font-semibold">
            Add Custom Field
          </Text>
        </TouchableOpacity>
      </Card>

      {customFields.map((field, index) => (
        <View
          key={index}
          className={`flex-row items-center gap-3 pt-3 ${
            index === customFields.length - 1 && isKeyboardVisible ?
              "pb-5"
            : "pb-0"
          }`}
        >
          <TextInput
            placeholder="Key"
            value={field.key}
            onChangeText={text => handleChange(index, "key", text)}
            className="flex-1 border border-gray-300 rounded-lg px-2 py-3"
          />
          <TextInput
            placeholder="Value"
            value={field.value}
            onChangeText={text => handleChange(index, "value", text)}
            className="flex-1 border border-gray-300 px-2 py-3 rounded-lg"
          />
          <TouchableOpacity onPress={() => handleRemoveField(index)}>
            <Ionicons name="close-circle" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ))}
    </>
  );
};

export default SubscriptionCustomField;
