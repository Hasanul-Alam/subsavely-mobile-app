/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

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

const ExpireSoonSkeleton = () => {
  return (
    <>
      <Text style={styles.title}>Expires Soon</Text>
      <View style={styles.cardContainer}>
        {[...Array(5)].map((_, i) => (
          <View
            key={i}
            style={[styles.itemContainer, i !== 4 && styles.itemBorder]}
          >
            <View style={styles.avatarWrapper}>
              <ShimmerBlock style={styles.avatar} />
            </View>
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
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    paddingLeft: 8,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 40,
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
  avatarWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 22,
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
  shimmer: {
    backgroundColor: "#e0e0e0",
  },
});

export default ExpireSoonSkeleton;
