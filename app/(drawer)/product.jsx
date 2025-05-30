import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  BtnPageProduct,
  CardImgProduct1,
  SearchProduct,
} from "../../src/client/features/product";
import { Coffee } from "../../src/client/assets";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const Product = () => {
  const router = useRouter();
  const { top, bottom } = useSafeAreaInsets();
  return (
    <ScrollView className="p-5">
      {/* btn create */}
      <TouchableOpacity
        className="bg-[#B67D03] flex flex-row items-center self-start rounded-lg px-4 mb-3"
        onPress={() => router.push("/(modal)/createproduct")}
      >
        <FontAwesome name="plus" size={24} color="white" />
        <Text className="p-3 text-white font-montserratbold text-2xl">
          Product
        </Text>
      </TouchableOpacity>
      {/* search */}
      <SearchProduct />
      {/* product list */}
      <View className="my-3">
        <CardImgProduct1 />
        <CardImgProduct1 />
        <CardImgProduct1 />
        <CardImgProduct1 />
      </View>
      {/* pagination */}
      <View style={{ paddingBottom: bottom + 40 }}>
        <BtnPageProduct />
      </View>
    </ScrollView>
  );
};

export default Product;
