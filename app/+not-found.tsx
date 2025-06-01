import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View>
        <Text>Thats a 404</Text>
      </View>
    </View>
  );
}
