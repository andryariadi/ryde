import { icons } from "@/constant";
import { formatDate, formatTime } from "@/libs/utils";
import { Driver, Ride } from "@/types/type";
import React from "react";
import { Image, Text, View } from "react-native";

type RideProp = Ride & {
  driver: Driver;
};

const RideCard = ({ ride }: { ride: RideProp }) => {
  //   console.log({ ride }, "<---rideCard");

  return (
    <View className="bg-white flex justify-center gap-5 p-5 rounded-xl shadow-sm shadow-neutral-300">
      {/* Top */}
      <View className="b-sky-500 flex flex-row items-center gap-3">
        {/* Left */}
        <Image
          source={{
            uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${ride.destination_longitude},${ride.destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY}`,
          }}
          className="w-[80px] h-[90px] rounded-xl"
        />

        {/* Right */}
        <View className="gap-5">
          {/* Origin Address */}
          <View className="flex flex-row items-center gap-3">
            <Image source={icons.to} className="w-7 h-7" />
            <Text className="text-md font-JakartaMedium" numberOfLines={1}>
              {ride.origin_address}
            </Text>
          </View>

          {/* Destination Address */}
          <View className="flex flex-row items-center gap-3">
            <Image source={icons.point} className="w-7 h-7" />
            <Text className="text-md font-JakartaMedium" numberOfLines={1}>
              {ride.destination_address}
            </Text>
          </View>
        </View>
      </View>

      {/* Bottom */}
      <View className="bg-general-500 py-3 px-5 rounded-xl">
        {/* Date & Time */}
        <View className="b-fuchsia-600 flex flex-row items-center justify-between pb-4 pt-2 border-b-[1px] border-white">
          <Text className="text-md font-JakartaMedium text-gray-500">Date & Time</Text>
          <Text className="text-md font-JakartaBold" numberOfLines={1}>
            {formatDate(ride.created_at)}, {formatTime(ride.ride_time)}
          </Text>
        </View>

        {/* Driver */}
        <View className="b-fuchsia-600 flex flex-row items-center justify-between py-4 border-b-[1px] border-white">
          <Text className="text-md font-JakartaMedium text-gray-500">Driver</Text>
          <Text className="text-md font-JakartaBold">
            {ride.driver.first_name} {ride.driver.last_name}
          </Text>
        </View>

        {/* Car Seats */}
        <View className="b-fuchsia-600 flex flex-row items-center justify-between py-4 border-b-[1px] border-white">
          <Text className="text-md font-JakartaMedium text-gray-500">Car Seats</Text>
          <Text className="text-md font-JakartaBold">{ride.driver.car_seats}</Text>
        </View>

        {/* Payment Status */}
        <View className="b-fuchsia-600 flex flex-row items-center justify-between pt-4 pb-2">
          <Text className="text-md font-JakartaMedium text-gray-500">Payment Status</Text>
          <Text className={`text-md capitalize font-JakartaBold ${ride.payment_status === "paid" ? "text-green-500" : "text-red-500"}`}>{ride.payment_status}</Text>
        </View>
      </View>
    </View>
  );
};

export default RideCard;
