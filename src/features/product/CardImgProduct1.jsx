import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Coffee, NoImg } from "../../assets";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { formatCurrency1 } from "../../utils/";

const CardImgProduct1 = (props) => {
  const { data } = props;
  const { ProductId, ProductName, ProductPrice, ProductImg } = data;
  const router = useRouter();
  return (
    <View
      className="flex flex-row w-full mb-5 bg-white"
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Image
        source={
          ProductImg ? { uri: `data:image/jpeg;base64,${ProductImg}` } : NoImg
        }
        className="w-[40%] h-[150px]"
      />
      <View className="w-[60%] justify-center p-3 rounded-r-2xl">
        <Text className="font-montserratbold text-2xl mb-2" numberOfLines={2}>
          {ProductName}
        </Text>
        <Text className="font-montserratbold text-xl mb-4 text-[#B67D03]">
          {formatCurrency1(ProductPrice)}
        </Text>
        {/* btnAction */}
        <View className="flex flex-row gap-2">
          {/* see */}
          <TouchableOpacity
            className="bg-[#B67D03] h-[30px] w-[30px] rounded-lg flex"
            onPress={() =>
              router.push({
                pathname: "/(modal)/detailproduct",
                params: {
                  ProductId,
                },
              })
            }
          >
            <Entypo name="eye" size={18} color="white" className="m-auto" />
          </TouchableOpacity>
          {/* update */}
          <TouchableOpacity
            className="bg-[#88816d] h-[30px] w-[30px] rounded-lg flex"
            onPress={() =>
              router.push({
                pathname: "/(modal)/updateproduct",
                params: {
                  ProductId,
                },
              })
            }
          >
            <FontAwesome
              name="pencil-square-o"
              size={18}
              color="white"
              className="m-auto"
            />
          </TouchableOpacity>
          {/* delete */}
          <TouchableOpacity
            className="bg-[#6C6966] h-[30px] w-[30px] rounded-lg flex"
            onPress={() =>
              router.push({
                pathname: "/(modal)/deleteproduct",
                params: {
                  ProductId,
                  ProductName,
                },
              })
            }
          >
            <Entypo name="trash" size={16} color="white" className="m-auto" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardImgProduct1;
