import { Stack } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  return (
    <SafeAreaView className="b-amber-500 flex-1 justify-center items-center">
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Text className="text-3xl font-bold">Thats a 404!</Text>
      </View>
    </SafeAreaView>
  );
}
