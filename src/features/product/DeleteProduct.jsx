import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { FontAwesome5, Foundation } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { deleteProductId } from "../../services/product";
import { AllContext } from "../../context/AllProvider";
import { router } from "expo-router";
const DeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const { setProductSuccess } = useContext(AllContext);
  const { ProductId, ProductName } = useLocalSearchParams();
  const { top, bottom } = useSafeAreaInsets();
  const handleDelete = async () => {
    setLoading(true);
    setProductSuccess("");
    try {
      const res = await deleteProductId(ProductId, ProductName);
      setProductSuccess(res);
      router.back();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <View
      className="bg-white flex-1 p-3"
      style={{ paddingBottom: top + bottom * 4 }}
    >
      <View className="m-auto items-center">
        <Foundation name="alert" size={140} color="red" />
        <Text className="font-montserratbold text-3xl text-center tracking-wider my-4">
          Are You Sure Want to Delete - {ProductName} ?
        </Text>
        <View className="flex flex-row gap-2">
          <TouchableOpacity
            className="flex flex-row bg-red-600 px-4 py-2 rounded-lg gap-3 items-center"
            onPress={handleDelete}
            disabled={loading}
          >
            <FontAwesome5 name="check" size={24} color="white" />
            <Text className="text-white text-2xl font-montserratbold">Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex flex-row bg-slate-600 px-4 py-2 rounded-lg gap-3 items-center"
            onPress={() => router.back()}
          >
            <FontAwesome5 name="times" size={24} color="white" />
            <Text className="text-white text-2xl font-montserratbold">No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DeleteProduct;
