import { useContext, useRef, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import {
  Alerts,
  InputBalance,
  InputImg,
  InputTxt,
  InputTxtMulti,
} from "../../components";
import { createProductAPI } from "../../services/product";
import { delay, unFormatCurrency } from "../../utils";
import { AllContext } from "../../context/AllProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CreateProduct = () => {
  const { isKeyboardVisible, setProductSuccess } = useContext(AllContext);
  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [req, setReq] = useState({
    productName: "",
    productPrice: 0,
    img: "",
    productInfo: "",
  });
  const scrollViewRef = useRef(null);
  const [errMsg, setErrMsg] = useState("");
  const handleCreate = async () => {
    setLoading(true);
    setProductSuccess("");
    try {
      const { productName, productPrice, img, productInfo } = req;
      const created = await createProductAPI({
        productName,
        productPrice: unFormatCurrency(productPrice),
        productImg: img,
        productInfo,
      });
      setProductSuccess(created);
      router.back();
    } catch (error) {
      setErrMsg(error.message);
      // await delay(100);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        ref={scrollViewRef}
        keyboardShouldPersistTaps="handled"
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
      {/* button create */}
      <View
        className="p-4 border-t border-t-[#d1c6c4] bg-white"
        style={{
          paddingBottom: isKeyboardVisible ? bottom + top * 2 : bottom + 20,
        }}
      >
        <TouchableOpacity
          className="bg-[#964a3b] px-4 py-3 rounded-md"
          disabled={loading}
          onPress={handleCreate}
        >
          <Text className="text-white font-montserratbold text-center text-2xl">
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateProduct;
