import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

interface InputFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  type?: "text" | "password";
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChangeText,
  placeholder = "",
  type = "text",
  keyboardType = "default",
  autoCapitalize = "none",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <View className="w-full flex-row items-center border border-gray-200 bg-gray-100 rounded-full px-4 py-0 mb-4">
      <TextInput
        className="flex-1 text-base text-black py-3 pr-3"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6b7280"
        secureTextEntry={isPassword && !showPassword}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {isPassword && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={18}
            color={value.length > 0 ? "black" : "gray"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputField;
