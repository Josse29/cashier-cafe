import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AllContext } from "../../context/AllProvider";
import { formatCurrency1 } from "../../utils";

const BtnPayment = () => {
  const router = useRouter();
  const { cartSum } = useContext(AllContext);
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
            {formatCurrency1(cartSum)}
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
