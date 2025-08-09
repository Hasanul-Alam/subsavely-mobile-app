import React from "react";
import { TextInput } from "react-native";
import Card from "../reusableComponents/Card";

const SubscriptionPlan = ({ plan, setPlan }: any) => {
  return (
    <>
      <Card>
        <TextInput
          className="px-4 py-4 text-base text-gray-800 h-[48px]"
          placeholder="Premium, Basic..."
          placeholderTextColor="#9CA3AF"
          value={plan}
          onChangeText={setPlan}
        />
      </Card>
    </>
  );
};

export default SubscriptionPlan;
