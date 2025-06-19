import { View, Text, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Baristaa } from "./../../assets";
import { getUserAPI } from "../../services/user";
import { AllContext } from "../../context/AllProvider";
const ImgUser = () => {
  const { reqUser, setReqUser } = useContext(AllContext);
  const { top } = useSafeAreaInsets();
  const getUser = async () => {
    try {
      const res = await getUserAPI();
      setReqUser((prev) => ({
        ...prev,
        img: res.UserImg,
      }));
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View
      className="justify-center items-center bg-[#964a3b] w-full p-7"
      style={{ paddingTop: top + 10 }}
    >
      <Image
        source={
          reqUser.img
            ? { uri: `data:image/jpeg;base64,${reqUser.img}` }
            : Baristaa
        }
        style={{ width: 180, height: 180, borderRadius: 100 }} // sesuaikan ukuran dan bentuk
        resizeMode="cover"
      />
    </View>
  );
};

export default ImgUser;
