import DeleteModal from "@/components/reusableComponents/DeleteModal";
import AddEditNoteModal from "@/components/subscriptionComponents/notesComponents/AddEditNoteModal";
import ViewNoteModal from "@/components/subscriptionComponents/notesComponents/ViewNoteModal";
import { EllipsisVertical, Plus } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  findNodeHandle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const generateFakeNotes = () =>
  Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Note ${i + 1}`,
    content: `This is note ${i + 1}`,
  }));

const Notes = () => {
  const [notes, setNotes] = useState(generateFakeNotes());
  const [refreshing, setRefreshing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [optionsPosition, setOptionsPosition] = useState({ x: 0, y: 0 });
  const [showOptions, setShowOptions] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const iconRefs = useRef<Record<string, any>>({});

  // Inside the component
  const screenHeight = Dimensions.get("window").height;

  const handleOptionsPress = (id: string) => {
    const ref = iconRefs.current[id];
    if (!ref) return;

    const node = findNodeHandle(ref);
    if (node) {
      UIManager.measure(node, (x, y, width, height, pageX, pageY) => {
        const dropdownHeight = 150; // Approx height of your options menu
        const offsetY =
          pageY + height + dropdownHeight > screenHeight ?
            pageY - dropdownHeight
          : pageY + height;

        setOptionsPosition({ x: pageX, y: offsetY });
        setSelectedNoteId(id);
        setShowOptions(true);
      });
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setNotes(generateFakeNotes());
      setRefreshing(false);
    }, 1500);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      <SafeAreaView className="flex-1 bg-[#f8f9fa] px-4">
        <Text className="text-2xl font-semibold mt-3 mb-3 text-black">
          Notes
        </Text>

        <FlatList
          data={notes}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          refreshing={refreshing}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#6b7280"
              colors={["green", "blue"]}
              progressBackgroundColor="#f8f9fa"
            />
          }
          onRefresh={onRefresh}
          renderItem={({ item }) => (
            <View className="bg-white p-4 mb-3 rounded-xl shadow-sm border border-gray-200 flex-row justify-between items-center">
              <View className="flex-1 pr-2">
                <Text className="text-md text-black">{item.content}</Text>
              </View>
              <TouchableOpacity
                ref={ref => {
                  iconRefs.current[item.id] = ref;
                }}
                activeOpacity={0.7}
                onPress={() => handleOptionsPress(item.id)}
              >
                <EllipsisVertical size={22} color="#6b7280" />
              </TouchableOpacity>
            </View>
          )}
        />

        {/* Floating + Button */}
        <TouchableOpacity
          className="absolute bottom-6 right-6 bg-black rounded-full p-4 shadow-md"
          activeOpacity={0.8}
          onPress={() => {
            setOpenAddModal(true);
            setOpenViewModal(false);
            setOpenEditModal(false);
            setSelectedNoteId(null);
          }}
        >
          <Plus size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Options Dropdown Menu */}
      {showOptions && (
        <TouchableOpacity
          activeOpacity={1}
          onPressOut={() => setShowOptions(false)}
          className="absolute top-0 left-0 right-0 bottom-0"
        >
          <View
            className="absolute bg-white rounded-md shadow-md border border-gray-200"
            style={{
              top: optionsPosition.y + 4,
              left: optionsPosition.x - 120,
              width: 140,
              zIndex: 1000,
            }}
          >
            <TouchableOpacity
              className="px-4 py-3 border-b border-gray-100"
              onPress={() => {
                setShowOptions(false);
                setOpenEditModal(false);
                setOpenViewModal(true);
              }}
            >
              <Text className="text-black">View</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-4 py-3 border-b border-gray-100"
              onPress={() => {
                setShowOptions(false);
                setOpenViewModal(false);
                setOpenEditModal(true);
              }}
            >
              <Text className="text-black">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="px-4 py-3"
              onPress={() => {
                setShowOptions(false);
                setShowDeleteModal(true);
              }}
            >
              <Text className="text-red-600">Delete</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onDelete={() => {
          console.log("Delete note:", selectedNoteId);
          setShowDeleteModal(false);
        }}
      />

      {/* View and Edit Note Modals */}
      <AddEditNoteModal
        isAdd={openAddModal}
        isEdit={openEditModal}
        note={notes.find(note => note.id === selectedNoteId)}
        onSubmit={newContent => {
          // Handle adding new note
          console.log("Add note:", newContent);
          setOpenAddModal(false);
          setOpenEditModal(false);
        }}
        onClose={() => {
          setOpenAddModal(false);
          setOpenEditModal(false);
          setShowOptions(false);
        }}
      />

      <ViewNoteModal
        visible={openViewModal}
        onClose={() => {
          setOpenViewModal(false);
          setShowOptions(false);
        }}
        note={notes.find(note => note.id === selectedNoteId)}
      />
    </>
  );
};

export default Notes;
