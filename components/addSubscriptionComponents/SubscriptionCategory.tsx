"use client";
import { Ionicons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../reusableComponents/Card";
import AddSubscriptionCategoryModal from "./AddSubscriptionCategoryModal";

interface CategoryOption {
  label: string;
  value: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  bgColor: string;
}

const categories: CategoryOption[] = [
  {
    label: "Entertainment",
    value: "entertainment",
    iconName: "film",
    iconColor: "#7C3AED",
    bgColor: "#F3E8FF",
  },
  {
    label: "Utilities",
    value: "utilities",
    iconName: "bulb",
    iconColor: "#2563EB",
    bgColor: "#DBEAFE",
  },
  {
    label: "Food & Dining",
    value: "food",
    iconName: "fast-food",
    iconColor: "#D97706",
    bgColor: "#FEF3C7",
  },
  {
    label: "Health",
    value: "health",
    iconName: "heart",
    iconColor: "#DC2626",
    bgColor: "#FEE2E2",
  },
  {
    label: "Education",
    value: "education",
    iconName: "book",
    iconColor: "#059669",
    bgColor: "#D1FAE5",
  },
  {
    label: "Shopping",
    value: "shopping",
    iconName: "cart",
    iconColor: "#9333EA",
    bgColor: "#F3E8FF",
  },
  {
    label: "Transport",
    value: "transport",
    iconName: "car",
    iconColor: "#EF4444",
    bgColor: "#FEE2E2",
  },
];

const SubscriptionCategory = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryOption | null>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const triggerRef = useRef<any>(null);
  const [dropdownPosition, setDropdownPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
  });

  const handleCategorySelect = (category: CategoryOption) => {
    setSelectedCategory(category);
    setDropdownVisible(false);
  };

  const toggleDropdown = () => {
    if (triggerRef.current) {
      triggerRef.current.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          setDropdownPosition({ x, y: y + height, width });
          setDropdownVisible(prev => !prev);
        }
      );
    }
  };

  return (
    <>
      <Card>
        <TouchableOpacity
          ref={triggerRef}
          className="px-3 flex-row items-center justify-between h-14"
          onPress={toggleDropdown}
          activeOpacity={0.7}
        >
          <View className="flex-row items-center">
            <View
              className="w-7 h-7 rounded-full items-center justify-center mr-2"
              style={{
                backgroundColor: "#F3E8FF",
              }}
            >
              <Ionicons name={"apps"} size={14} color={"#7C3AED"} />
            </View>
            <Text className="text-base text-gray-600">
              {selectedCategory ? selectedCategory.label : " Category"}
            </Text>
          </View>
          {isDropdownVisible ?
            <Ionicons name="chevron-up" size={18} color="#6B7280" />
          : <Ionicons name="chevron-down" size={18} color="#6B7280" />}
        </TouchableOpacity>
      </Card>

      {isDropdownVisible && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={isDropdownVisible}
          onRequestClose={() => setDropdownVisible(false)}
        >
          <Pressable
            className="flex-1"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}
            onPress={() => setDropdownVisible(false)}
          >
            <View
              className="absolute bg-[#fffdfd] rounded-lg shadow max-h-60 overflow-hidden z-50"
              style={{
                top: dropdownPosition.y + 5,
                left: dropdownPosition.x,
                width: dropdownPosition.width,
              }}
            >
              <FlatList
                data={categories}
                keyExtractor={item => item.value}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className="flex-row items-center py-3 px-2 border-b border-gray-200"
                    onPress={() => handleCategorySelect(item)}
                    activeOpacity={0.7}
                  >
                    <Text className="text-base text-gray-700 ml-2">
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
                ListFooterComponent={() => (
                  // Add new category button
                  <TouchableOpacity
                    className="flex-row items-center py-3 px-2 bg-gray-100"
                    onPress={() => {
                      setDropdownVisible(false);
                      setOpenAddCategoryModal(true);
                    }}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name="add-circle-outline"
                      size={18}
                      color="#2563EB"
                    />
                    <Text className="text-base text-blue-600 ml-2">
                      New Category
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </Pressable>
        </Modal>
      )}

      {openAddCategoryModal && (
        <AddSubscriptionCategoryModal
          visible={openAddCategoryModal}
          onClose={() => setOpenAddCategoryModal(false)}
          onAdd={() => {
            setOpenAddCategoryModal(false);
            console.log("category added.");
          }}
        />
      )}
    </>
  );
};

export default SubscriptionCategory;
