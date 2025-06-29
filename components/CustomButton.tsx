import { ButtonProps } from "@/types/type";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-[#0286FF]";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-black";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "text-white";
  }
};

const CustomButton = ({ onPress, title, bgVariant = "primary", textVariant = "default", IconLeft, IconRight, className, isLoading, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} {...props} className={`w-full rounded-full flex flex-row justify-center items-center shadow-md shadow-neutral-400/70 px-4 py-5 ${getBgVariantStyle(bgVariant)} ${className}`} {...props}>
      {IconLeft && <IconLeft className="mr-2" />}

      {isLoading ? <Feather name="loader" size={24} color="black" className="animate-spin mx-auto" /> : <Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>{title}</Text>}

      {IconRight && <IconRight className="ml-2" />}
    </TouchableOpacity>
  );
};

export default CustomButton;
