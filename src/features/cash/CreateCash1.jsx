import { View, Text, TouchableOpacity } from "react-native";
import { createCashAPI } from "../../services/cash";
import React, { useContext, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import {
  formatCurrency1,
  getStorage,
  removeStorage,
  unFormatCurrency,
} from "../../utils";
import { AllContext } from "../../context/AllProvider";
import { router } from "expo-router";

const CreateCash1 = () => {
  const { cartSum, setOrderSuccess, setCashSuccess } = useContext(AllContext);
  const [loading, setLoading] = useState(false);
  const handleCreate = async () => {
    const order = await getStorage("order");
    setOrderSuccess("");
    setCashSuccess("");
    setLoading(true);
    try {
      for (const el of order) {
        const req = {
          cashName: `${el.ProductName} - Qty : ${el.ProductQty} Has Been Sold`,
          cashBalance: el.ProductPrice,
          cashInfo: "Order Product",
        };
        await createCashAPI(req);
      }
      await removeStorage("order");
      setCashSuccess("Order has been Done !");
      setOrderSuccess(`Order has been Done !`);
      router.back();
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <TouchableOpacity onPress={handleCreate} disabled={loading}>
      <View className="flex flex-row justify-end gap-2">
        <Entypo name="shopping-cart" size={20} color="black" />
        <Text className="font-montserratbold text-lg">Total :</Text>
      </View>
      <View className="flex flex-row gap-2 my-2">
        <Text className="font-montserratbold text-xl">Qty : {cartSum.qty}</Text>
        <Text className="font-montserratbold text-xl">
          | Total : {formatCurrency1(cartSum.price)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CreateCash1;
