import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Coffee1 } from "../../assets";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  InputBalance,
  InputImg,
  InputTxt,
  InputTxtMulti,
} from "../../components";
import { createProductAPI } from "../../services/product";
import { unFormatCurrency } from "../../utils";

const CreateProduct = () => {
  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [req, setReq] = useState({
    productName: "",
    productPrice: 0,
    img: "",
    productInfo: "",
  });
  const handleCreate = async () => {
    setLoading(true);
    try {
      console.log(req);
      return;
      const { productName, balance, img, productInfo } = req;
      const created = await createProductAPI({
        productName,
        productPrice: unFormatCurrency(balance),
        productImg: img,
        productInfo,
      });
      console.log(created);
      // router.back();
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="flex-1">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        // contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="p-5">
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
          />
          {/* <View className="mb-5">
            <Text className="text-2xl font-montserratbold mb-2 text-[#964a3b]">
              More Information
            </Text>
            <TextInput
              multiline={true}
              numberOfLines={15}
              style={{
                height: 180,
                textAlignVertical: "top",
              }}
              className="font-montserratbold rounded-lg px-3 border border-[#964a3b] focus:border-2 text-[#964a3b]"
              placeholder="ex : describe your product..."
              onChangeText={(txt) => handleChange(txt, "productInfo")}
              value={req.productInfo}
              placeholderTextColor="#964a3b"
            />
          </View> */}
        </View>
      </ScrollView>
      <View
        className="p-4 border-t border-t-[#d1c6c4]"
        style={{ paddingBottom: bottom + 60 }}
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
