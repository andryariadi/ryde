import { icons } from "@/constant";
import { Tabs } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Easing, Image, ImageSourcePropType, View } from "react-native";

const TabIcon = ({ source, focused }: { source: ImageSourcePropType; focused: boolean }) => {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: focused ? -35 : 0,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  }, [focused, translateY]);

  return (
    <Animated.View style={{ transform: [{ translateY }] }} className={`b-rose-500 absolute top-[5px] z-50 flex justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}>
      <View className={`b-sky-500 rounded-full ${focused ? "w-16 h-16" : "w-12 h-12"} items-center justify-center ${focused ? "bg-general-400" : ""}`}>
        <Image source={source} tintColor="white" resizeMode="contain" className={`${focused ? "w-10 h-10" : "w-8 h-8"}`} />
      </View>
    </Animated.View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          paddingBottom: 0, // ios only
          marginHorizontal: 20,
          marginBottom: 35,
          height: 65,
          position: "relative",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <TabIcon source={icons.home} focused={focused} />,
        }}
      />

      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon source={icons.list} focused={focused} />,
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon source={icons.chat} focused={focused} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => <TabIcon source={icons.profile} focused={focused} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
