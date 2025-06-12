import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import {
  BtnPageProduct,
  CardImgProduct1,
  SearchProduct,
} from "../../src/features/product";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import { getProductAPI } from "../../src/services/product";
import {
  Alerts,
  KeyboardAvoidingComponent,
  Spinner,
} from "../../src/components";
import { AllContext } from "../../src/context/AllProvider";
import { delay } from "../../src/utils";

const Product = () => {
  const { productSuccess, setProductSuccess } = useContext(AllContext);
  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const flatListRef = useRef(null);
  const [req, setReq] = useState({
    search: "",
    limit: 10,
    offset: 1,
  });
  const getProduct = async (req) => {
    setLoading(true);
    try {
      const { products, pagination } = await getProductAPI(req);
      setProduct(products);
      setTotalPage(pagination);
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      await delay(200);
      flatListRef.current?.scrollToOffset({ animated: true, offset: 0 });
      setLoading(false);
    }
  };
  useEffect(() => {
    getProduct(req);
  }, []);
  useEffect(() => {
    if (productSuccess) {
      getProduct({
        search: "",
        limit: 10,
        offset: 1,
      });
    }
  }, [productSuccess]);
  return (
    <View className="bg-white h-screen" style={{ paddingBottom: bottom }}>
      <KeyboardAvoidingComponent>
        <FlatList
          data={loading ? [{}] : product}
          renderItem={({ item }) =>
            loading ? (
              <Spinner />
            ) : (
              product.length >= 1 && <CardImgProduct1 data={item} />
            )
          }
          keyExtractor={(item, index) =>
            item?.ProductId?.toString() || index.toString()
          }
          ListHeaderComponent={
            <>
              {/* btn create */}
              <TouchableOpacity
                className="bg-[#B67D03] flex flex-row items-center self-start rounded-lg px-4 mb-5"
                onPress={() => router.push("/(modal)/createproduct")}
              >
                <FontAwesome name="plus" size={24} color="white" />
                <Text className="p-3 text-white font-montserratbold text-2xl">
                  Product
                </Text>
              </TouchableOpacity>
              {/* search */}
              <View className="mb-5">
                <SearchProduct
                  getAPI={getProduct}
                  setReq={setReq}
                  req={req}
                  setLoading={setLoading}
                />
              </View>
              {/* alert success */}
              <Alerts
                status="success"
                msg={productSuccess}
                setMsg={setProductSuccess}
              />
            </>
          }
          ListEmptyComponent={
            !loading && (
              <Text className="text-center text-[#856c3e] font-montserratsemibolditalic text-2xl my-5">
                Product kosong...
              </Text>
            )
          }
          ListFooterComponent={
            !loading &&
            product.length >= 1 && (
              <View style={{ paddingBottom: bottom + 40, marginVertical: 12 }}>
                <BtnPageProduct
                  totalPage={totalPage}
                  req={req}
                  setReq={setReq}
                  getAPI={getProduct}
                  setLoading={setLoading}
                />
              </View>
            )
          }
          ref={flatListRef}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            padding: 16,
            marginBottom: bottom,
          }}
        />
      </KeyboardAvoidingComponent>
    </View>
  );
};

export default Product;
