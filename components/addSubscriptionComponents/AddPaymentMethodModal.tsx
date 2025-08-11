/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { height: screenHeight } = Dimensions.get("window");

// ------------------------------
// Reusable Input Field Component
// ------------------------------
const LabeledInput = ({
  label,
  required = false,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  containerClass = "mb-4",
}: any) => (
  <>
    <View className="flex-row items-center gap-1">
      <Text className="text-md text-gray-700 mb-1">{label}</Text>
      {required && <Text className="text-md text-red-700 mb-1">*</Text>}
    </View>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      className={`border border-gray-300 rounded-lg px-4 py-3 text-gray-900 bg-white ${containerClass}`}
      placeholderTextColor="#9CA3AF"
      keyboardType={keyboardType}
    />
  </>
);

interface ModalFormProps {
  visible: boolean;
  onClose: () => void;
}

const AddPaymentMethodModal: React.FC<ModalFormProps> = ({
  visible,
  onClose,
}) => {
  // ------------------------------
  // Form State (Clear Naming)
  // ------------------------------
  const [paymentMethodType, setPaymentMethodType] = useState("card");

  // Common fields
  const [accountHolderName, setAccountHolderName] = useState("");

  // Card-specific
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState<Date | null>(null);

  const [cvv, setCvv] = useState("");

  // Bank-specific
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  // Mobile banking–specific
  const [providerName, setProviderName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [showExpiryCalendar, setShowExpiryCalendar] = useState(false);

  // ------------------------------
  // Animation State
  // ------------------------------
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  // ------------------------------
  // Modal Show/Hide Animation
  // ------------------------------
  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: visible ? 0 : screenHeight,
        duration: visible ? 300 : 250,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: visible ? 1 : 0,
        duration: visible ? 300 : 250,
        useNativeDriver: true,
      }),
    ]).start();

    if (visible) {
      setAccountHolderName("");
      setCardNumber("");
      setCvv("");
      setBankName("");
      setAccountNumber("");
      setProviderName("");
      setMobileNumber("");
    }
  }, [visible]);

  // ------------------------------
  // Close Modal with Animation
  // ------------------------------
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
    ]).start(onClose);
  };

  // ------------------------------
  // Submit Handler
  // ------------------------------
  const handleSubmit = () => {
    const payload: any = { paymentMethodType, accountHolderName };

    if (paymentMethodType === "card") {
      payload.cardNumber = cardNumber;
      payload.expiryDate = expiryDate;
      payload.cvv = cvv;
    } else if (paymentMethodType === "bank") {
      payload.bankName = bankName;
      payload.accountNumber = accountNumber;
    } else if (paymentMethodType === "mobile_banking") {
      payload.providerName = providerName;
      payload.mobileNumber = mobileNumber;
    }

    console.log("Form Data:", payload);
    handleClose();
  };

  // ------------------------------
  // Date Handling
  // ------------------------------
  const onDateChange = (_: any, selectedDate?: Date) => {
    setShowExpiryCalendar(Platform.OS === "ios");
    if (selectedDate) setExpiryDate(selectedDate);
  };

  const formatExpiryDate = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  return (
    <>
      {/* Modal */}
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
            style={{ opacity: backdropOpacity }}
            className="absolute inset-0 bg-black/30"
          >
            <TouchableOpacity
              className="flex-1"
              activeOpacity={1}
              onPress={handleClose}
            />
          </Animated.View>

          {/* Bottom Sheet */}
          <Animated.View
            style={{ transform: [{ translateY: slideAnim }] }}
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
              <View className="px-6">
                <Text className="text-xl font-bold text-gray-900 text-center">
                  Add New Payment Method
                </Text>
                <Text className="text-xs text-gray-600 text-center">
                  Your details are protected and encrypted for your security.
                </Text>
                <View className="h-[1px] bg-gray-200 mt-3 mb-3" />
              </View>

              {/* Form */}
              <View className="px-6 pb-8">
                {/* Payment Method Type */}
                <View className="border border-gray-300 rounded-lg mb-4">
                  <Picker
                    selectedValue={paymentMethodType}
                    onValueChange={setPaymentMethodType}
                    mode="dropdown"
                    dropdownIconRippleColor={"transparent"}
                  >
                    <Picker.Item label="Card" value="card" />
                    <Picker.Item label="Bank Account" value="bank" />
                    <Picker.Item
                      label="Mobile Banking"
                      value="mobile_banking"
                    />
                  </Picker>
                </View>

                {/* Account Holder Name */}
                <LabeledInput
                  label={
                    paymentMethodType === "card" ? "Card Holder Name"
                    : paymentMethodType === "bank" ?
                      "Account Holder Name"
                    : "Account Owner Name"
                  }
                  required
                  value={accountHolderName}
                  onChangeText={setAccountHolderName}
                  placeholder="Ex: John Doe"
                />

                {/* Second Field */}
                {paymentMethodType === "card" ?
                  <LabeledInput
                    label="Card Number"
                    required
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    placeholder="Ex: 1234 5678 9012 3456"
                    keyboardType="numeric"
                  />
                : paymentMethodType === "bank" ?
                  <LabeledInput
                    label="Bank Name"
                    required
                    value={bankName}
                    onChangeText={setBankName}
                    placeholder="Ex: Bank Name"
                  />
                : <LabeledInput
                    label="Provider"
                    required
                    value={providerName}
                    onChangeText={setProviderName}
                    placeholder="Ex: Provider"
                  />
                }

                {/* Conditional Fields */}
                {paymentMethodType === "card" && (
                  <View className="flex-row justify-between gap-1">
                    {/* Expiry */}
                    <View className="w-[48%]">
                      <Text className="text-md text-gray-700 mb-1">
                        Expiry (Optional)
                      </Text>
                      <TouchableOpacity
                        onPress={() => setShowExpiryCalendar(true)}
                      >
                        <View className="border border-gray-300 rounded-lg px-4 py-3 bg-white mb-4">
                          <Text className="text-black">
                            {expiryDate ?
                              formatExpiryDate(expiryDate)
                            : "Select"}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>

                    {/* CVV */}
                    <View className="w-[48%]">
                      <LabeledInput
                        label="CVV (Optional)"
                        value={cvv}
                        onChangeText={setCvv}
                        placeholder="Ex: 123"
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                )}

                {paymentMethodType === "bank" && (
                  <LabeledInput
                    label="Account Number"
                    value={accountNumber}
                    onChangeText={setAccountNumber}
                    placeholder="Ex: 1234 5678 9012 3456"
                    keyboardType="numeric"
                  />
                )}

                {paymentMethodType === "mobile_banking" && (
                  <LabeledInput
                    label="Mobile Number"
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                    placeholder="Ex: +7635278754"
                  />
                )}

                {/* Action Buttons */}
                <View className="flex-row gap-2">
                  <TouchableOpacity
                    onPress={handleClose}
                    className="flex-1 py-3 px-4 border border-gray-300 rounded-lg"
                  >
                    <Text className="text-gray-700 text-center font-medium">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    className="flex-1 py-3 px-4 rounded-lg bg-blue-600"
                  >
                    <Text className="text-center font-medium text-white">
                      Submit
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </Animated.View>
        </View>
      </Modal>

      {/* Expiry Calendar */}
      {showExpiryCalendar && (
        <DateTimePicker
          value={expiryDate || new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
          minimumDate={new Date()}
          maximumDate={new Date(2040, 12, 31)}
        />
      )}
    </>
  );
};

export default AddPaymentMethodModal;
