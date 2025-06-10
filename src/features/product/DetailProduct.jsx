import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { formatCurrency1 } from "./../../utils";
import { getProductIdAPI } from "../../services/product";
import { Spinner } from "../../components";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const DetailProduct = () => {
  const { ProductId } = useLocalSearchParams();
  const { bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    ProductId: 1,
    ProductName: "",
    ProductPrice: 1,
    ProductImg: "",
    ProductInfo: "",
  });
  const getProductId = async () => {
    setLoading(true);
    try {
      const response = await getProductIdAPI(ProductId);
      const { ProductName, ProductPrice, ProductImg, ProductInfo } = response;
      setProduct({
        ProductName,
        ProductPrice,
        ProductImg,
        ProductInfo,
      });
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductId();
  }, [ProductId]);
  return (
    <ScrollView className="bg-white h-screen p-5">
      {/* loading */}
      {loading && (
        <View
          className="flex justify-center h-screen"
          style={{ paddingBottom: bottom + 40 }}
        >
          <Spinner color="#964a3b" />
        </View>
      )}
      {!loading && (
        <>
          {/* ProductName */}
          <View className="mb-5">
            <Text className="font-montserratbold text-2xl mb-2">
              Product Name :
            </Text>
            <Text className="font-montserratbold text-2xl ms-2">
              {product.ProductName}
            </Text>
          </View>
          {/* Product Price */}
          <View className="mb-5">
            <Text className="font-montserratbold text-2xl mb-2">
              Product Price :
            </Text>
            <Text className="font-montserratbold text-2xl ms-2">
              {formatCurrency1(product.ProductPrice)}
            </Text>
          </View>
          {/* Product Img */}
          <View className="mb-5">
            <Text className="font-montserratbold text-2xl mb-3">
              Product Image :
            </Text>
            {!product.ProductImg && (
              <Text className="font-montserratsemibolditalic text-2xl ms-2 text-slate-400">
                No Available
              </Text>
            )}
            {product.ProductImg && (
              <Image
                source={{ uri: `data:image/jpeg;base64,${product.ProductImg}` }}
                className="w-full h-[220px]"
              />
            )}
          </View>
          {/* product Info */}
          <View className="mb-5">
            <Text className="font-montserratbold text-2xl mb-2">
              Product Information :
            </Text>
            {product.ProductInfo && (
              <Text className="font-montserratsemibolditalic text-xl ms-2">
                {product.ProductInfo}
              </Text>
            )}
            {!product.ProductInfo && (
              <Text className="font-montserratsemibolditalic text-xl ms-2">
                -
              </Text>
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default DetailProduct;
