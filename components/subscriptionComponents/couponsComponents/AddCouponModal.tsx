import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";

// Define prop types for better type safety
interface AddCouponModalProps {
  isVisible: boolean;
  onClose: () => void;
  onAdd?: (couponData: {
    name: string;
    discountAmount: string;
    couponCode: string;
    expiryDate: Date;
    couponNote: string;
  }) => void;
}

const AddCouponModal: React.FC<AddCouponModalProps> = ({
  isVisible,
  onClose,
  onAdd,
}) => {
  // State for form fields
  const [name, setName] = useState<string>("");
  const [discountAmount, setDiscountAmount] = useState<string>("");
  const [couponCode, setCouponCode] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<Date>(new Date());
  const [couponNote, setCouponNote] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  /**
   * Handles adding a new coupon
   * Currently logs the data, but can be extended to call onAdd prop
   */
  const handleAddCoupon = () => {
    const couponData = {
      name,
      discountAmount: discountAmount,
      couponCode,
      expiryDate,
      couponNote,
    };
    console.log(couponData);
    // Uncomment to use the onAdd prop when available
    // onAdd?.(couponData);
  };

  /**
   * Handles date change from the DateTimePicker
   * @param event - The change event
   * @param selectedDate - The newly selected date
   */
  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setExpiryDate(selectedDate);
    }
  };

  /**
   * Formats a date to DD/MM/YYYY string
   * @param date - The date to format
   * @returns Formatted date string
   */
  const formatDate = (date: Date): string => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Dismiss keyboard when tapping outside inputs */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 bg-white">
          <SafeAreaView className="flex-1">
            {/* Keyboard handling for different platforms */}
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS === "android" ? 30 : 0}
              className="flex-1 pt-0 pb-6"
            >
              {/* Header with back button and title */}
              <View className=" mt-4 mb-6 border-b border-gray-300 pb-3">
                <View className="flex-row items-center justify-between px-4">
                  <TouchableOpacity onPress={onClose} className="">
                    <Ionicons name="arrow-back" size={27} color="#000" />
                  </TouchableOpacity>
                  <Text className="text-xl font-bold text-gray-800 text-center">
                    Add Coupon
                  </Text>
                  {/* Cross button */}
                  <View>
                    <TouchableOpacity onPress={onClose}>
                      <Ionicons name="close" size={27} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View className="px-4">
                {/* Name Input Field */}
                <Text className="text-md text-gray-600 mb-1">Name</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Ex: Summer Sale"
                  className="border border-gray-300 rounded-lg px-4 mb-4 text-base"
                  style={{ height: 50 }}
                />

                {/* Discount Amount Input Field */}
                <Text className="text-md text-gray-600 mb-1">
                  Discount Amount
                </Text>
                <TextInput
                  value={discountAmount}
                  onChangeText={setDiscountAmount}
                  placeholder="Ex: 10%"
                  keyboardType="numeric"
                  className="border border-gray-300 rounded-lg px-4 mb-4 text-base"
                  style={{ height: 50 }}
                />

                {/* Coupon Code Input Field */}
                <Text className="text-md text-gray-600 mb-1">Coupon Code</Text>
                <TextInput
                  value={couponCode}
                  onChangeText={setCouponCode}
                  placeholder="Ex: SUMMER10"
                  className="border border-gray-300 rounded-lg px-4 mb-4 text-base"
                  style={{ height: 50 }}
                />

                {/* Expiry Date Picker */}
                <Text className="text-md text-gray-600 mb-1">Expiry Date</Text>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
                >
                  <Text className="text-base text-gray-800">
                    {formatDate(expiryDate)}
                  </Text>
                </TouchableOpacity>

                {/* Date Picker Modal */}
                {showDatePicker && (
                  <DateTimePicker
                    value={expiryDate}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                    themeVariant="light"
                  />
                )}

                {/* Coupon Note Input Field */}
                <Text className="text-md text-gray-600 mb-1">Note</Text>
                <TextInput
                  value={couponNote}
                  onChangeText={setCouponNote}
                  placeholder="Ex: Limited Time Offer"
                  className="border border-gray-300 rounded-lg px-4 mb-4 text-base"
                  style={{ height: 50 }}
                />

                {/* Action Buttons */}
                <TouchableOpacity
                  onPress={handleAddCoupon}
                  className="bg-primary py-3 rounded-lg mb-3"
                >
                  <Text className="text-white text-center font-semibold text-base">
                    Add Coupon
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={onClose}
                  className="py-3 bg-gray-200 rounded-lg"
                >
                  <Text className="text-slate-600 text-center text-base">
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddCouponModal;
