import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView className="bg-amber-500 flex-1">
      <View className="bg-sky-500 flex-1">
        <Text className="text-3xl text-white">Entry screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
