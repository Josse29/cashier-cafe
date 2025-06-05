import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Coffee } from "../../assets";
import { Entypo } from "@expo/vector-icons";

const CardImgProduct = (props) => {
  return (
    <View className="w-1/2 p-2 py-3">
      <Image source={Coffee} className="h-[120px] w-full" />
      <View
        className="py-4 px-3 bg-white rounded-b-lg"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text
          className="font-montserratextrabold text-xl truncate hover:text-wrap tracking-wider mb-1"
          numberOfLines={1}
        >
          Coffee
        </Text>
        <Text className="font-montserratbold text-lg tracking-wider text-[#856c3e] mb-3">
          $5.99
        </Text>
        <View className="ms-2 flex flex-row justify-between items-center">
          <View className="flex w-[42px] h-[42px] bg-[#B67D03] rounded-full">
            <Text className="m-auto text-white font-montserratbold text-2xl">
              1
            </Text>
          </View>
          <View className="flex flex-row gap-2">
            <TouchableOpacity className="bg-[#79756E] w-[32px] h-[32px] flex rounded-md">
              <Entypo name="minus" size={24} color="white" className="m-auto" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-[#B67D03] w-[32px] h-[32px] flex rounded-md">
              <Entypo name="plus" size={24} color="white" className="m-auto" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CardImgProduct;
