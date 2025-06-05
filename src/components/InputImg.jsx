import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";

const InputImg = (props) => {
  const { title = "Image", color = "#000000", req, setReq, setLoading } = props;
  const pickImage = async () => {
    setLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        base64: true,
      });
      if (result.assets && result.assets.length > 0) {
        const img = result.assets[0];
        // 1.validate extension
        const validateExt = img.mimeType.startsWith("image");
        if (!validateExt) {
          const errMsg = "Uppsss, It's not Image";
          console.error(errMsg);
        }
        // 2. validation size
        const base64Length = img.base64.length;
        const sizeInBytes =
          4 * Math.ceil(base64Length / 3) * 0.5624896334383812;
        const sizeInMB = sizeInBytes / (1024 * 1024);
        if (sizeInMB > 1) {
          const errMsg = "Uppsss, Maximize file Image = 1 MB";
          console.error(errMsg);
        }
        setReq((prev) => ({
          ...prev,
          img,
        }));
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <View className="mb-5">
      <Text className={`text-2xl font-montserratbold mb-3 text-[${color}]`}>
        {title}
      </Text>
      {req.img && (
        <View className="mb-4 relative">
          <TouchableOpacity
            className={`absolute top-[-15px] right-[-10px] z-10 bg-red-500 h-[40px] w-[40px] flex rounded-full`}
            onPress={() => {
              setReq((prev) => ({
                ...prev,
                img: "",
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
            source={{ uri: `data:image/jpeg;base64,${req.img.base64}` }}
            className="w-full h-[220px]"
          />
        </View>
      )}
      <TouchableOpacity onPress={pickImage}>
        <Text
          className={`font-montserratbold rounded-lg p-3 border border-[${color}] text-[${color}]`}
        >
          Choose Image
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputImg;
