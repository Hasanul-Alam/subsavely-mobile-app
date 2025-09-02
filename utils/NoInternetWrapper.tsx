// NoInternetWrapper.js
import NetInfo from "@react-native-community/netinfo";
import { WifiOff } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function NoInternetWrapper({ children }: any) {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const [checking, setChecking] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isConnected) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [isConnected, fadeAnim]);

  const handleRetry = async () => {
    setChecking(true);

    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    const state = await NetInfo.fetch();
    setIsConnected(state.isConnected);
    setChecking(false);
  };

  if (!isConnected) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        {/* Decorative Background */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />
        <View style={styles.decorativeCircle3} />

        <Animated.View style={[styles.contentCard, { opacity: fadeAnim }]}>
          {/* WiFi Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconBackground}>
              <WifiOff size={40} color={"#EF4444"} />
            </View>
          </View>

          {/* Text */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>Connection Lost</Text>
            <Text style={styles.subtitle}>
              Oops! You&apos;re offline. Please check your internet connection
              and try again.
            </Text>
          </View>

          {/* Retry Button */}
          {checking ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#2563EB" />
              <Text style={styles.loadingText}>Checking connection...</Text>
            </View>
          ) : (
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                style={styles.retryButton}
                onPress={handleRetry}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Try Again</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </Animated.View>
      </SafeAreaView>
    );
  }

  return children;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 24,
  },
  decorativeCircle1: {
    position: "absolute",
    top: height * 0.1,
    left: width * 0.05,
    width: 140,
    height: 140,
    backgroundColor: "#DBEAFE",
    borderRadius: 70,
    opacity: 0.35,
  },
  decorativeCircle2: {
    position: "absolute",
    bottom: height * 0.2,
    right: width * 0.05,
    width: 100,
    height: 100,
    backgroundColor: "#E0E7FF",
    borderRadius: 50,
    opacity: 0.45,
  },
  decorativeCircle3: {
    position: "absolute",
    top: height * 0.3,
    right: width * 0.12,
    width: 70,
    height: 70,
    backgroundColor: "#F3E8FF",
    borderRadius: 35,
    opacity: 0.4,
  },
  contentCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingVertical: 36,
    paddingHorizontal: 28,
    width: "90%",
    maxWidth: 340,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 28,
  },
  iconBackground: {
    width: 88,
    height: 88,
    backgroundColor: "#FEF3F2",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#F87171",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 24,
    fontWeight: "400",
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  loadingText: {
    fontSize: 14,
    color: "#9CA3AF",
    fontWeight: "500",
    marginTop: 10,
  },
  retryButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    paddingHorizontal: 36,
    borderRadius: 20,
    elevation: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
