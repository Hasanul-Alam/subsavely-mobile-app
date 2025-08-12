import AddNewEmailModal from "@/components/notificationSettingsComponents/AddNewEmailModal";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] =
    useState(false);
  const [pushNotificationsEnabled, setPushNotificationsEnabled] =
    useState(false);
  const [selectedDays, setSelectedDays] = useState("3 Days");
  const [showNotifyDaysOptions, setShowNotifyDaysOptions] = useState(false);
  const [addNewEmailModalOpen, setAddNewEmailModalOpen] = useState(false);

  const fakeEmails = [
    "G2gYt@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
    "qK9Gx@example.com",
  ];

  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1 bg-[#f3f4f6] pb-10"
    >
      {/* Page Title */}
      <Text className="text-2xl font-bold text-gray-900 text-center border-b border-gray-300 py-3">
        Manage Notification Settings
      </Text>
      <ScrollView
        className="flex-1 bg-[#f3f4f6] px-4"
        contentContainerStyle={{ paddingVertical: 16 }}
      >
        {/* Email Notification */}
        <View className="bg-white rounded-2xl p-5 mb-5 border border-gray-100">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-1 pr-4">
              <Text className="text-lg font-semibold text-gray-900">
                Email Notifications
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                Get important updates and reminders via email
              </Text>
            </View>
            <Switch
              value={emailNotificationsEnabled}
              onValueChange={setEmailNotificationsEnabled}
              trackColor={{ false: "#D1D5DB", true: "#22c065" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D1D5DB"
            />
          </View>

          {/* Emails List */}
          <Text className="text-base font-semibold text-gray-800 mb-2">
            Notification Emails
          </Text>
          {fakeEmails.length > 0 ?
            <ScrollView
              style={{ maxHeight: 300, backgroundColor: "" }}
              contentContainerStyle={{ paddingVertical: 8 }}
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
            >
              {fakeEmails.map((email, index) => (
                <View
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50 flex-row items-center justify-between"
                >
                  <View>
                    <Text className="text-slate-600 text-sm">{email}</Text>
                  </View>
                  {/* Delete Button */}
                  <TouchableOpacity activeOpacity={0.7}>
                    <Feather name="trash-2" size={18} color="#B22222" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          : <View className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
              <Text className="text-gray-500 text-sm">
                No email addresses added yet
              </Text>
            </View>
          }

          {/* Add Email Button */}
          <TouchableOpacity
            className="bg-primary flex-row items-center justify-center py-3 rounded-lg active:opacity-80 mt-5"
            onPress={() => setAddNewEmailModalOpen(true)}
          >
            <Feather name="plus" size={18} color="white" />
            <Text className="text-white text-base font-semibold ml-2">
              Add New Email
            </Text>
          </TouchableOpacity>
        </View>

        {/* Push Notifications */}
        <View className="bg-white rounded-2xl p-5 mb-5  border border-gray-100">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-lg font-semibold text-gray-900">
                Push Notifications
              </Text>
              <Text className="text-sm text-gray-500 mt-1">
                Enable Push notifications to get reminders and updates
              </Text>
            </View>
            <Switch
              value={pushNotificationsEnabled}
              onValueChange={setPushNotificationsEnabled}
              trackColor={{ false: "#D1D5DB", true: "#22c065" }}
              thumbColor="#FFFFFF"
              ios_backgroundColor="#D1D5DB"
            />
          </View>
        </View>

        {/* Notify Before */}
        {/* Notify Before */}
        <View className="bg-white rounded-2xl p-5 border border-gray-200 mb-10">
          <Text className="text-base font-semibold text-gray-900 mb-3">
            Notify me before:
          </Text>
          <TouchableOpacity
            className="flex-row items-center justify-between border border-gray-300 rounded-xl px-5 py-3 bg-white  active:opacity-80"
            activeOpacity={0.7}
            onPress={() => setShowNotifyDaysOptions(!showNotifyDaysOptions)}
          >
            <Text className="text-gray-900 font-semibold">{selectedDays}</Text>
            <Feather
              name={showNotifyDaysOptions ? "chevron-up" : "chevron-down"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>

          {/* Notify Before Dropdown Options */}
          {showNotifyDaysOptions && (
            <View className="bg-white mt-2 rounded-xl  border border-gray-200 overflow-hidden">
              {["3 Days", "7 Days", "14 Days", "30 Days"].map((day, index) => (
                <TouchableOpacity
                  key={index}
                  className={`px-5 py-3 border-b border-gray-100 ${
                    day === selectedDays ? "bg-green-100" : "bg-white"
                  } active:bg-green-200`}
                  onPress={() => {
                    setSelectedDays(day);
                    setShowNotifyDaysOptions(false);
                  }}
                >
                  <Text
                    className={`text-base font-medium ${
                      day === selectedDays ? "text-green-700" : "text-gray-900"
                    }`}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {
        /* Add New Email Modal */
        addNewEmailModalOpen && (
          <AddNewEmailModal
            visible={addNewEmailModalOpen}
            onClose={() => setAddNewEmailModalOpen(false)}
            onAdd={() => {
              setAddNewEmailModalOpen(false);
              console.log("Email added");
            }}
          />
        )
      }
    </SafeAreaView>
  );
}
