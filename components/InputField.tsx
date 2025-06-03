import { InputFieldProps } from "@/types/type";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

const InputField = ({ label, labelStyle, secureTextEntry = false, isPassword = false, iconLeft, iconRight, iconStyle, inputStyle, containerStyle, className, ...props }: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <KeyboardAvoidingView className="bg-sky-500" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="bg-violet-500 gap-2">
          {/* Label */}
          <Text className={`text-lg font-JakartaSemiBold ${labelStyle}`}>{label}</Text>

          {/* Input Container */}
          <View className={`relative bg-neutral-100 rounded-full border border-neutral-300 focus:border-primary-500 flex flex-row justify-start items-center ${containerStyle}`}>
            {/* Icon Left*/}
            {iconLeft && <Image source={iconLeft} className={`size-6 ml-4 ${iconStyle}`} />}

            {/* Input */}
            <TextInput className={`b-teal-500 flex-1 p-4 rounded-full text-[15px] font-JakartaSemiBold text-left ${inputStyle}`} secureTextEntry={isPassword && !showPassword} {...props} />

            {/* Icon Right*/}
            {isPassword ? (
              <TouchableOpacity style={{ marginRight: 20 }} onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#888" />
              </TouchableOpacity>
            ) : iconRight ? (
              <View style={{ marginRight: 20 }}>{iconRight}</View>
            ) : null}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
