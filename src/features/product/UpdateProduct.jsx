import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AllContext } from "../../context/AllProvider";
import {
  Alerts,
  InputBalance,
  InputImg,
  InputTxt,
  InputTxtMulti,
  Spinner,
} from "../../components";
import { getProductIdAPI, updateProductAPI } from "../../services/product";
import { formatCurrency, unFormatCurrency } from "./../../utils";
import { router } from "expo-router";

const UpdateProduct = () => {
  const { ProductId } = useLocalSearchParams();
  const { isKeyboardVisible, setProductSuccess } = useContext(AllContext);
  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [req, setReq] = useState({
    productId: 1,
    productName: "",
    productPrice: 0,
    img: "",
    productInfo: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const scrollViewRef = useRef(null);
  const getProductId = async () => {
    setLoading(true);
    try {
      const response = await getProductIdAPI(ProductId);
      const { ProductName, ProductPrice, ProductImg, ProductInfo } = response;
      setReq({
        productId: ProductId,
        productName: ProductName,
        productPrice: formatCurrency(ProductPrice),
        img: ProductImg,
        productInfo: ProductInfo,
      });
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductId();
  }, [ProductId]);
  const handleUpdate = async () => {
    setLoading(true);
    setProductSuccess("");
    try {
      const { productId, productName, productPrice, img, productInfo } = req;
      const res = await updateProductAPI({
        productId,
        productName,
        productPrice: unFormatCurrency(productPrice),
        productImg: img,
        productInfo,
      });
      setProductSuccess(res);
      router.back();
    } catch (err) {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      setErrMsg(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="flex-1 bg-white">
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
          <ScrollView
            ref={scrollViewRef}
            keyboardShouldPersistTaps="always"
            contentContainerStyle={{ padding: 15 }}
          >
            {/* alert error */}
            <Alerts status="error" msg={errMsg} setMsg={setErrMsg} />
            {/* product name */}
            <InputTxt
              title="Product Name"
              color="#964a3b"
              placeholder="ex : product name"
              req={req}
              setReq={setReq}
              value={req.productName}
              field="productName"
            />
            {/* product price */}
            <InputBalance
              title="Product Price"
              color="#964a3b"
              placeholder="ex : $ 10.00"
              req={req}
              setReq={setReq}
              value={req.productPrice}
              field="productPrice"
            />
            {/* product img */}
            <InputImg
              title="Product Image"
              color="#964a3b"
              req={req}
              setReq={setReq}
              setLoading={setLoading}
            />
            {/* product info */}
            <InputTxtMulti
              color="#964a3b"
              req={req}
              setReq={setReq}
              field="productInfo"
              value={req.productInfo}
              placeholder="ex : desc your product detail"
            />
          </ScrollView>
          {/* button update */}
          <View
            className="p-4 border-t border-t-[#d1c6c4] bg-white"
            style={{
              paddingBottom: isKeyboardVisible ? bottom + 60 : bottom + 20,
            }}
          >
            <TouchableOpacity
              className="bg-[#964a3b] px-4 py-3 rounded-md"
              disabled={loading}
              onPress={handleUpdate}
            >
              <Text className="text-white font-montserratbold text-center text-2xl">
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default UpdateProduct;
