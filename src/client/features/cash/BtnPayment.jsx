import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const BtnPayment = () => {
  const router = useRouter();
  return (
    <TouchableOpacity
      className="bg-[#B67D03] w-full py-3 px-4 rounded-lg flex flex-row justify-between items-center"
      onPress={() => router.push("/(modal)/payment")}
    >
      <View className="flex flex-row items-center gap-4">
        <Entypo name="shopping-cart" size={30} color="white" />
        <View>
          <Text className="text-white font-montserratextrabold">Total</Text>
          <Text className="text-white font-montserratextrabold text-2xl">
            Rp 10.0000x
          </Text>
        </View>
      </View>
      <AntDesign
        name="doubleright"
        size={24}
        color="white"
        className="font-bold"
      />
    </TouchableOpacity>
  );
};

export default BtnPayment;
