import { SignedIn } from "@clerk/clerk-expo";
import { SignedOut, SignOutButton, useUser } from "@clerk/clerk-react";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const HomeScreen = () => {
  const { user } = useUser();

  console.log({ user }, "<-----homeScreen");

  return (
    <View className="bg-fuchsia-500">
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <SignOutButton />
      </SignedIn>

      <SignedOut>
        <Link href="/(auth)/login">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/register">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
};

export default HomeScreen;
