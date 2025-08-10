import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioButtonGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export default function RadioButtonGroup({
  options,
  selectedValue,
  onValueChange,
}: RadioButtonGroupProps) {
  return (
    <View style={styles.container}>
      {options.map(option => (
        <TouchableOpacity
          key={option.value}
          style={styles.radioButton}
          onPress={() => onValueChange(option.value)}
        >
          <View style={styles.radioCircle}>
            {selectedValue === option.value && (
              <View style={styles.selectedRadioCircle} />
            )}
          </View>
          <Text style={styles.radioLabel}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#007AFF", // A common blue color for active elements
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedRadioCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: "#007AFF",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
  },
});
