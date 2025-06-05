import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const BtnPageProduct = () => {
  return (
    <View className="flex flex-row justify-center gap-2 flex-wrap">
      {/* prev */}
      <TouchableOpacity className="w-[42px] h-[42px] bg-[#C6B48E] rounded-full flex">
        <MaterialIcons
          name="skip-previous"
          size={24}
          color="white"
          className="text-2xl m-auto"
        />
      </TouchableOpacity>
      {/* number */}
      <TouchableOpacity className="w-[42px] h-[42px] bg-[#C6B48E] rounded-full flex">
        <Text className="m-auto text-white text-2xl">1</Text>
      </TouchableOpacity>
      {/* number */}
      <TouchableOpacity className="w-[42px] h-[42px] bg-[#B67D03] rounded-full flex">
        <Text className="m-auto text-white text-2xl font-montserratextrabold">
          2
        </Text>
      </TouchableOpacity>
      {/* number */}
      <TouchableOpacity className="w-[42px] h-[42px] bg-[#C6B48E] rounded-full flex">
        <Text className="m-auto text-white text-2xl">3</Text>
      </TouchableOpacity>
      {/* next */}
      <TouchableOpacity className="w-[42px] h-[42px] bg-[#C6B48E] rounded-full flex">
        <MaterialIcons
          name="skip-next"
          size={24}
          color="white"
          className="text-2xl m-auto"
        />
      </TouchableOpacity>
    </View>
  );
};

export default BtnPageProduct;
