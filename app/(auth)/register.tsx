import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constant";
import { Link } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

const RegisterScreen = () => {
  const handleSignup = async () => {
    console.log("Sign up");
  };
  return (
    <ScrollView className="bg-amber-500 flex-1">
      <View className="bg-sky-500 flex-1">
        {/* Image & Title */}
        <View className="bg-rose-500">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-gray-900 font-JakartaSemiBold absolute bottom-5 left-5">Create Your Account</Text>
        </View>

        {/* Form */}
        <View className="bg-fuchsia-500 h-[85%] justify-center px-5 gap-5">
          <InputField label="Name" placeholder="Enter name" accessibilityLabel="Enter your name" returnKeyType="next" iconLeft={icons.person} />

          <InputField label="Email" placeholder="Enter email" accessibilityLabel="Enter your email" keyboardType="email-address" returnKeyType="next" iconLeft={icons.email} />

          <InputField label="Password" placeholder="Enter password" isPassword accessibilityLabel="Enter your password" returnKeyType="done" iconLeft={icons.lock} secureTextEntry />

          <CustomButton title="Sign Up" onPress={handleSignup} />

          {/* OAuth */}
          <OAuth />

          {/* Link to login */}
          <Link href="/login" className="text-lg text-center text-general-200 mt-10">
            Already have an account? <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
