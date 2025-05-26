import React from "react";
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Txt } from "../../components";
import { Bg, Logo } from "../../assets";
import { useFonts } from "expo-font";
const { width, height } = Dimensions.get("window");
const FormLogin = () => {
  const [fontsLoaded] = useFonts({
    FiraCode: require("./../../assets/fonts/FiraCode-Regular.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <View className="bg-[#ECDEBB] h-screen w-screen">
      <Bg width={width} height={height} preserveAspectRatio="none" />
      <View className="absolute top-0 right-0 bottom-0 left-0">
        <View className="flex h-full items-center justify-center">
          <View className="bg-[#964a3b] p-3 w-[110px] h-[110px] rounded-lg flex items-center justify-center ps-[15px] mb-6">
            <Logo />
          </View>
          <View>
            <View className="bg-[#6c3227] px-5 py-3 rounded-md   border-white self-center">
              <Text className="text-3xl text-white font-bold tracking-widest text-center">
                Login
              </Text>
            </View>
            <View className="bg-[#6c3227] p-6 rounded-lg min-w-[80%]">
              <View>
                <TextInput
                  className="bg-white mb-4 px-3 tracking-widest rounded-md text-black font-bold"
                  placeholder="Username :"
                  // placeholderTextColor={}
                />
              </View>
              <TextInput
                className="bg-white mb-6 px-3 tracking-widest rounded-md text-black font-bold"
                placeholder="Password :"
              />
              <TouchableOpacity className="bg-[#d8ac28] py-2">
                <Text className="text-center text-white font-bold text-2xl tracking-widest">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FormLogin;
