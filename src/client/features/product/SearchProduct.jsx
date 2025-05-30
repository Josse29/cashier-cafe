import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

const SearchProduct = () => {
  return (
    <View
      className="bg-[#ECDEBB] rounded-md flex flex-row justify-between items-center px-3 my-4"
      // onPress={() => {}}
    >
      <TextInput
        className="font-montserratbold text-xl text-[#856c3e] h-[50px]"
        placeholder="Search Product ..."
        placeholderTextColor="#A8884D"
      />
      <Entypo
        name="magnifying-glass"
        size={24}
        color="#A8884D"
        className="mb-1"
      />
    </View>
  );
};

export default SearchProduct;
