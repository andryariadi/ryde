import { router } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen = () => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/welcome");
        }}
      >
        <Text>Skip</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RegisterScreen;
