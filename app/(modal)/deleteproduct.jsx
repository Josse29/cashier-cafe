import { View, Text } from "react-native";
import React from "react";
import { DeleteProduct } from "../../src/features/product";

const ModalDeleteProduct = () => {
  return (
    <View className="h-screen">
      <DeleteProduct />
    </View>
  );
};

export default ModalDeleteProduct;
