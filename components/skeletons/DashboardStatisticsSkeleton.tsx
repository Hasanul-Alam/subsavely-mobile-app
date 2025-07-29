import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

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
      <View
        style={styles.expenseCard}
        className="justify-between overflow-hidden"
      >
        <View>
          <Shimmer style={styles.imagePlaceholder} />
        </View>
        <View>
          <Shimmer style={styles.amountLarge} />
          <Shimmer style={styles.subtitleSmall} />
        </View>
      </View>

      {/* Metric Cards Grid */}
      <View style={styles.grid}>
        {[...Array(6)].map((_, i) => (
          <View key={i} style={styles.cardWrapper}>
            <View style={styles.metricCard}>
              <View style={styles.iconRow}>
                <Shimmer style={styles.iconPlaceholder} />
                <View style={{ flex: 1 }} className="ml-4 ">
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
    backgroundColor: "#f4f4f5",
    padding: 20,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#ddd",
    marginRight: 16,
  },
  amountLarge: {
    height: 20,
    width: 140,
    marginBottom: 6,
    borderRadius: 4,
    flexWrap: "wrap",
  },
  subtitleSmall: {
    height: 10,
    width: 160,
    borderRadius: 4,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: "48%",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 16,
  },
  metricCard: {
    backgroundColor: "#f4f4f5",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  iconPlaceholder: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e6e6e6",
    marginRight: 10,
  },
  titlePlaceholder: {
    height: 12,
    width: "90%",
    marginBottom: 6,
    borderRadius: 4,
  },
  valuePlaceholder: {
    height: 16,
    width: "70%",
    borderRadius: 4,
  },
});

export default DashboardStatisticsSkeleton;
