import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constant";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const OnboardingScreen = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView className="b-amber-500 flex-1 items-center">
      {/* Button Skip */}
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/register");
        }}
        className="absolute top-16 right-7 z-10"
      >
        <Text className="text-gray-900 text-base font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      {/* Content Swiper */}
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-[32px] h-[4px] rounded-full mx-1 bg-[#e2e8f0]" />}
        activeDot={<View className="w-[32px] h-[4px] rounded-full mx-1 bg-[#0286ff]" />}
        bounces={true}
        paginationStyle={{ bottom: 60 }}
        onIndexChanged={(index) => setActiveIndex(index)}
        className="b-sky-700"
      >
        {onboarding.map((item) => (
          <View key={item.id} className="b-green-500 flex-1 items-center justify-center gap-12">
            {/* Image */}
            <Image source={item.image} resizeMode="contain" className="b-cyan-400 w-full h-[300px]" />

            {/* Title & Description */}
            <View className="b-fuchsia-500 flex items-center justify-center gap-3 px-16">
              <Text className="text-gray-900 text-3xl font-bold text-center mx-10">{item.title}</Text>
              <Text className="text-[#858585] text-lg text-center font-JakartaSemiBold mx-10">{item.description}</Text>
            </View>
          </View>
        ))}
      </Swiper>

      {/* Button */}
      <CustomButton title={isLastSlide ? "Get Started" : "Next"} onPress={() => (isLastSlide ? router.replace("/(auth)/register") : swiperRef.current?.scrollBy(1, true))} className="w-11/12 mb-5" />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
