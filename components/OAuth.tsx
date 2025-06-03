import { icons } from "@/constant";
import React from "react";
import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";

const OAuth = () => {
  const handleGoogleLogin = async () => {
    console.log("Login with Google");
  };
  return (
    <View className="bg-rose-500 gap-5">
      <View className="bg-green-500 flex flex-row items-center justify-center gap-x-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton title="Login with Google" IconLeft={() => <Image source={icons.google} resizeMode="contain" className="size-6 mx-3" />} bgVariant="outline" textVariant="primary" onPress={handleGoogleLogin} />
    </View>
  );
};

export default OAuth;
