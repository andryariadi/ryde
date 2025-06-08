import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Text, View } from "react-native";

const HomeScreen = () => {
  const { user } = useUser();

  console.log({ user }, "<-----homeScreen");

  return (
    <View className="bg-fuchsia-500">
      <Text className="text-2xl text-white">Home</Text>
    </View>
  );
};

export default HomeScreen;
