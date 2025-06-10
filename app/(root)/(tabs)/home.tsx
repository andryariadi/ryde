import RideCard from "@/components/RideCard";
import { images, rides } from "@/constant";
import { useUser } from "@clerk/clerk-react";
import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { user } = useUser();

  const loading = false;

  // console.log({ user }, "<-----homeScreen");

  return (
    <SafeAreaView className="bg-amber-500 flex-1" edges={["top"]}>
      <FlatList
        data={rides}
        renderItem={({ item }) => {
          return <RideCard ride={item} />;
        }}
        keyExtractor={(item) => item.ride_id}
        className="b-rose-500"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        ListEmptyComponent={() => (
          <View className="b-rose-500 h-screen flex items-center justify-center">
            {!loading ? (
              <>
                <Image source={images.noResult} className="w-40 h-40" alt="No recent rides found" resizeMode="contain" />
                <Text className="text-sm">No recent rides found</Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        initialNumToRender={2}
        windowSize={2}
        maxToRenderPerBatch={2}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
