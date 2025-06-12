import { View, Text } from "react-native";
import React from "react";
import { formatCurrency1 } from "../../utils";

const ListCash1 = ({ data }) => {
  const { ProductName, ProductQty, ProductPrice } = data;
  return (
    <View className="pb-2 border-b-2 border-b-slate-300 mb-3">
      <View className="mb-2">
        <Text className="text-xl font-montserratbold mb-2">{ProductName}</Text>
        <Text className="text-lg font-montserratbold ms-2">
          @{formatCurrency1(ProductPrice)} x {ProductQty} ={"  "}
          {formatCurrency1(ProductPrice * ProductQty)}
        </Text>
      </View>
    </View>
  );
};

export default ListCash1;
