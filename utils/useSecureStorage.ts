import * as SecureStore from "expo-secure-store";

export const setItem = async (key: string, value: any) => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error("Error setting item in secure storage:", error);
  }
};
export const getItem = async (key: string) => {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    console.error("Error getting item from secure storage:", error);
    return null;
  }
};

export const removeItem = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Error removing item from secure storage:", error);
  }
};
