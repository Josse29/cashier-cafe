import { View, Text } from "react-native";
import React from "react";
import { DeleteCash } from "../../src/features/cash";

const ModalDeleteCash = () => {
  return (
    <View className="h-screen">
      <DeleteCash />
    </View>
  );
};

export default ModalDeleteCash;
