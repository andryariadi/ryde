import { InputFieldProps } from "@/types/type";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";

type ControlledInputProps = InputFieldProps & {
  control: Control<any>;
  name: string;
  errors?: FieldError;
};

const InputField = ({ label, labelStyle, secureTextEntry = false, isPassword = false, iconLeft, iconRight, iconStyle, inputStyle, containerStyle, className, control, name, errors, ...props }: ControlledInputProps) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <KeyboardAvoidingView className="mb-4" behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="gap-2">
          {/* Label */}
          <Text className={`text-lg font-JakartaSemiBold ${labelStyle}`}>{label}</Text>

          {/* Input Container */}
          <View className={`relative bg-neutral-100 rounded-full border ${errors ? "border-red-500" : "border-neutral-300"} flex flex-row justify-start items-center ${containerStyle}`}>
            {/* Icon Left*/}
            {iconLeft && <Image source={iconLeft} className={`size-6 ml-4 ${iconStyle}`} />}

            {/* Controlled Input */}
            <Controller
              control={control}
              name={name}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput className={`flex-1 p-4 rounded-full text-[15px] font-JakartaSemiBold text-left ${inputStyle}`} secureTextEntry={isPassword && !showPassword} onChangeText={onChange} onBlur={onBlur} value={value} {...props} />
              )}
            />

            {/* Icon Right*/}
            {isPassword ? (
              <TouchableOpacity style={{ marginRight: 20 }} onPress={() => setShowPassword(!showPassword)}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#888" />
              </TouchableOpacity>
            ) : iconRight ? (
              <View style={{ marginRight: 20 }}>{iconRight}</View>
            ) : null}
          </View>

          {/* Error Message */}
          {errors && <Text className="text-red-500 text-sm mt-1 ml-2">{errors.message}</Text>}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
