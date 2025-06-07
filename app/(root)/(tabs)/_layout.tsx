import { useClerk } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const TabsLayout = () => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      Linking.openURL(Linking.createURL("/(auth)/login"));
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <View>
      <Text>TabsLayout Andry</Text>

      <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabsLayout;
