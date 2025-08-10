import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  PanResponder,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import fakePaymentMethods from "../../fakeData/fakePaymentMethods";
import Card from "../reusableComponents/Card";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const SubscriptionPaymentMethods = ({ paymentMethod, onSelect }: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // Animate modal in
  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Animate modal out
  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: SCREEN_HEIGHT,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
    });
  };

  // Swipe down to close
  const pan = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          pan.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          closeModal();
        } else {
          Animated.spring(pan, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const translateY = Animated.add(slideAnim, pan).interpolate({
    inputRange: [0, SCREEN_HEIGHT],
    outputRange: [0, SCREEN_HEIGHT],
    extrapolate: "clamp",
  });

  const renderMethodLabel = (method: any) => {
    switch (method.type) {
      case "card":
        return `${method.cardHolderName} • ****${method.cardNumber?.slice(-4)}`;
      case "bank_account":
        return `${method.accountHolderName} • ${method.bankName}`;
      case "mobile_banking":
        return `${method.accountOwnerName} • ${method.provider}`;
      default:
        return "Unknown";
    }
  };

  return (
    <>
      <Card>
        <TouchableOpacity
          className="px-4 py-4 flex-row items-center justify-between"
          onPress={openModal}
          activeOpacity={0.7}
        >
          <View className="flex-row items-center">
            <LinearGradient
              colors={["#3b82f6", "#9333ea"]}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
              }}
            >
              <Ionicons name="card" size={18} color="#1e3d62" />
            </LinearGradient>
            <View>
              <Text className="text-base text-gray-800 font-medium mb-0.5">
                {paymentMethod ?
                  renderMethodLabel(paymentMethod)
                : "Select payment method"}
              </Text>
              <Text className="text-xs text-gray-500">
                Credit card, PayPal, Bank transfer
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-down" size={18} color="#6B7280" />
        </TouchableOpacity>
      </Card>

      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={closeModal}
        statusBarTranslucent
      >
        <Pressable className="flex-1 bg-black/30" onPress={closeModal} />

        <Animated.View
          {...panResponder.panHandlers}
          className="absolute bottom-0 left-0 right-0 max-h-[60%] bg-white rounded-t-3xl pb-6"
          style={{ transform: [{ translateY }] }}
        >
          <View className="w-10 h-1.5 bg-gray-300 rounded-full self-center my-2" />

          <FlatList
            data={fakePaymentMethods}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            style={{ flexGrow: 0 }}
            renderItem={({ item }) => {
              const isSelected = paymentMethod?.id === item.id;
              return (
                <TouchableOpacity
                  className="flex-row items-center px-5 py-3 border-b border-gray-200"
                  onPress={() => {
                    onSelect(item);
                    closeModal();
                  }}
                  activeOpacity={0.7}
                >
                  <View className="flex-1">
                    <Text className="text-base text-gray-900">
                      {renderMethodLabel(item)}
                    </Text>
                    <Text className="text-xs text-gray-500 capitalize">
                      {item.type.replace("_", " ")}
                    </Text>
                  </View>
                  {isSelected && (
                    <Ionicons name="checkmark" size={18} color="#3B82F6" />
                  )}
                </TouchableOpacity>
              );
            }}
          />
        </Animated.View>
      </Modal>
    </>
  );
};

export default SubscriptionPaymentMethods;
