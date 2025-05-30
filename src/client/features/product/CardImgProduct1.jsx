import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Coffee } from "../../assets";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const CardImgProduct1 = () => {
  const router = useRouter();
  return (
    <View className="flex flex-row w-full mb-5">
      <Image source={Coffee} className="w-[40%] h-[150px]" />
      <View className="w-[60%] justify-center p-3 bg-white rounded-r-2xl">
        <Text className="font-montserratbold text-2xl mb-2" numberOfLines={2}>
          Coffee Name
        </Text>
        <Text className="font-montserratbold text-xl mb-4 text-[#B67D03]">
          Coffee Price
        </Text>
        <View className="flex flex-row gap-2">
          <TouchableOpacity
            className="bg-[#B67D03] h-[30px] w-[30px] rounded-lg flex"
            onPress={() => router.push("/(modal)/detailproduct")}
          >
            <Entypo name="eye" size={18} color="white" className="m-auto" />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#88816d] h-[30px] w-[30px] rounded-lg flex"
            onPress={() => router.push("/(modal)/updateproduct")}
          >
            <FontAwesome
              name="pencil-square-o"
              size={18}
              color="white"
              className="m-auto"
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-[#6C6966] h-[30px] w-[30px] rounded-lg flex"
            onPress={() => router.push("/(modal)/deleteproduct")}
          >
            <Entypo name="trash" size={16} color="white" className="m-auto" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardImgProduct1;
