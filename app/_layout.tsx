import "@/global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Jakarta-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
    "Jakarta-ExtraBold": require("../assets/fonts/PlusJakartaSans-ExtraBold.ttf"),
    "Jakarta-ExtraLight": require("../assets/fonts/PlusJakartaSans-ExtraLight.ttf"),
    "Jakarta-Light": require("../assets/fonts/PlusJakartaSans-Light.ttf"),
    "Jakarta-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "Jakarta-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "Jakarta-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
  });

  const isAuth = false;

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <View className="bg-rose-500 flex-1">
      <Stack screenOptions={{ headerShown: false }}>
        {isAuth ? <Stack.Screen name="(root)" /> : <Stack.Screen name="(auth)" />}

        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="inverted" />
    </View>
  );
}
