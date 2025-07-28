/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const Shimmer = ({ style }: { style?: any }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return <Animated.View style={[styles.shimmer, style, { opacity }]} />;
};

const DashboardStatisticsSkeleton = () => {
  return (
    <View style={{ paddingTop: 40 }}>
      {/* Total Expense Card */}
      <View style={styles.expenseCard}>
        <Shimmer style={styles.emojiPlaceholder} />
        <View style={{ flex: 1 }}>
          <Shimmer style={styles.largeText} />
          <Shimmer style={styles.smallText} />
        </View>
      </View>

      {/* Metric Cards Grid */}
      <View style={styles.grid}>
        {[...Array(4)].map((_, i) => (
          <View key={i} style={styles.cardWrapper}>
            <View style={styles.metricCard}>
              <View style={styles.iconRow}>
                <Shimmer style={styles.iconPlaceholder} />
                <View style={{ flex: 1 }}>
                  <Shimmer style={styles.titlePlaceholder} />
                  <Shimmer style={styles.valuePlaceholder} />
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shimmer: {
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  expenseCard: {
    flexDirection: "row",
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  emojiPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#444",
    marginRight: 12,
  },
  largeText: {
    height: 20,
    width: 140,
    marginBottom: 6,
  },
  smallText: {
    height: 12,
    width: 160,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: "48%",
    marginBottom: 12,
  },
  metricCard: {
    backgroundColor: "#f3f4f6",
    borderRadius: 16,
    padding: 12,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  titlePlaceholder: {
    height: 12,
    width: "70%",
    marginBottom: 6,
  },
  valuePlaceholder: {
    height: 16,
    width: "60%",
  },
});

export default DashboardStatisticsSkeleton;
