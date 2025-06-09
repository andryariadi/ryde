import { useUser } from "@clerk/clerk-react";
import React from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { user } = useUser();

  // console.log({ user }, "<-----homeScreen");

  return (
    <SafeAreaView className="bg-fuchsia-500 flex-1">
      <Text className="text-2xl text-white">Home</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
