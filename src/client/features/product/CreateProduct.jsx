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
const CreateProduct = () => {
  const { top, bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [req, setReq] = useState({
    productName: "",
    productPrice: 0,
    productImg: "",
    productInfo: "",
  });
  const handleChange = (val, name) => {
    setReq((prev) => ({
      ...prev,
      [name]: val,
    }));
  };
  const pickImage = async () => {
    setLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
      });
      if (result.assets && result.assets.length > 0) {
        const img = result.assets[0];
        setReq((prev) => ({
          ...prev,
          productImg: img.base64,
          // productImgUri: img.uri,`
        }));
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const handleCreate = () => {
    // console.log("x");
    console.log(req);
  };
  return (
    <View className="flex-1">
      <ScrollView
      // keyboardShouldPersistTaps="always"
      // contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View className="p-5">
          {/* product name  */}
          <View className="mb-5">
            <Text className="text-2xl font-montserratbold mb-2 text-[#964a3b]">
              Product Name
            </Text>
            <TextInput
              placeholder="ex : product name"
              className="bg-white font-montserratbold rounded-lg px-3 border border-[#964a3b] focus:border-2 capitalize text-[#964a3b]"
              value={req.productName}
              onChangeText={(txt) => handleChange(txt, "productName")}
              placeholderTextColor="#964a3b"
            />
          </View>
          {/* product price */}
          <View className="mb-5">
            <Text className="text-2xl font-montserratbold mb-2 text-[#964a3b]">
              Product Price
            </Text>
            <TextInput
              placeholder="ex : $ 10.00"
              className="bg-white font-montserratbold rounded-lg px-3 border border-[#964a3b] focus:border-2 text-[#964a3b]"
              onChangeText={(txt) => handleChange(txt, "productPrice")}
              value={req.productPrice}
              placeholderTextColor="#964a3b"
            />
          </View>
          {/* product price */}
          <View className="mb-5">
            <Text className="text-2xl font-montserratbold mb-2 text-[#964a3b]">
              Product Price
            </Text>
            <TextInput
              placeholder="ex : $ 10.00"
              className="bg-white font-montserratbold rounded-lg px-3 border border-[#964a3b] focus:border-2 text-[#964a3b]"
              onChangeText={(txt) => handleChange(txt, "productPrice")}
              value={req.productPrice}
              placeholderTextColor="#964a3b"
            />
          </View>
          {/* product img */}
          <View className="mb-5">
            <Text className="text-2xl font-montserratbold mb-3 text-[#964a3b]">
              Product Image
            </Text>
            {req.productImg && (
              <View className="mb-4 relative">
                <TouchableOpacity
                  className="absolute top-[-15px] right-[-10px] z-10 bg-red-500 h-[40px] w-[40px] flex rounded-full"
                  onPress={() => {
                    setReq((prev) => ({
                      ...prev,
                      productImg: "",
                    }));
                  }}
                >
                  <FontAwesome
                    name="times"
                    size={24}
                    color="white"
                    className="m-auto"
                  />
                </TouchableOpacity>
                <Image
                  source={{ uri: `data:image/jpeg;base64,${req.productImg}` }}
                  className="w-full h-[220px]"
                />
              </View>
            )}
            <TouchableOpacity onPress={pickImage}>
              <Text className="bg-white font-montserratbold rounded-lg p-3 border border-[#964a3b] text-[#964a3b]">
                Choose Image
              </Text>
            </TouchableOpacity>
          </View>
          {/* product info */}
          {/* <View className="mb-5">
          <Text className="text-2xl font-montserratbold mb-2 text-[#964a3b]">
            More Information
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={10}
            style={{
              height: 100,
              textAlignVertical: "top",
            }}
            className="bg-white font-montserratbold rounded-lg px-3 border border-[#964a3b] focus:border-2 text-[#964a3b]"
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
        style={{ paddingBottom: bottom + 20 }}
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
