import { getItem } from "@/utils/useSecureStorage";
import axios from "axios";
import { Platform } from "react-native";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: "https://lasting-mudfish-lucky.ngrok-free.app/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding token
axiosInstance.interceptors.request.use(
  async config => {
    try {
      let token = null;

      if (Platform.OS === "web") {
        token = localStorage.getItem("token");
      } else {
        token = await getItem("token");
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      } else {
        console.warn(
          Platform.OS === "web" ?
            "No token found in localStorage."
          : "No token found in SecureStore."
        );
      }

      return config;
    } catch (err) {
      return Promise.reject(err);
    }
  },
  error => Promise.reject(error)
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Example: You could trigger logout or refresh token logic here
      console.warn("Unauthorized - Token may be expired or invalid.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
