/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ShimmerBlock = ({ style }: { style: any }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return <Animated.View style={[styles.shimmer, style, { opacity }]} />;
};

const SubscriptionSkeleton = () => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      {/* Search Bar Skeleton */}
      <View style={styles.searchRow}>
        <ShimmerBlock style={styles.searchBar} />
        <ShimmerBlock style={styles.filterBtn} />
      </View>

      {/* List Items Skeleton */}
      <View style={styles.listWrapper}>
        {[...Array(20)].map((_, i) => (
          <View
            key={i}
            style={[styles.itemContainer, i !== 5 && styles.itemBorder]}
          >
            <ShimmerBlock style={styles.avatar} />
            <View style={styles.textWrapper}>
              <View style={styles.rowBetween}>
                <ShimmerBlock style={styles.name} />
                <ShimmerBlock style={styles.price} />
              </View>
              <View style={styles.rowBetween}>
                <ShimmerBlock style={styles.planType} />
                <ShimmerBlock style={styles.expiry} />
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
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    height: 48,
    borderRadius: 24,
  },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  listWrapper: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 0,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 12,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderColor: "#f3f4f6",
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  name: {
    width: 120,
    height: 16,
    borderRadius: 4,
  },
  price: {
    width: 60,
    height: 16,
    borderRadius: 4,
  },
  planType: {
    width: 100,
    height: 12,
    borderRadius: 4,
  },
  expiry: {
    width: 70,
    height: 12,
    borderRadius: 4,
  },
});

export default SubscriptionSkeleton;
