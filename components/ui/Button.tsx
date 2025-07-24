import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  className?: string;
  textClassName?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  className = "",
  textClassName = "",
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-full items-center py-4 ${className}`}
    >
      <Text className={`text-base font-semibold ${textClassName}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
