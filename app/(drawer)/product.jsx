import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import {
  BtnPageProduct,
  CardImgProduct1,
  SearchProduct,
} from "../../src/features/product";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { getProductAPI } from "../../src/services/product";

const Product = () => {
  const { top, bottom } = useSafeAreaInsets();
  const [product, setProduct] = useState([]);
  const getProduct = async () => {
    try {
      const res = await getProductAPI();
      setProduct(res);
    } catch (error) {
      throw error;
    } finally {
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <FlatList
      className="p-5"
      data={product}
      renderItem={({ item }) => <CardImgProduct1 data={item} />}
      keyExtractor={(item) => item.ProductId}
      ListHeaderComponent={
        <>
          {/* btn create */}
          <TouchableOpacity
            className="bg-[#B67D03] flex flex-row items-center self-start rounded-lg px-4 mb-3"
            onPress={() => router.navigate("/(modal)/createproduct")}
          >
            <FontAwesome name="plus" size={24} color="white" />
            <Text className="p-3 text-white font-montserratbold text-2xl">
              Product
            </Text>
          </TouchableOpacity>
          {/* search */}
          <SearchProduct />
        </>
      }
      ListFooterComponent={
        <View style={{ paddingBottom: bottom + 40 }}>
          <BtnPageProduct />
        </View>
      }
    />
  );
};

export default Product;
